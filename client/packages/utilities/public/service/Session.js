(function () {
    function Session(Http, $state, Message, $rootScope) {
        let Session = {
            validateUser: function () {
                return true;
                let object = {};
                if ($rootScope._menu == false) {
                    object['_menu'] = 0;
                }
                return Http.get("/ui/core/whoami", object).then(function (response) {
                    if (response.code === 1) {
                        // sets up the menu
                        $rootScope.MENUS = response.data.menus;
                        $rootScope._menu = true;
                        return true
                    } else {
                        Message.error("Session timed out. Sign in again");
                        return Session.logout();
                    }
                })
            },
            logout: function () {
                return Http.post("/ui/core/logout", {}).then(function (response) {
                    if (response.code === 1) {
                        $rootScope._menu = false;
                        delete localStorage.userData;
                        delete $rootScope.userData;
                        return $state.go("sign-in");
                    } else {
                        Message.error("Something went wrong");
                    }
                })
            }
        };
        return Session;
    }

    angular.module("app").factory("Session", Session);
})();