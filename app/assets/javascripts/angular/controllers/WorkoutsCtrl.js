this.Fitmap.controller('WorkoutsCtrl', [
  '$rootScope',
  '$scope',
  '$cookieStore',
  'WorkoutService',
  '$location',
  'workouts',
  function($rootScope, $scope, $cookieStore, WorkoutService, $location, workouts) {

    $scope.workouts = _.map(workouts, function(wo) { return WorkoutService.new(wo); });

    $scope.go = function(workout) {
      $location.path('/workouts/' + workout.id);
    };

    $scope.createWorkout = function() {
      $location.path('/workouts/new');
    };
  }
]);
