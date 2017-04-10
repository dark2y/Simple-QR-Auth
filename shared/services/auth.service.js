app.service("AuthService", function ($http, $q, SETTINGS) {

  /**
   * This private function handles the send / recive. 
   * We could have used $resource if we are 100% the service is REST
   * @param {string} name 
   * @param {object} parameters 
   */
  var getServerResponse = function (name, parameters) {

    var deferred = $q.defer();

    var onHttpError = function (err) {
      console.error("HTTP ERROR: Check the 'config.js' file");
      return;
    }

    $http({
      method: 'GET',
      url: SETTINGS.Authority + "/" + name,
      params: parameters,
    }).then(function (response) {
      deferred.resolve(response.data);
    }, onHttpError);

    return deferred.promise;

  }

  /**
   * Public function for generation of new tokens
   */
  this.generate = function (private) {
    var deferred = $q.defer();
    getServerResponse("generate").then(function (response) {
      deferred.resolve(response.public);
    });
    return deferred.promise;
  }

  /**
   * Get's information about a sepecifc token
   */
  this.get = function (public) {
    var deferred = $q.defer();
    getServerResponse("get", {
      "t": public
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  /**
   * Updates a token setting it's status to valid
   */
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
