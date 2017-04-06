var express = require('express'),
  https = require('https'),
  fs = require("fs");

var authority = express();

var client = express(),
      server = express();

/** Api */
require("./api/authority.server")(authority);

// The operation starts here

api.listen(3002, "0.0.0.0", function () {
  console.log('API is up on 3002!')
})

/** Server */
server.use('/', express.static('server'));
server.use('/services', express.static('shared/services'));
server.use('/assets', express.static('shared/assets'));

server.listen(3001, "0.0.0.0", function () {
  console.log('Generator is up on 3001!')
})

/** Client */

client.use('/', express.static('client'));
client.use('/services', express.static('shared/services'));
client.use('/assets', express.static('shared/assets'));

client.listen(3000, "0.0.0.0", function () {
  console.log('Reader is up on 3000 / 443 !')
})

https.createServer({
  key: fs.readFileSync('shared/certs/key.pem'),
  cert: fs.readFileSync('shared/certs/cert.pem'),
  passphrase: "thereisnoplacelike127"
}, client).listen(443, "0.0.0.0");
