this.Fitmap.factory('WorkoutService', [
  '$rootScope',
  'Restangular',
  'CommentService',
  '$http',
  '$location',
  '$sce',
  function($rootScope, Restangular, CommentService, $http, $location, $sce) {
    var self = this;


    self.workouts = [];
    self.workout = null;


    // Describe a Workout object
    var Workout = function(data) {
      var self = this;

      _.extend(self, data);
      // self.id
      // self.name
      // self.description
      // self.participants

      self.createdAt = moment(self.created_at).format('MMM D, YYYY');
      self.htmlDescription = (self.description) ? $sce.trustAsHtml(self.description.replace(/\n/g, "<br/>")) : "";

      self.toParams = function() {
        return {
          id: self.id,
          name: self.name,
          description: self.description,
          participants: self.participants,
          notify_participants: self.notify_participants
        }
      };

      // Comments
      self.comments = [];
      self.getComments = function() {
        Restangular.one('workouts', self.id).getList('comments')
          .then(function(comments) {
            self.comments = [];
            angular.forEach(comments, function(comment){
              var c = CommentService.new(comment);
              c.commentable = self;
              self.comments.push(c);
            });
          });
      };
      self.newComment = function(data) {
        self.comment = CommentService.new({
          body: '',
          is_result: false,
          commentable: self
        });
      };
    };

    self.new = function(data) {
      return new Workout(data);
    };

    self.save = function(workout) {
      // Update
      if (workout.id) {
        $http.put('workouts/' + workout.id + '.json', {
          workout: workout.toParams()
        })
          .success(function() {
            $location.path('/workouts/' + workout.id);
          })
      // Create
      } else {
        $http.post('workouts.json', {
          workout: workout.toParams()
        })
          .success(function(data) {
            $location.path('/workouts/' + data.id);
          });
      }
    };

    self.delete = function(workout) {
      $http.delete('workouts/' + workout.id + '.json')
        .success(function(data) {
          $location.path('/');
        });
    };

    return self;
  }
]);
