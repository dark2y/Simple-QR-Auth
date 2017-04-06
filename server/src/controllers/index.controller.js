/**
 * The controllers for the index page
 */
app.controller('index.controller',function($scope,$interval, AuthService, SETTINGS){
    
    $scope.secret ="CheiaMeaPrivataUID:123" ;

    $scope.isUsed = false;
    $scope.token = null;

    var isValidInterval = $interval(function(){
        AuthService.get( $scope.token).then(function(response){
            if(response.used == true){
              $scope.isUsed = true;
              $interval.cancel(isValidInterval);
            }
        })
    }, SETTINGS.ServerRefreshRate);

    $scope.refreshCode = function(){
      AuthService.generate($scope.secret).then(function(token){
        $scope.token = token;
      });
    }

    $scope.refreshCode();

});
