angular.module('app.main').controller('MainController', function (Message, Session, $scope) {
    let vm = this;
    vm.defaultZoom  = '1.0';
    vm.logout = function () {
        Session.logout();
    };
    vm.gotoFullscreen = function(){
        document.body.requestFullscreen();
    };
    vm.openMenu = function () {
        if($('#nav').css("left") == '0px'){
            $('#nav').animate({left: '-220px'});
        }else{
            $('#nav').animate({left: '0px'});
        }

    };

    vm.incraseZoomSize = function (value){
        vm.defaultZoom  = value;
        document.body.style.zoom = vm.defaultZoom;
    }
});
