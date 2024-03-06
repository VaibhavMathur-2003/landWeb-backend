const userModel = require("../Models/user.modal.js");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUser=(req,res)=>{
   userModel.find({}).then((list)=>{
      res.send(list);
    }).catch((err)=>{
        res.status(500).send(error);
    })

}
exports.saveUser= (request, response) => {
  
      let insertData = {"name" : request.body.name};
      const user = new userModel(request.body);
      try {
       user.save();
      response.send(user);
      } catch (error) {
      response.status(500).send(error);
      }
}
exports.getUserById=(req,res)=>{
  
   userModel.find({"_id":req.params.listId}).then((list)=>{
      res.send(list);
  }).catch((err)=>{
      res.send(err);
  })
}
exports.deleteUserById=(req,res)=>{
   userModel.deleteOne({"_id":req.params.userId})
   .then((list)=>{
       res.send(list);
   }).catch((err)=>{
       res.send(err);
   })

}


exports.registerUser= (req, res) => {
  
    
   try {
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

   userModel.find({"email": email })
   .then((oldUser)=> {
        console.log(oldUser);
        if (oldUser.length>0) {
        return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedUserPassword = bcrypt.hash(password, 10);
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash("B4c0/\/", salt, function(err, hash) {
                const user = userModel.create({
                name: name,
                email: email.toLowerCase(), // sanitize
                password: hash,
                });

                // Create token
                const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "5h",
                }
                );
                user.token = token;
                user.message = "registered successfully"
                res.status(201).json(user);
            })
        })
    });
  } catch (err) {
    console.log(err);
  }


}

exports.loginUser= (req,res)=>{
   try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    userModel.find({"email": email.toLowerCase() })
    .then((user)=> {
            console.log(user)
            if (user) {
                bcrypt.compare("B4c0/\/", hash, function(err, resbcyp) {
                        const token = jwt.sign(
                            { user_id: user._id, "email": email.toLowerCase() },
                            process.env.JWT_SECRET,
                            {
                            expiresIn: "5h",
                            }
                        );
                            console.log(token);
                        user.token = token;

                         res.send({"token":token,"message":"login successfully"});
                   
                
                });
            }else{
             res.status(400).send("Invalid Credentials");
            }
        });
    } catch (err) {
        console.log(err);
    }
  
 }