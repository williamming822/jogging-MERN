const express = require('express');
const jwtMiddleware = require('express-jwt');
const { JWT_SECRET } = require('../config');
const { router: authRouter } = require('./auth.route');
const { router: entryRouter } = require('./entry.route');
const { router: userRouter } = require('./user.route');
const router = express.Router();
function testMiddleware(req, res, next) {
  console.log("We are before the middleware", req.headers);
  next();
}
router.use('/auth', authRouter);
router.use('/users', testMiddleware, jwtMiddleware({ secret: JWT_SECRET }), userRouter);
router.use('/entry', jwtMiddleware({ secret: JWT_SECRET }), entryRouter);

module.exports = {
  router,
};
