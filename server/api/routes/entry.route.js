const express = require('express');
const {
  list,
  create,
  update,
  remove,
  getEntryById,
  read,
} = require('../controllers/entry.controller');

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

router.param('id', getEntryById);

module.exports = {
  router,
};
