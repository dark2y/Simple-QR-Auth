app.service("AuthService", function ($http, $q, SETTINGS) {

  var gateway = "192.168.179.129:3002";

  var getServerResponse = function (name, parameters) {

    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: SETTINGS.Authority + "/" + name,
      params: parameters,
    }).then(function (response) {
      //console.log(name, response.data);
      deferred.resolve(response.data);
    }, deferred.reject);

    return deferred.promise;

  }
  
  this.generate = function (private) {
    var deferred = $q.defer();
    getServerResponse("generate", {
      "s": private
    }).then(function (response) {
      deferred.resolve(response.public);
    });
    return deferred.promise;
  }

   this.get = function (public) {
    var deferred = $q.defer();
    getServerResponse("get", {
      "t": public
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  this.validate = function (public) {
    var deferred = $q.defer();
    getServerResponse("validate", {
      "t": public
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  return this;

});
