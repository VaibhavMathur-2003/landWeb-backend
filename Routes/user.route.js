const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user.controller.js');
const auth = require("../Middleware/Auth");

router.post("/addUser",function(req,res){
    userController.saveUser(req,res);
})
router.get("/getUser",auth,function(req,res){
    userController.getUser(req,res);
})
router.get('/user/:listId',function(req,res){
    userController.getUserById(req,res);
})
router.delete('/deleteUser/:listId',auth,function(req,res){
    userController.deleteUserById(req,res);
})
// Register
router.post("/register", (req, res) => {
    userController.registerUser(req,res);
});

router.post("/login", (req, res) => {
    userController.loginUser(req,res);
});
module.exports = router;