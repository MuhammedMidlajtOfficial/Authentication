module.exports.isUser = (req, res, next) => {
  if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
  } else {
      next();
  }
};