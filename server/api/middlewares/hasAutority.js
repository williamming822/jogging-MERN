function hasAuthority(roles) {
  return function middleware(req, res, next) {
    if (roles.indexOf(req.user.role) > -1) {
      res.status(401).send({ message: 'You are not allowed to access this' });
    }
    next();
  };
}

module.exports = {
  hasAuthority,
};
