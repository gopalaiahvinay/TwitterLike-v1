angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaGeolocation, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
      console.log("navigator.geolocation works well");
  }

  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.errorLabel = [];
  $scope.mapDetails = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Create the register modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });
  // Create the register done modal that we will use later
  $ionicModal.fromTemplateUrl('templates/succRegister.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.succRegisterModal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/succLogin.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.succLoginModal = modal;
  });



  //Google map init
  function initMap() {
    var geocoder = new google.maps.Geocoder;
    geocodeLatLng(geocoder);
  };

  function geocodeLatLng(geocoder) {
   /* var input = document.getElementById('latlng').value;
    var latlngStr = input.split(',', 2);*/
    var latlng = {lat: $scope.mapDetails.latitude, lng: $scope.mapDetails.longitude};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          
          var locationObj = {city: results[0].address_components[5].long_name, state:results[0].address_components[7].long_name, country: results[0].address_components[8].long_name};
          $scope.mapDetails.city = locationObj.city;
          $scope.mapDetails.state = locationObj.state;
          $scope.mapDetails.country = locationObj.country;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  getLocation = function(){
    var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat  = position.coords.latitude;
                var longi = position.coords.longitude;
                var myLatlng = {latitude: lat, longitude:longi};
                $scope.mapDetails =  myLatlng;
                console.log('Map details:',$scope.mapDetails);
                initMap();
            }, function(err) {
                $ionicLoading.hide();
                console.log(err);
            });
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.closeRegisterLogin = function() {
    $scope.registerModal.hide();
  };
  $scope.closeSuccRegisterLogin = function() {
    $scope.succRegisterModal.hide();
    $scope.modal.show();
  };
  $scope.closeSuccLogin = function() {
    $scope.succLoginModal.hide();
    $scope.modal.hide();
  };



  $scope.doRegister = function(){
    
    console.log('form submitted for validation');
    if($scope.registerData.password !== $scope.registerData.cpassword){
      $scope.errorLabel.push('Passwords do not match.\n') ;
    }
    if($scope.registerData.password.length < 8){
      $scope.errorLabel.push('Password is too short.\n');
    }
    if($scope.errorLabel.length === 0){
      console.log('Successfuly Validated');
      mapOptions = $scope.mapDetails ;
      console.log('doRegister func() Map details:',$scope.mapDetails);
      var UserObject = {
        username: $scope.registerData.username,
        password: $scope.registerData.password,
        email: $scope.registerData.email,
        dob: $scope.registerData.dob,
        location: $scope.mapDetails
      };
      $http.post('http://127.0.0.1:3000/user',UserObject).success(function(response){
        console.log(response);
        $scope.succRegisterModal.show();
      });
    }
  }
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Open the login modal
  $scope.register = function() {
    console.log('register modal clicked');
    getLocation();
    $scope.registerModal.show();
  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $http.get('http://127.0.0.1:3000/user/').success(function(response){

      $scope.userData = response;
      console.log('userData is:',$scope.userData);
      response.forEach(function(res){
        if(res.username === $scope.loginData.username){
          if(res.password === $scope.loginData.password){
            $scope.succLoginModal.show();
          }
        }
      });
      
    });
    
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
  };
})

