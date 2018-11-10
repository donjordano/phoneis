const helpers = require('../config/helpers');
const Phone = require('../models/Phone');

module.exports = (server) => {
  // GET ===>
  // GET all phones
  server.get('/phones', (req, res, next) => {
    Phone.find({}, (err, phones) => {
      helpers.success(res, next, phones);
    });
  });

  // GET phone by id
  server.get('/phone/:id', (req, res, next) => {
    // // validate non empty id
    // req.assert('id', 'Id is required').notEmpty();
    // const errors = req.validationErrors();
    // if (errors) {
    //   helpers.failure(res, next, errors[0], 400);
    // }
    Phone.findOne({ _id: req.params.id }, (err, phone) => {
      if (err) {
        helpers.failure(res, next, 'Sommethig went wrong when fetchig phone from database', 500);
      }

      if (phone === null) {
        helpers.failure(res, next, 'The specified phone could not be foind', 404);
      }

      helpers.success(res, next, phone);
    });
  });

  // POST ===>
  // create phone
  server.post('/phone', (req, res, next) => {
    // validations 

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
  });

  // PUT ===>
  // update phone
  server.put('/phone/:id', (req, res, next) => {
    // validations

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
  });
};
