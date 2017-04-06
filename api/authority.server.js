var shortid = require('shortid');
var crypto = require('crypto');

var storage = require('node-persist');

/**
 * Authority module for the Auth  QR demo
 */
module.exports = function (app) {

  app.use("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  storage.init({
    expiredInterval: 2 * 60 * 1000, // 2 minutes
  }).then(function () {
    
    app.get("/",function(req, res){
       res.send("Validation authority");
    })

    app.get("/get", function (req, res) {
      var t = req.query.t;
      storage.getItem(t).then(function(token){
          if(typeof token !== 'undefined'){
            res.send(token);
          } else {
            res.send({"error": "Token is invalid"})
          }
      })
    });

    app.get("/validate",  function (req, res) {
        var t = req.query.t;
        storage.getItem(t).then(function(token){
          if(typeof token !== 'undefined'){
            token.used = true;
            res.send(token);
            storage.setItemSync(toke.public, token);
          } else {
            res.send({"error": "Token is invalid"})
          }
      })
    })

    app.get('/generate', function (req, res) {
      var tokens = {
        "public": shortid.generate(),
        "private": req.query.s ? req.query.s : crypto.randomBytes(16).toString("hex"),
        "used": false
      }
      storage.setItem(tokens.public, tokens);
      res.send(tokens);
      return;
    });;

  });
}
