const helpers = require('../config/helpers');
const Phone = require('../models/Phone');
const fonoApi = require('../fonoapi/fonoapi');
const demoPhoneList = require('../config/phonesList');

module.exports = {

  // GET: all phones
  listAllPhones: (req, res, next) => {
    Phone.find({}, (err, phones) => {
      helpers.success(res, next, phones);
    });
  },

  // GET: phone by id
  getPhone: (req, res, next) => {
    Phone.findOne({ _id: req.params.id }, (err, phone) => {
      if (err) {
        helpers.failure(res, next, 'Sommethig went wrong when fetchig phone from database', 500);
      }

      if (phone === null) {
        helpers.failure(res, next, 'The specified phone could not be foind', 404);
      }

      helpers.success(res, next, phone);
    });
  },

  // POST: create phone
  createPhone: (req, res, next) => {
    const phone = new Phone();
    phone.name = req.body.name;
    phone.technology = req.body.technology;
    phone.bands = req.body.bands;
    phone.avaliable = true;
    phone.bookedAt = null;
    phone.user = null;
    phone.save((err) => {
      if (err) {
        helpers.failure(res, next, err, 500);
      }
      helpers.success(res, next, user);
    });
  },

  // POST: Store phones from list - jsut for the demo
  storeDemoPhonesList: (req, res, next) => {
    Phone.find({}, (err, phones) => {
      if (phones.length > 0) {
        helpers.failure(res, next, 'Phones list is already stored', 500);
      } else {
        fonoApi.storePhonesData(
          demoPhoneList.phones,
          () => {
            helpers.success(res, next, 'Phones stored successfully');
          },
          () => {
            helpers.failure(res, next, 'Storing phones list is unsuccessfully, please check server logs');
          }
        );
      }
    });
  },

  // PUT: update phone
  updatePhone: (req, res, next) => {
    Phone.findOne({ _id: req.params.id }, (err, phone) => {
      if (err) {
        helpers.failure(res, next, 'Sommethig went wrong when fetchig phone from database', 500);
      }
      if (phone === null) {
        helpers.failure(res, next, 'The specified phone could not be foind', 404);
      }

      const updates = req.body;
      delete updates.id;
      for (var field in updates) {
        phone[field] = updates[field];
      }

      phone.save((error) => {
        if (error) {
          helpers.failure(res, next, phone);
        }
        helpers.success(res, next, phone);
      });
    });
  }

  // DELETE: methods
};
