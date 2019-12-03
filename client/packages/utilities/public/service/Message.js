(function () {
    function Message() {
        return {
            info: function (text) {
                $.notify({
                    message: text
                }, {
                    type: 'success',
                    placement: {
                        form : 'top',
                        align : 'center'
                    }
                });

            },
            error: function (text) {
                $.notify({
                    message: text
                }, {
                    type: 'danger',
                    placement: {
                        form : 'top',
                        align : 'center'
                    }
                });

            }
        }
    }

    angular.module("app").factory("Message", Message);
})();