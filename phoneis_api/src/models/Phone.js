const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PhoneSchema = new Schema({
  id: ObjectId,
  name: String,
  technology: String,
  bands: {
    type: Map,
    of: String,
  },
  avaliable: Boolean,
  bookedAt: Date,
  user: ObjectId,
});

const Phone = mongoose.model('phones', PhoneSchema);
module.exports = Phone;
