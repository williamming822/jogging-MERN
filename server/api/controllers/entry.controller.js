const { Entry } = require('../models/entry');
const { ROLES } = require('../constants');
function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = {user: req.user._id};
  }

  Entry.find(where)
  .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function read(req, res, next) {
  return res.json(req.entry);
}

function create(req, res, next) {
  const entry = new Entry(req.body);
  entry.user = req.user._id;

  entry.save()
  .then((newEntry) => {
    res.json(newEntry);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.entry, req.body);

  req.entry.save()
  .then((updatedEntry) => {
    res.json(updatedEntry);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.entry.remove(() => {
    res.json(req.entry);
  })
  .catch(next);
}

function getEntryById(req, res, next, id) {
  Entry.findById(id)
  .then(entry => {
    if (!entry) {
      res.status(404).json({ message: 'Not found such entry'});
    }
    if (req.user._id && req.user._id.toString() !== entry.user.toString() && req.user.role !== ROLES.ADMIN) {
      res.status(401).json({ message: 'You are not allowed to access this entry'});
    }
    req.entry = entry;
    next();
  })
  .catch(next);
}

module.exports = {
  list,
  create,
  update,
  remove,
  getEntryById,
  read,
};
