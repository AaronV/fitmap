this.Fitmap.controller('HomeCtrl', [
  '$rootScope',
  '$scope',
  'Session',
  function($rootScope, $scope, Session) {

    Session.requestCurrentUser();
    $rootScope.$on('currentUser.change', function(e, data) {
      $scope.currentUser = data;
    });

    $scope.currentUserOwnsThis = function(thing) {
      return thing.user.id === $scope.currentUser.id;
    };

  }
]);
