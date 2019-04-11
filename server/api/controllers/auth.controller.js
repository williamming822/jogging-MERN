const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { JWT_SECRET } = require('../config');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .select('_id password email firstName lastName role')
    .exec()
    .then(user => {
      console.log(user);
      user
        .authenticate(req.body.password)
        .then(() => {
          const jwtSign = jwt.sign(
            {
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              email: user.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' },
          );
          return res.json({
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            role: user.role,
            token: jwtSign,
          });
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save().then(newUser => res.json(newUser)).catch(next);
}

module.exports = {
  login,
  signup,
};
