angular.module('app.main').config(function ($stateProvider, $urlRouterProvider) {
    // This router is the start point post authentication.
    $urlRouterProvider.otherwise('/404');
    $stateProvider.state({
        name: 'main',
        url: '',
        templateUrl: '/main/view/main.html',
        resolve: {
            check: function (Session) {
                return Session.validateUser();
            }
        },
        controller: 'MainController',
        controllerAs: '$mainCtrl'
    }).state({
        name: 'home',
        url: '/',
        controller: function ($state) {
            $state.go("sign-in")
        }
    }).state({
        name: '404',
        url: '/404',
        templateUrl: '/utilities/view/404.html'
    }).state({
        name: 'pre-sign-in',
        url: '/pre-sign-in',
        templateUrl: '/main/view/includes/pre-sign-in.html',
        controller: 'MainController',
        controllerAs: '$ctrl'
    })
});
