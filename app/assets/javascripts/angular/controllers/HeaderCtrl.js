this.Fitmap.controller('HeaderCtrl', [
  '$scope',
  'Session',
  function($scope, Session) {

    // Reset the sign in modal
    angular.element('#session_modal').on('show.bs.modal', function() {
      $scope.showRegistraion = false;
      $scope.user = {
        name: '',
        email: '',
        password: '',
        rememberMe: false
      };
      $scope.$digest();
    });

    $scope.showRegistraion = false;

    $scope.login = function(user) {
      $scope.authError = null;

      Session.login(user.email, user.password)
        .then(function(response) {
          if (!response) {
            $scope.authError = 'Credentials are not valid';
          } else {
            $scope.authError = '';
          }
          angular.element('#session_modal').modal('hide');
        }, function(response) {
          $scope.authError = 'Server offline, please try later';
        });
    };

    $scope.logout = function() {
      Session.logout('/');
    };

    $scope.register = function(user) {
      $scope.authError = null;

      Session.register(user.name, user.email, user.password)
        .then(function(response) {
           console.log(response);
        }, function(response) {
          var errors = '';
          $.each(response.data.errors, function(index, value) {
            errors += index.substr(0,1).toUpperCase()+index.substr(1) + ' ' + value + ''
          });
          $scope.authError = errors;
        });
    };

  }
]);
