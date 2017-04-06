/**
 * Authority module for the Auth  QR demo
 */

var express = require('express');

module.exports = function (app) {
  
  app.use('/', express.static('src/generator'));
  app.use('/services', express.static('shared/services'));
  app.use('/assets', express.static('shared/assets'));

  app.listen(3001, "0.0.0.0", function () {
    console.log('Generator is up on http://localhost:3001')
  })

}
