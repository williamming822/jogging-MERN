const express = require('express');
const {
  list,
  create,
  update,
  remove,
  getUserById,
  read,
} = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(create);

router
  .route('/:id')
  .get(read)
  .put(update)
  .delete(remove);

router.param('id', getUserById);

module.exports = {
  router,
};
