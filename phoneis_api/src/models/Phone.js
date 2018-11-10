const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;
const PhoneSchema = new Schema({
  id: ObjectId,
  name: String,
  technology: String,
  bands: {
    type: Map,
    of: String,
  },
});

const Phone = mongoose.model('phones', PhoneSchema);
module.exports = Phone;
