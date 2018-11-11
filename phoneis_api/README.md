# Phoneis API

### Introduction:
  PhoneIs, is an API for test phone booking system. It can be consumed from any client, mobile, web etc.

### Installation:
  In order to run the code locally, you should run those commands:

  Install dependencies: `npm install` 
  Run the script: `npm start`

### Testing:
  TODO: test need to be implemented
  Unfortunately, the time limit didn't allow me to write proper tests.

### Deployment:
  So far the project can be run only on local env.
  The idea was to use Docker or deploy it to AWS

### What's done:
  The API has basic authorization using passportjs => http://www.passportjs.org/
  REST part is build with Restify => http://restify.com/

  Models User and Phone have their controllers and routers.

  Fonoapi located at ```/fonoapi/fonoapi.js``` is used to store phones from demo list:
  - Samsung Galaxy S9
  - Samsung Galaxy S8
  - Samsung Galaxy S7
  - Motorola Nexus 6
  - LG Nexus 5X
  - Apple iPhone X
  - Apple iPhone 8
  - Apple iPhone 4s
  - Nokia 3310

  It takes specific data for the particular model, like:
  - Technology
  - Bands
  - Name