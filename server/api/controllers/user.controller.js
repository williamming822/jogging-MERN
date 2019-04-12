const { User } = require('../models/user');
const { ROLES } = require('../constants');

function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.MANAGER) {
    where = { role: { $ne: ROLES.ADMIN } };
  }

  User.find(where)
    .then(users => {
      res.json(users);
    })
    .catch(next);
}

function create(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    user.role = req.body.role;
  }

  user
    .save()
    .then(savedUser => {
      res.json(savedUser);
    })
    .catch(next);
}

function read(req, res, next) {
  res.json(req.foundUser);
}

function update(req, res, next) {
  const updatedUser = { ...req.foundUser, ...req.body };
  updatedUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

function remove(req, res, next) {
  req.foundUser
    .remove()
    .then(() => {
      res.json(req.foundUser);
    })
    .catch(next);
}

function getUserById(req, res, next, id) {
  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User Not Found' });
        return;
      }
      req.foundUser = user;
      next();
    })
    .catch(next);
}

module.exports = {
  list,
  create,
  update,
  remove,
  getUserById,
  read,
};
