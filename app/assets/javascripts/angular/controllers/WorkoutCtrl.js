this.Fitmap.controller('WorkoutCtrl', [
  '$rootScope',
  '$scope',
  'WorkoutService',
  'CommentService',
  '$routeParams',
  '$location',
  'workout',
  function($rootScope, $scope, WorkoutService, CommentService, $routeParams, $location, workout) {
    if (!_.isNaN(Number($routeParams.id))) {
      $scope.workout = WorkoutService.new(workout);
      $scope.workout.getComments();
      $scope.workout.newComment();
      $scope.workout.notify_participants = true;
    } else {
      $scope.workout = WorkoutService.new();
      $scope.workout.notify_participants = true;
    }

    $scope.showComments = true;
    $scope.$watch('showComments', function(newValue) {
      $scope.workout.comment.is_result = !newValue;
    });

    $scope.show = function() {
      $location.path('/workouts/' + $scope.workout.id);
    };

    $scope.save = function() {
      WorkoutService.save($scope.workout);
    };

    $scope.delete = function() {
      if (!confirm("Really delete this workout?")) { return; }
      WorkoutService.delete($scope.workout);
    };

    $scope.edit = function() {
      $location.path('/workouts/' + $scope.workout.id + '/edit');
    };


    // Comments
    $('#add_comment').on('shown.bs.modal', function() {
      $('#comment_body').focus();
    });

    $scope.addComment = function() {
      CommentService.save($scope.workout.comment)
        .then(function() {
          $('#add_comment').modal('hide');
          $scope.workout.comment.is_result = !$scope.showComments;
        });
    };

    $scope.deleteComment = function(comment) {
      if (!confirm("Really delete this comment?")) { return; }
      CommentService.delete(comment)
        .then(function() {
          $scope.workout.comments.splice( $scope.workout.comments.indexOf(comment), 1 );
        });
    };
  }
]);
