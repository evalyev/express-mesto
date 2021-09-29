module.exports = (req, res, next) => {
  if (!req.user._id) {
    res.status(403).send({ message: "Error. Not authorized" })
      return;
  }
  
  next(); 
}