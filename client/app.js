let app = angular.module('app', ['ui.router', 'app.auth', 'app.main', 'app.candidates', 'angularUtils.directives.dirPagination', 'oc.lazyLoad']);
app.config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).run(function ($rootScope) {
    if (typeof localStorage.userData != "undefined") {
        $rootScope.userData = JSON.parse(localStorage.userData);
    }
});