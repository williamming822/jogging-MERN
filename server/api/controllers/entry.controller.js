function list(req, res, next) {
  next();
}

function read(req, res, next) {
  next();
}

function create(req, res, next) {
  next();
}

function update(req, res, next) {
  next();
}

function remove(req, res, next) {
  next();
}

function getEntryById(req, res, next, id) {
  next(id);
}

module.exports = {
  list,
  create,
  update,
  remove,
  getEntryById,
  read,
};
