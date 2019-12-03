(function () {
    'use strict';

    /* jshint -W098 */

    function CandidatesController($scope, $stateParams, $rootScope, $ocLazyLoad, Http, Message) {
        var vm = this;
        $scope.urlPath = window.location.origin;
        $scope.radio = {};
        vm.doc13 = '';
        vm.doc33 = '';
        vm.doc84 = '';
        vm.doc123 = '';
        vm.doc242 = '';
        vm.doc232 = '';
        vm.doc222 = '';
        vm.doc212 = '';
        vm.doc202 = '';
        vm.doc192 = '';
        vm.doc182 = '';
        vm.radio_values = {};
        vm.radio_values.init_doc13 = "";
        vm.radio_values.init_doc33 = "";
        vm.radio_values.init_doc124 = "";
        vm.radio_values.init_doc84 = "";
        vm.radio_values.init_doc123 = "";
        vm.radio_values.init_doc53 = "";
        $scope.packages = {
            name: 'candidates',
            finalAction: false,
            selectedOfficer: '0',
            searchByCandidateID: '',
            barCodeValue: '',
            barCodeToCandidate: '',
            showNoPhotos: false,
            currentTab: 0,
            maxlength: 30,
            comment: '',
            filterDD: ''
        };


        $scope.remarksText = {
            '3c2':'Document correct remarks',
            '3c3':'New community',
            '3c4':'New sub caste'
        };

        $scope.titles =
        {
            "10th / SSLC Certificate": 'SSLC Certificate',
            "XII / HSC Certificate": 'HSC Certificate',
            "Community Certificate": 'Community Certificate',
            "Diploma Certificate": 'Diploma Certificate',
            "Graduation Degree Certificate": 'UG Degree Certificate',
            "PSTM Certificate": 'PSTM Certificate',
            "Destitute Widow Certificate":'DESTITUTE WIDOW',
            "Discharged / to be discharged certificate":'EX-SERVICEMEN',
            "Highest Certificate For NSS":'NSS CERTIFICATE',
            "Highest Certificate For NCC":'NCC CERTIFICATE',
            "Medal Certificate (For Department)":'MEDAL',
            "Noc (Police Department)":'NOC (POLICE DEPARTMENT)',
            "Highest Sports Certificate":'SPORTS SPECIAL MARK CERTIFICATE',
            "Additional Mark":'Additional Mark',
            "Gender Certificate(Transgender)":'Gender Certificate(Transgender)',
            "Photo":'PHOTO',
            "Sign":'SIGNATURE',
            "MCA - 3 years":'MCA - 3 years',
            "M.E. or M.Tech. degree in Computer Science or I.T. - 2 years":'M.E. or M.Tech. degree in Computer Science or I.T. - 2 years',
            "M.E or M.Tech degree in Communication Systems - 2 years":'M.E or M.Tech degree in Communication Systems - 2 years',
            "Post Graduate Diploma in Computer application - 1 year":'Post Graduate Diploma in Computer application - 1 year',
            "B.E or B.Tech degree in Computer Science or I.T - 4 years":'B.E or B.Tech degree in Computer Science or I.T - 4 years',
            "BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years":'BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years',
            "B.E. degree in Electronics and Communication Engineering - 4 years":'B.E. degree in Electronics and Communication Engineering - 4 years',
            "PG Degree Certificate":'PG Degree Certificate',
            "Noc (Other Department)":'NOC (OTHER DEPARTMENT)'
        };

        $scope.object = Object;


        $scope.number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $scope.device_details = false;


        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.resetValues = function () {
            vm.doc13 = '';
            vm.doc32 = '';
            vm.doc33 = '';
            vm.doc34 = '';
            vm.doc84 = '';
            vm.doc123 = '';
            vm.doc242 = '';
            vm.doc232 = '';
            vm.doc222 = '';
            vm.doc212 = '';
            vm.doc202 = '';
            vm.doc192 = '';
            vm.doc182 = '';
            vm.radio_values = {};
            vm.radio_values.init_doc13 = "";
            vm.radio_values.init_doc32 = "";
            vm.radio_values.init_doc33 = "";
            vm.radio_values.init_doc34 = "";
            vm.radio_values.init_doc124 = "";
            vm.radio_values.init_doc53 = "";
            vm.radio_values.init_doc84 = "";
            vm.radio_values.init_doc123 = "";
            $scope.radio = {};
            $('#dd-comment-2').val('');
            $('#dd-comment-3').val('');
            $scope.packages.comment='';
            $("#modal-form input[type=radio], #modal-form input[type=text], #modal-form select").removeAttr("disabled")
        };

        $scope.getQuestions = function () {
            Http.get("/assets/question.json", 'local').then(function (object) {
                $rootScope.documentWithQuestions = object;
            })
        };

        if ($rootScope.documentWithQuestions == undefined) {
            $scope.getQuestions();
        }

        $scope.pageChangeHandler = function (num, sortValue) {
            $scope.currentPage = num;
            Http.get("/ui/candidate-list", {
                limit: $scope.pageSize,
                offset: parseInt(($scope.currentPage - 1) * $scope.pageSize),
                candidate_id: $scope.packages.searchByCandidateID,
                status: $scope.packages.filterDD
            }).then(function (object) {
                if (object['code'] == 1) {
                    $scope.rows = object.data.list;
                    $scope.totalCount = object.data.total_count;
                } else {
                    $scope.rows = [];
                }
            })
        };

        $('body').on('change','#DD', function () {
            $scope.packages.filterDD = $(this).val();
            $scope.pageChangeHandler(1);
        });

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $scope.pageChangeHandler($scope.currentPage);
        $scope.showVerify = true;
        $scope.getDocumentData = function (candidate_id) {

            Http.get("/ui/candidate/" + candidate_id, {
                level: $rootScope.userData['level']
            }).then(function (object) {
                if (object['code'] == 1) {
                    $scope.candidateDetails = object['data'];
                    $scope.finalJsonData = {};
                    $scope.resetValues();
                    $scope.safeApply();
                    if (typeof $scope.candidateDetails['document_list'][0]['status']['level' + $rootScope.userData['level']] != undefined && $scope.candidateDetails['document_list'][0]['status']['level' + $rootScope.userData['level']].length == 0) {
                        $scope.showVerify = true;
                    } else {
                        $scope.showVerify = false;
                        //Document is submitted and to view the questions make the final json data object as it is
                        for (var i in $scope.candidateDetails['document_list']) {
                            // console.log($scope.documentWithQuestions[$scope.candidateDetails['document_list'][i]['odm_name']]);
                            $scope.finalJsonData[$scope.candidateDetails['document_list'][i]['odm_name']] = $scope.candidateDetails['document_list'][i]['status']['level' + $rootScope.userData.level][0];
                            $scope.radio[$scope.documentWithQuestions[$scope.candidateDetails['document_list'][i]['odm_name']][0]['doc_id']] = $scope.candidateDetails['document_list'][i]['status']['level' + $rootScope.userData.level][0]['answers'][0]['ans_id']

                        }

                        console.log('final json data');
                        console.log($scope.finalJsonData);
                        $scope.selectedInnerDoc = 0;
                    }
                    $('#sideNav').animate({'right': '0%'}, 300);
                } else {
                    Message.error(object['message']);
                }

            });
        };

        $scope.showCustomModal = function (candidate_id, rowsCurrentIndex) {
            $scope.selectedIndex = rowsCurrentIndex;
            $scope.getDocumentData(candidate_id);
        };

        $scope.closeCustomModal = function () {
            $(".right-side-nav input[type='text']").val('');
            $(".right-side-nav select").val('');
            $scope.packages.finalAction = false;
            $scope.packages.showNoPhotos = false;
            $scope.checkEventPhoto = [];
            $('#sideNav').animate({'right': '-65%'}, 300);
        };

        $('#searchByCandidateID').keydown(function (e) {
            if (e.keyCode == 13) {
                $scope.pageChangeHandler(1);
            }
        });

        $scope.safeApply = function (fn) {
            if (this.$root) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            }
        };

        $scope.selectedDocNo = '';
        $scope.showSubmit = false;
        $scope.finalJsonData = {};

        $scope.selectedInnerDoc = 0;
        $scope.changeIframeSrc = function (path_name, index) {
            $scope.selectedInnerDoc = index;
            $('#docFrame').attr("src", path_name);
        };

        $scope.showModal = function () {
            $scope.selectedDocNo = 0;
            $scope.showSubmit = false;
            $scope.showModalData();
        };
        $scope.showModalData = function () {
            $scope.selectedDocType = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['odm_name'];
            $scope.selectedDocPath = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['ocd_doc_file_name'];
            $('#docFrame').attr("src", $scope.selectedDocPath);
            if ($scope.selectedDocNo == 0) {
                $('#modal-form').modal();
            }
        };

        $scope.openDocFile = function (path) {
            window.open(path);
        };

        $scope.showHistory = function (index) {
            $scope.selectedDocNo = index;
            $scope.selectedDocType = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['odm_name'];
            $scope.selectedDocPath = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['ocd_doc_file_name'];
            $('#docFrame').attr("src", $scope.selectedDocPath);
            $('#modal-form').modal();
            $scope.setAnswerGiven();
            console.log("SHOW HISTORY CALLED")
        };

        $scope.previousQuestions = function () {
            $scope.selectedDocNo = ($scope.selectedDocNo - 1);
            $scope.selectedDocType = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['odm_name'];
            $scope.selectedDocPath = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['ocd_doc_file_name'];
            $scope.selectedInnerDoc = 0;
            $('#docFrame').attr("src", $scope.selectedDocPath);
        };


        $scope.showNextQuestion = function (value) {

            var answers = [];
            var documentApproved = 1;
            var flag = false;
            $scope.selectedInnerDoc = 0;

            let fields = $("label:visible input[type=text], label:visible select");
            if ($("label:visible input[type=text], label:visible select").length > 0) {
                for (let i = 0; i < fields.length; i++) {
                    if ($(fields[i]).val() == "") {
                        alert("All fields are mandatory");
                        return false;
                    }
                }
            }

            for (var i in $scope.documentWithQuestions[$scope.selectedDocType]) {
                var radioName = 'radio' + $scope.documentWithQuestions[$scope.selectedDocType][i]['doc_id'] +
                    $scope.documentWithQuestions[$scope.selectedDocType][i]['q_id'];
                if ($('input[name=' + radioName + ']').length > 0) {
                    if (!$('input[name=' + radioName + ']:checked').val()) {
                        alert('Please give all the answers');
                        return false;
                    } else {
                        if ($scope.documentWithQuestions[$scope.selectedDocType][i]['approved'] != $('input[name=' + radioName + ']:checked').val() && $scope.documentWithQuestions[$scope.selectedDocType][i]['required'] !== false) {
                            documentApproved = 2;
                        }

                        var object = {
                            "qn_id": $scope.documentWithQuestions[$scope.selectedDocType][i]['q_id'],
                            "ans_id": $('input[name=' + radioName + ']:checked').val()
                        };

                        if (typeof vm["doc" + $scope.documentWithQuestions[$scope.selectedDocType][i]['doc_id'] + $scope.documentWithQuestions[$scope.selectedDocType][i]['q_id']] != "undefined") {
                            object['additional_info'] = vm["doc" + $scope.documentWithQuestions[$scope.selectedDocType][i]['doc_id'] + "" + $scope.documentWithQuestions[$scope.selectedDocType][i]['q_id']]
                        }
                        answers.push(object);

                        if ($('input[name=' + radioName + ']:checked').val() != 1 && flag != true) {
                            break
                        } else {
                            flag = true
                        }
                    }
                }
            }

            $scope.finalJsonData[$scope.selectedDocType] = {
                "doc_id": $scope.documentWithQuestions[$scope.selectedDocType][0]['doc_id'],
                "status": documentApproved,
                "answers": answers
            };

            if ($scope.selectedDocNo != ($scope.candidateDetails['document_list'].length - 1)) {
                $scope.selectedDocNo++;
                $scope.showModalData();
            }

            if ($scope.selectedDocNo == ($scope.candidateDetails['document_list'].length - 1)) {
                $scope.showSubmit = true;
            }

            console.log($scope.candidateDetails['document_list']);

            if (value == 'done') {
                $('#modal-form').modal("toggle");
                $scope.candidateDetails['document_list'].push('hi');
                $scope.candidateDetails['document_list'].splice($scope.candidateDetails['document_list'].length - 1, 1);
            }
            console.log('final json');
            console.log($scope.finalJsonData);
        };


        $scope.setAnswerGiven = function () {
            if (typeof $scope.finalJsonData[$scope.selectedDocType] != 'undefined') {
                setTimeout(function () {
                    for (var x = 0; x < $scope.finalJsonData[$scope.selectedDocType].answers.length; x++) {
                        var radioName = 'radio' + $scope.finalJsonData[$scope.selectedDocType]['doc_id'] +
                            $scope.finalJsonData[$scope.selectedDocType].answers[x]['qn_id'];
                        if ($("input[name=" + radioName + "]").length > 0) {
                            $("input[name=" + radioName + "]").val([parseInt($scope.finalJsonData[$scope.selectedDocType].answers[x]['ans_id'])]);
                            vm.radio_values['init_doc' + $scope.finalJsonData[$scope.selectedDocType]['doc_id'] + $scope.finalJsonData[$scope.selectedDocType].answers[x]['qn_id']] = $scope.finalJsonData[$scope.selectedDocType].answers[x]['ans_id'].toString();
                            vm['doc' + $scope.finalJsonData[$scope.selectedDocType]['doc_id'] + $scope.finalJsonData[$scope.selectedDocType].answers[x]['qn_id']] = $scope.finalJsonData[$scope.selectedDocType].answers[x]['additional_info'];
                            console.log("ADDITIONAL INFO", $scope.finalJsonData[$scope.selectedDocType].answers[x]['additional_info'])
                            console.log(vm);
                            console.log(vm.radio_values);
                        }
                    }
                    $scope.initializeInputs();
                    $scope.safeApply();
                }, 200);
            } else {
                console.log("IN THE ELSE PART")
            }
            setTimeout(function () {
                if ($scope.rows[$scope.selectedIndex].status != 0) {
                    $("#modal-form input[type=radio], #modal-form input[type=text], #modal-form select").attr("disabled", "disabled")
                }
            }, 200)
        };

        $scope.initializeInputs = function () {
            setTimeout(function () {
                $("#doc13, #doc84, #doc123").datepicker({
                    format: 'dd-mm-yyyy',
                    orientation: "auto"
                }).on('changeDate', function (value) {
                    vm.doc13 = moment(value.date).format("DD-MM-YYYY")
                })
            },0);
        };

        $scope.$watch('selectedDocNo', function () {

            console.log('watch');
            console.log($scope.selectedDocNo);
            console.log($scope.candidateDetails);

            if ($scope.selectedDocNo >= 0 && $scope.candidateDetails) {
                if ($scope.selectedDocNo == ($scope.candidateDetails['document_list'].length - 1)) {
                    $scope.showSubmit = true;
                } else {
                    $scope.showSubmit = false;
                }
                $scope.setAnswerGiven();
            } else {
                $scope.setAnswerGiven();
            }

        });

        $scope.$watch('radio', function (oldValue, newValue) {
            console.log("radio", oldValue, newValue);
            setTimeout(function () {
                $scope.initializeInputs();
            }, 200);
        }, true);


        $scope.submitQuestion = function (status) {
            if (Object.keys($scope.finalJsonData).length == $scope.candidateDetails['document_list'].length) {
                if ($scope.packages.comment == "" && parseInt($scope.userData.level) > 1) {
                    alert("Please select comment");
                    return false;
                }
                $scope.dataToSend = [];
                for (var key in $scope.finalJsonData) {
                    $scope.dataToSend.push($scope.finalJsonData[key]);
                }

                Http.post("/ui/verify-documents", {
                    candidate_id: $scope.rows[$scope.selectedIndex]['oum_user_id'],
                    level: $rootScope.userData.level,
                    user_id: $rootScope.userData.user_id,
                    document_status: JSON.stringify($scope.dataToSend),
                    comments: $scope.packages.comment,
                    candidate_status:$rootScope.userData.level==1?'':status
                }).then(function (object) {
                    if (object['code'] == 1) {
                        // $scope.getDocumentData($scope.rows[$scope.selectedIndex]['oum_user_id']);
                        $('#sideNav').animate({'right': '-65%'}, 300);
                        $scope.pageChangeHandler($scope.currentPage)
                    } else {
                        alert(object['message']);
                    }
                });
            } else {
                alert('Please input answers for all the questions');
            }

        };

        $scope.openDefinedModal = function (name) {
            $('#' + name).modal('toggle');
        };

        $scope.closeModal = function (name) {
            $('#' + name).modal('toggle');
        };

        document.removeEventListener("keydown",function(){
            alert('removed');
        },false);

        document.addEventListener("keydown", function (e) {
            var keyCode = e.keyCode;
            if (keyCode == 27) {
                if ($('#modal-form').is(':visible')) {
                    $('#modal-form').modal('hide');
                } else if ($('#sideNav').css("right") == '0px') {
                    $scope.closeCustomModal();
                }
            }
        }, true);

        $scope.count = 0;

        $scope.exportCandidateData = function () {
            $("#loader").show();
            Http.get("/ui/download-report", {}).then(function (object) {
                $("#loader").show();
                if (object['code'] == 1) {
                    setTimeout(function () {
                        $("body").append('<a target="_blank" id="download" href="'+object['data']['file_path']+'"></a>');
                        $("#download")[0].click();
                        setTimeout(function () {
                            $("#download").remove();
                        });
                        $("#loader").hide();
                    },3000);
                    // $scope.checkExportDone(object['data']['number']);
                }
            })
        };


        $scope.checkImportDone = function (number) {
            Http.post("/api/tamilnadu/candidates/check-candidate-upload-file", {
                number: number
            }).then(function (object) {
                $("#loader").show();
                if (object['code'] == 1) {
                    $('#file').val('');
                    $("#loader").hide();
                    $scope.pageChangeHandler($scope.currentPage);
                    Message.info("File uploaded successfully");
                } else {
                    setTimeout(function () {
                        $scope.checkImportDone(number);
                    }, 5000);
                }
            })
        };


        $scope.checkExportDone = function (number) {
            Http.post("/api/tamilnadu/candidates/check-candidate-upload-file", {
                number: number
            }).then(function (object) {
                $("#loader").show();
                if (object['code'] == 1) {
                    $("#loader").hide();
                    $scope.count++;
                    $("body").append("<a id='downloadable" + $scope.count + "' download target='_blank' href='" + window.location.origin + "/api/tamilnadu/candidates/download?file=" + number + "'></a>")
                    setTimeout(function () {
                        $("#downloadable" + $scope.count)[0].click();
                        $("#downloadable" + $scope.count).remove();
                    }, 5000);
                } else {
                    setTimeout(function () {
                        $scope.checkExportDone(number);
                    }, 5000);
                }
            })
        };

        $scope.uploadCandidateData = function () {
            var formData = new FormData();
            formData.append('file', $('#file')[0].files[0]);
            $.ajax({
                url: window.location.origin + '/api/tamilnadu/candidates/import-candidates',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data['code'] == 1) {
                        $scope.checkImportDone(data['data']['number']);
                    } else {
                        Message.info(data['message']);
                    }
                }
            });
        };

        $('#file').on('change', function () {
            $("#loader").show();
            $scope.uploadCandidateData();
        });


        $scope.showApplicationForm = function () {
            let user_id = $scope.rows[$scope.selectedIndex]['oum_user_id'];
            Http.getLocal("/api/get-pdf", {
                user_id: user_id
            }).then(function (response) {
                if (response.code == 1) {
                    $("body").append('<a target="_blank" id="download" href="/assets/uploads/' + user_id + '/' + user_id + '.pdf"></a>');
                    $("#download")[0].click();
                    setTimeout(function () {
                        $("#download").remove();
                    })
                } else {
                    alert(response.message)
                }
            });
        };
    }

    angular
        .module('app.candidates').config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
    }])
        .controller('CandidatesController', CandidatesController);

    CandidatesController.$inject = ['$scope', '$stateParams', '$rootScope', '$ocLazyLoad', 'Http', 'Message'];
    angular
        .module('app.candidates').directive('tenthSslcCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/10th_SSLC_Certificate.html"
        };
    }).directive('twelthCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/XII_HSC_ITI_Certificate.html"
        };
    }).directive('communityCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Community_Certificate.html"
        };
    }).directive('diplomaCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Diploma_Certificate.html"
        };
    }).directive('degreeCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Degree_Certificate.html"
        };
    }).directive('destituteWidowCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Destitute_Widow_Certificate.html"
        };
    }).directive('pstmCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/PSTM_Certificate.html"
        };
    }).directive('exServicemenCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Ex_Servicemen_Certificate.html"
        };
    }).directive('highestCertificateForNss', function () {
        return {
            templateUrl: "/candidates/view/templates/Highest_Certificate_For_NSS.html"
        };
    }).directive('highestCertificateForNcc', function () {
        return {
            templateUrl: "/candidates/view/templates/Highest_Certificate_For_NCC.html"
        };
    }).directive('medalCertificateForDepartment', function () {
        return {
            templateUrl: "/candidates/view/templates/Medal_Certificate_For_Department.html"
        };
    }).directive('nocCertificateForDepartment', function () {
        return {
            templateUrl: "/candidates/view/templates/NOC_For_Department.html"
        };
    }).directive('highestSportsCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Highest_Sports_Certificate.html"
        };
    }).directive('additionalMark', function () {
        return {
            templateUrl: "/candidates/view/templates/Additional_Mark.html"
        };
    }).directive('transgenderCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Transgender_Certificate.html"
        };
    }).directive('photo', function () {
        return {
            templateUrl: "/candidates/view/templates/Photo.html"
        };
    }).directive('sign', function () {
        return {
            templateUrl: "/candidates/view/templates/Sign.html"
        };
    }).directive('mca', function () {
        return {
            templateUrl: "/candidates/view/templates/MCA.html"
        };
    }).directive('meIt', function () {
        return {
            templateUrl: "/candidates/view/templates/ME_IT.html"
        };
    }).directive('meCs', function () {
        return {
            templateUrl: "/candidates/view/templates/ME_CS.html"
        };
    }).directive('pgCa', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_CA.html"
        };
    }).directive('beIt', function () {
        return {
            templateUrl: "/candidates/view/templates/BE_IT.html"
        };
    }).directive('bca', function () {
        return {
            templateUrl: "/candidates/view/templates/BCA.html"
        };
    }).directive('beEtc', function () {
        return {
            templateUrl: "/candidates/view/templates/BE_ETC.html"
        };
    }).directive('pgDegreeCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Degree.html"
        };
    }).directive('nocCertificateForOtherDepartment', function () {
        return {
            templateUrl: "/candidates/view/templates/NOC_Other_Department.html"
        };
    })
})();


