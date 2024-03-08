const jwt = require("jsonwebtoken");
const User = require("../Models/user.modal");


const  verifyToken = async (req, res, next) => {
  const {authorization} = req.headers

  if(!authorization){
    return res.status(403).send("A token is required for authentication");
  }
  const token = authorization.split(' ')[1]
  
  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({_id}).select('_id');
    next()
  } catch (err) {

    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;