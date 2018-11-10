const fonoapi = require('fonoapi-nodejs');
const PhoneModel = require('../models/Phone');

// Token can be here because is not a secret
fonoapi.token = 'ade81198c6a856eddf34f6622dfa77dae14926c707d0baa3';

module.exports.getPhonesByBrand = (brand) => {
  // for future needs
};

module.exports.getLatestPhoneFrom = (brand, limit) => {
  // for future needs
};

module.exports.storePhonesData = (phones, success, failure) => {
  let storedCount = 0;
  phones.forEach((phoneName) => {
    fonoapi.getDevices((queryString, data) =>{
      const phoneData = data[0];
      const phone = new PhoneModel();
      phone.name = phoneData.DeviceName;
      phone.technology =  phoneData.technology;
      phone.bands = {
        _2g: phoneData._2g_bands,
        _3g: phoneData._3g_bands,
        _4g: phoneData._4g_bands,
      };
      phone.avaliable = true; // initial sotre value
      phone.bookedAt = null; // initial sotre value
      phone.user = null; // initial sotre value
      phone.save((err) => {
        if (err) {
          console.log(`${phoneData.DeviceName} store failure. Error: ${err}`);
          failure();
        } else {
          storedCount += 1;
          console.log(`${phoneData.DeviceName} stored.`);
          // Check if the count of stored phones is equal to phones length
          if (storedCount === phones.length) {
            success();
          }
        }
      });
    }, phoneName);
  });
};
