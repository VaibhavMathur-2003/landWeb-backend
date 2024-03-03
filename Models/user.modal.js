const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:[true, "Name is compulsory"]
        },
        email:{
            type: String,
            require: [true, "Email is compulsory"]
        },
        password: {
            type: String,
            minLength: [8, "Password cannot be less than 8 characters"],
            require: [true, "Password is required"]
        }
    }
)

module.exports = new mongoose.model("user", UserSchema);