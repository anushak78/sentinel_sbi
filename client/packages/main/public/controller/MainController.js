angular.module('app.main').controller('MainController', function (Message, Session, $scope) {
    let vm = this;
    vm.logout = function () {
        Session.logout();
    }
});
