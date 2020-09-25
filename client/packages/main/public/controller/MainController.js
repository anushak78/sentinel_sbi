angular.module('app.main').controller('MainController', function (Message, Session, $scope) {
    let vm = this;
    vm.defaultZoom  = '1.0';
    vm.prelogin_fields = {
        username: "",
        email: "",
        phone_no: null,
        sign: null,
        photo: null
    };
    vm.video = document.getElementById('video');
    vm.canvas = document.getElementById('canvas');
    vm.flag = 'btn'
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
    vm.capturePhoto = function () {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                vm.video.srcObject = stream;
                vm.video.play();
                vm.video.width = 500;
                vm.video.height = 400;
                
            }).catch(function(err) {
                console.log("An error occurred: " + err);
            });
        }
    }
    vm.takePhoto = function() {
        var context = vm.canvas.getContext('2d');
        vm.canvas.width = 500;
        vm.canvas.height = 400;
        context.drawImage(vm.video, 0, 0, 500, 400);
        vm.video.srcObject.getVideoTracks().forEach(track => track.stop());
        vm.prelogin_fields.photo = vm.canvas.toDataURL("image/png");
    }
    vm.onFileChange = function(files) {
        vm.prelogin_fields.sign = files[0]
    }
    vm.submitDetails = function() {
        if (vm.prelogin_fields.phone_no <= 1111111111 && vm.prelogin_fields.phone_no >= 9999999999) {
            alert("Mobile number is invalid!!")
            return
        }
        if (vm.prelogin_fields.sign.type) {
            if (!vm.prelogin_fields.sign.type.includes('image/')) {
                alert("Signature file should be image!!")
                return
            }
        }
        Http.post('api', vm.prelogin_fields).then(function(data) {
            // todo manage response
        }, err=> {
            // todo manage error
        })
    }
    vm.submitDisabled = function () {
        if (vm.prelogin_fields.username == null || vm.prelogin_fields.username == '') {
            return false
        }
        if (vm.prelogin_fields.email == null || vm.prelogin_fields.email == '') {
            return false
        }
        if (vm.prelogin_fields.phone_no == null) {
            return false
        }
        if (vm.prelogin_fields.sign == null) {
            return false
        }
        if (vm.prelogin_fields.photo == null) {
            return false
        }
        return true
    }
});
