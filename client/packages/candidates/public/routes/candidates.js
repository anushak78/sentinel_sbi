(function () {
    'use strict';

    function Candidates($stateProvider) {
        $stateProvider.state('main.candidates', {
            url: '/candidates',
            views: {
                main: {
                    templateUrl: '/utilities/view/central-layout.html',
                    controller: function ($state) {
                        console.log($state);
                        console.log(this.name)
                    }
                }
            }
        }).state('main.candidates.list', {
            url: '/list',
            templateUrl: '/candidates/view/list.html',
            controller: 'CandidatesController',
            controllerAs: "$ctrl"
        });
    }

    angular
        .module('app.candidates')
        .config(Candidates);

    Candidates.$inject = ['$stateProvider'];

})();
