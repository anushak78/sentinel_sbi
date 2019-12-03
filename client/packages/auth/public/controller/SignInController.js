(function () {

    function SignInController($scope, Http, Message, $state, $location, $rootScope) {
        let vm = this;
        vm.fields = {
            login: "",
            password: ""
        };
        vm.signIn = function () {
            Http.post("/ui/core/login", vm.fields).then(function (data) {
                if (data.authenticated) {
                    $state.go("main.candidates.list");
                    $rootScope.userData = data;
                    localStorage.userData = JSON.stringify($rootScope.userData);
                } else {
                    Message.error("Invalid credentials")
                }
            });
        }
    }

    angular.module("app.auth").controller('SignInController', SignInController);
})();