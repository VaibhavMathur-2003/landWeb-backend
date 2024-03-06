const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  webpage: [{type: Schema.Types.ObjectId, ref: 'Pages'}]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;