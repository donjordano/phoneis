const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
