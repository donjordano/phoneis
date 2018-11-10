const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;
const UserSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
