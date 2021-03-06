app.controller("reader.controller", function ($rootScope, $scope, $interval, AuthService, SETTINGS) {

  // Some private variables used for the QR reader.
  var refreshRate = SETTINGS.ClientRefreshRate;
  var refreshInterval = null;

  var video = null;
  var canvas = null;

  /**
   * Delcration of the scope-bound variables
   */
  $scope.isAuth = false;
  $scope.private = null;

  $scope.isReaderReady = false;
  $scope.readerStatus = "Point the QR code twords the camera!"

/**
 * This is triggerd when the public token is read and confirm as a valid token
 * @param {string} token 
 */
  var onDetected = function(token){
      $scope.readerStatus = "Your code is " + token + "";
      AuthService.validate(token).then(function(r){
          if(r.error){
             $scope.readerStatus = r.error;
             return;
          }
          $scope.readerStatus = "Congrats! Your secret key is " + r.private + "";
          $scope.isAuth = true;
          $scope.private = r.private;
      })
  }

  /**
   * This is triggerd on an interval loop to update the canvas
   * and check if the cammera has the QR code in view
   */
   var onRefresh = function(){

    if (video && video.videoWidth > 0) {

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas.getContext("2d").drawImage(video, 0, 0);

      try {
        var token = qrcode.decode();
      } catch (e) {  }

      if (token && typeof token == "string") {

        // This is just to make sure that the data is contsistent
        if(token.charAt(0) == "/" && token.charAt(token.length-1) == "/"){
            onDetected(token.slice(1,token.length-1));
            $interval.cancel(refreshInterval);
        };

        // Cleanup the canvas
        video.pause();
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      }

    }
   }

   /**
    * This is trigger when the cammera stream has started
    * It initialises most of the application logic
    */
  $scope.onStream = function (stream) {

    console.log('Stream Started',stream);

    // Initialise the vide and canvas elements
    video = document.getElementsByTagName("video")[0];
    canvas = document.getElementById("qr-canvas");

    $scope.isReaderReady = true;
    refreshInterval = $interval(onRefresh,refreshRate);

  }

  /**
   * This function is bound to the restart button
   * It restarts the entire application
   */
  $scope.restart = function(){
    $scope.isAuth = false;
    $scope.private = null;
    refreshInterval = $interval(onRefresh,refreshRate);
    video.play();
  }
  
});
