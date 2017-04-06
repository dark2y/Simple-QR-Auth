/**
 * Authority module for the Auth  QR demo
 */

var https = require('https');
var fs = require("fs");

var express = require('express');

module.exports = function (app) {

  app.use('/', express.static('src/reader'));
  app.use('/services', express.static('shared/services'));
  app.use('/assets', express.static('shared/assets'));

  app.listen(3000, "0.0.0.0", function () {
    console.log('Reader is up on http://localhost:3000 !')
  })

  https.createServer({
    key: fs.readFileSync('shared/certs/key.pem'),
    cert: fs.readFileSync('shared/certs/cert.pem'),
    passphrase: "thereisnoplacelike127"
  }, app).listen(443, "0.0.0.0", function () {
    console.log('HTTPS is ready')
  });


}
