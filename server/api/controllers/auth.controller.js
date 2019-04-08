const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

function login(req, res, next) {
  User.findOne({ email: req.user.email })
    .select('_id password email firstName lastName role')
    .exec()
    .then(user => {
      user
        .authentiate(req.user.password)
        .then(() => {
          const jwtSign = jwt.sign(
            {
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              email: user.email,
            },
            'secret',
            { expiresIn: '1h' },
          );
          return res.json(jwtSign);
        })
        .catch(err =>
          res
            .status(401)
            .json({ message: `User authentication failed${err.message}` }),
        );
    })
    .catch(next);
}

function signup(req, res, next) {
  const user = new User({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    password: req.user.password,
  });

  user.save(newUser => res.json(newUser)).catch(next);
}

module.exports = {
  login,
  signup,
};
