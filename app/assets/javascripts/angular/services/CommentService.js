this.Fitmap.factory('CommentService', [
  'Restangular',
  '$location',
  '$sce',
  function(Restangular, $location, $sce) {
    var self = this;


    // Describe a Comment
    var Comment = function(data) {
      var self = this;

      self.name = "";
      self.body = "";

      _.extend(self, data);
      // self.id
      // self.name
      // self.body
      // self.is_result

      self.htmlBody = (self.body) ? $sce.trustAsHtml(self.body.replace(/\n/g, "<br/>")) : "";

      self.toParams = function() {
        return {
          name: self.name,
          body: self.body,
          is_result: self.is_result
        }
      };
    };

    self.new = function(data) {
      data = (data) ? data : {};
      return new Comment(data);
    };

    self.save = function(comment) {
      var type = "workouts";

      return Restangular.one(type, comment.commentable.id)
        .all('comments')
        .post(comment.toParams()).then(function() {
          comment.commentable.getComments();
          comment.commentable.newComment();
        });
    };

    self.delete = function(comment) {
      console.log(comment);
      var type = "workouts";

      return Restangular.one(type, comment.commentable.id)
        .one('comments', comment.id).remove();
    };

    return self;
  }
]);
