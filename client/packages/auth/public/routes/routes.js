angular.module('app.auth').config(function ($stateProvider) {
    $stateProvider.state({
        name: 'sign-in',
        url: '/authenticate/sign-in',
        templateUrl: '/auth/view/sign-in.html',
        controller: 'SignInController',
        controllerAs: '$ctrl'
    })
});
