const express = require('express');
const jwtMiddleware = require('express-jwt');
const { JWT_SECRET } = require('../config');
const { router: authRouter } = require('./auth.route');
const { router: entryRouter } = require('./entry.route');
const { router: userRouter } = require('./user.route');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/entry', jwtMiddleware({ secret: JWT_SECRET }), entryRouter);
router.use('/user', jwtMiddleware({ secret: JWT_SECRET }), userRouter);

module.exports = {
  router,
};
