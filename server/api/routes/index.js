const express = require('express');
const jwtMiddleware = require('express-jwt')({ secret: 'superstrongpassword' });
const { router: authRouter } = require('./auth.route');
const { router: entryRouter } = require('./entry.route');
const { router: userRouter } = require('./user.route');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/entry', jwtMiddleware, entryRouter);
router.use('/user', jwtMiddleware, userRouter);

module.exports = {
  router,
};
