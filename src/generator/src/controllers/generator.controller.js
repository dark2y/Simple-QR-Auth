/**
 * The controllers for the index page
 */
app.controller('generator.controller', function ($scope, $interval, AuthService, $timeout, SETTINGS) {

  $scope.isAuth = false;
  $scope.token = null;
  $scope.secret = null;

  var isValidInterval = null;

  var checkToken = function(){
    AuthService.get($scope.token).then(function (response) {
      if (response.used == true) {
        $scope.isAuth = true;
        $scope.secret = response.private;
        $interval.cancel(isValidInterval);
      }
    })
  }

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

  $scope.refreshCode = function () {
    AuthService.generate().then(function (token) {
      $scope.token = token;
      $timeout(function () { appendLogo(); }, 2)
    });
  }

  $scope.restart = function(){
    $scope.isAuth = false;
    $scope.token = null;
    $scope.refreshCode();
    isValidInterval = $interval(checkToken, SETTINGS.ServerRefreshRate);

  }

   isValidInterval = $interval(checkToken, SETTINGS.ServerRefreshRate);
  $scope.refreshCode();

});
