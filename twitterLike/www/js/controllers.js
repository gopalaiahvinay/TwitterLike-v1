angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.errorLabel = [];

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


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.closeRegisterLogin = function() {
    $scope.registerModal.hide();
  };

  $scope.doRegister = function(){
    console.log('form submitted for validation');
    if($scope.registerData.password !== $scope.registerData.cpassword){
      $scope.errorLabel.push('Passwords do not match.\n') ;
    }
    if($scope.registerData.password.length < 8){
      $scope.errorLabel.push('Password is too short.\n');
    }
  }
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Open the login modal
  $scope.register = function() {
    console.log('register modal clicked');
    $scope.registerModal.show();
  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

