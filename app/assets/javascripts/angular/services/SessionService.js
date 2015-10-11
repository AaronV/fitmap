this.Fitmap.factory('Session', [
  '$rootScope',
  '$location',
  '$http',
  '$q',
  function($rootScope, $location, $http, $q) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }
    var service = {
      login: function(email, password) {
        return $http.post('/login', {user: {email: email, password: password} })
          .then(function(response) {
            $http.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
            // $rootScope.authenticityToken = response.data.csrfToken;
            service.currentUser = response.data.user;
            $rootScope.$emit('currentUser.change', service.currentUser);
            // if (service.isAuthenticated()) {
            //   //$location.path(response.data.redirect);
            //   $location.path('/record');
            // }
            return this;
          });
      },

      logout: function(redirectTo) {
        $http.post('/logout').then(function(response) {
          $http.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
          // $rootScope.authenticityToken = response.data.csrfToken;
          service.currentUser = null;
          $rootScope.$emit('currentUser.change', service.currentUser);
          redirect(redirectTo);
        });
      },

      register: function(name, email, password) {
        return $http.post('/users.json', {user: {name: name, email: email, password: password} })
        .then(function(response) {
          service.currentUser = response.data;
          $rootScope.$emit('currentUser.change', service.currentUser);
          // if (service.isAuthenticated()) {
          //   $location.path('/record');
          // }
          return this;
        });
      },
      requestCurrentUser: function() {
        if (service.isAuthenticated()) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/current_user').then(function(response) {
            service.currentUser = response.data.user;
            $rootScope.$emit('currentUser.change', service.currentUser);
            return service.currentUser;
          });
        }
      },

      currentUser: null,

      isAuthenticated: function(){
        return !!service.currentUser;
      }
    };
    return service;
  }
]);
