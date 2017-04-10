/**
 * The controllers for the index page
 */
app.controller('generator.controller', function ($scope, $interval, AuthService, $timeout, SETTINGS) {

  /**
   * Declare all of the scope bindings
   */
  $scope.isAuth = false;
  $scope.token = null;
  $scope.secret = null;

/**
 * The generator settings are here
 */
  $scope.generator = {
    version: 2, // can be 1 - 40
    correction: "Q", // can be L,M,Q,H
    size: 500, // square 500x500
    color: "#de411b", // endava orange
    background: "#fff" // white ( duh' )
  }

/**
 * Declare the non-scoped variables
 */
  var validation = null;

  /**
   * This function will loop inside the interval and check for the token update
   * this is done so that the generator knows when the code has been used and 
   * reacts to that state change
   */
  var checkToken = function(){
    AuthService.get($scope.token).then(function (response) {
      if (response.used == true) {
        $scope.isAuth = true;
        $scope.secret = response.private;
        $interval.cancel(isValidInterval);
      }
    })
  }

/**
 * This is a hacky implementation of a canvas draw function. 
 * It's used to draw the Endava logo to the center of the QR code.
 */
  var appendLogo = function () {
    canvas = document.getElementsByTagName("canvas")[0];
    base_image = new Image();
    base_image.src = '../assets/images/logo.png';
    if (base_image.complete) {
      canvas.getContext('2d').drawImage(base_image,
        canvas.width / 2 - base_image.width / 2,
        canvas.height / 2 - base_image.height / 2
      );
    } else {
      base_image.onload = function () {
        canvas.getContext('2d').drawImage(base_image,
          canvas.width / 2 - base_image.width / 2,
          canvas.height / 2 - base_image.height / 2
        );
      }
    }
  }

/**
 *  This function triggers the refresh of the QR token on the server side
 * The appendLogo() function is inside a timeout that 
 * it is run in conjunction with the next scope refresh; Otherwise scope variables would not update.
 */
  $scope.refreshCode = function () {
    AuthService.generate().then(function (token) {
      $scope.token = token;
      if(validation) $interval.cancel(validation);
      validation = $interval(checkToken, SETTINGS.ServerRefreshRate);
      $timeout(function () { appendLogo(); }, 2)
    });
  }

  /**
   * This function is suppose to restart the entiregeneration process. 
   * It's bound to the refresh button by default
   */
  $scope.restart = function(){
    $scope.isAuth = false;
    $scope.token = null;
    $scope.refreshCode();
  }

  /**
   * This triggers the first refresh of the code
   */
  $scope.refreshCode();

});
