this.Fitmap = angular.module('Fitmap', [
  'ngRoute',
  'ngCookies',
  'restangular'
]);


// 401 Interceptor and Sessions stuff
this.Fitmap.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

    var interceptor = [
      '$location',
      '$rootScope',
      '$q',
      function($location, $rootScope, $q) {
        function success(response) {
          return response
        };

        function error(response) {
          if (response.status == 401) {
            $rootScope.$broadcast('event:unauthorized');
            // $location.path('/');
            return response;
          };
          return $q.reject(response);
        };

        return function(promise) {
          return promise.then(success, error);
        };
      }
    ];
    $httpProvider.responseInterceptors.push(interceptor);
  }
]);


// Routes
this.Fitmap.config([
  '$routeProvider',
  'RestangularProvider',
  function($routeProvider, RestangularProvider) {
    // Routes
    $routeProvider.when(
      '/workouts/:id/edit', {
        templateUrl: 'templates/workouts/edit.html',
        controller: 'WorkoutCtrl',
        resolve: {
          workout: [
            'Restangular',
            '$route',
            function(Restangular, $route) {
              return Restangular.one('workouts', $route.current.params.id).get();
            }
          ]
        }
      }
    ).when(
      '/workouts/new', {
        templateUrl: 'templates/workouts/edit.html',
        controller: 'WorkoutCtrl',
        resolve: {
          workout: function() {
            return null;
          }
        }
      }
    ).when(
      '/workouts/:id', {
        templateUrl: 'templates/workouts/show.html',
        controller: 'WorkoutCtrl',
        resolve: {
          workout: [
            'Restangular',
            '$route',
            function(Restangular, $route) {
              return Restangular.one('workouts', $route.current.params.id).get();
            }
          ]
        }
      }
    );
    $routeProvider.otherwise({
      templateUrl: 'templates/workouts/index.html',
      controller: 'WorkoutsCtrl',
      resolve: {
        workouts: [
          'Restangular',
          function(Restangular) {
            return Restangular.all('workouts').getList();
          }
        ]
      }
    })

    // Restangular
    RestangularProvider.setRequestSuffix('.json');
    // RestangularProvider.setDefaultRequestParams({authenticity_token: authenticityToken});
  }
]);
