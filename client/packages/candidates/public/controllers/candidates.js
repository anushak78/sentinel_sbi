(function () {
    'use strict';

    /* jshint -W098 */

    function CandidatesController($scope, $stateParams, $rootScope, $ocLazyLoad, Http, Message) {
        var vm = this;
        $scope.urlPath = window.location.origin;
        $scope.radio = {};
        vm.doc13 = '';
        vm.doc14 = '';
        vm.doc16 = '';
        vm.doc24 = '';
        vm.doc26 = '';
        vm.doc32 = '';
        vm.doc34 = '';
        vm.doc38 = '';
        vm.doc62 = '';
        vm.doc64 = '';
        vm.doc66 = '';
        vm.doc68 = '';
        vm.doc610 = '';
        vm.doc84 = '';
        vm.doc101 = '';
        vm.doc123 = '';
        vm.doc122 = '';
        vm.doc162 = '';
        vm.doc163 = '';
        vm.doc172 = '';
        vm.doc242 = '';
        vm.doc232 = '';
        vm.doc222 = '';
        vm.doc212 = '';
        vm.doc202 = '';
        vm.doc192 = '';
        vm.doc182 = '';
        vm.doc254 = '';
        vm.doc255 = '';
        vm.doc256 = '';
        vm.doc252 = '';
        vm.doc2512 = '';
        vm.doc2515 = '';
        vm.doc2519 = '';
        vm.doc2520 = '';
        vm.doc2521 = '';
        vm.doc2528 = '';
        vm.doc274 = '';
        vm.doc275 = '';
        vm.doc276 = '';
        vm.doc277 = '';
        vm.doc2713 = '';
        vm.doc284 = '';
        vm.doc285 = '';
        vm.doc286 = '';
        vm.doc287 = '';
        vm.doc294 = '';
        vm.doc295 = '';
        vm.doc2915 = '';
        vm.doc296 = '';
        vm.doc297 = '';
        vm.doc307 = '';
        vm.doc305 = '';
        vm.doc312 = '';
        vm.doc322 = '';
        vm.doc324 = '';
        vm.doc3211 = '';
        vm.doc3212 = '';
        vm.doc332 = '';
        vm.doc334 = '';
        vm.doc3311 = '';
        vm.doc3312 = '';
        vm.doc342 = '';
        vm.doc344 = '';
        vm.doc3411 = '';
        vm.doc3412 = '';
        vm.doc352 = '';
        vm.doc3511 = '';
        vm.doc3512 = '';
        vm.doc362 = '';
        vm.doc364 = '';
        vm.doc372 = '';
        vm.doc375 = '';
        vm.doc3715 = '';
        vm.doc3719 = '';
        vm.doc3720 = '';
        vm.doc3721 = '';

        vm.doc382 = '';
        vm.doc385 = '';
        vm.doc3815 = '';
        vm.doc3819 = '';
        vm.doc3820 = '';
        vm.doc3821 = '';
        vm.doc392 = '';
        vm.doc402 = '';
        vm.doc412 = '';
        vm.doc422 = '';
        vm.doc432 = '';
        vm.doc442 = '';
        vm.doc452 = '';
        vm.doc462 = '';
        vm.doc472 = '';
        vm.doc482 = '';
        vm.doc492 = '';
        vm.doc502 = '';
        vm.doc512 = '';
        vm.doc522 = '';
        vm.doc532 = '';
        vm.doc542 = '';
        vm.doc552 = '';
        vm.doc562 = '';
        vm.doc572 = '';
        vm.doc582 = '';
        vm.doc592 = '';
        vm.doc602 = '';
        vm.doc622 = '';
        vm.doc632 = '';
        vm.doc642 = '';
        vm.doc652 = '';
        vm.doc662 = '';
        vm.doc672 = '';

        vm.radio_values = {};
        vm.radio_values.init_doc13 = "";
        vm.radio_values.init_doc14 = "";
        vm.radio_values.init_doc16 = "";
        vm.radio_values.init_doc24 = "";
        vm.radio_values.init_doc26 = "";
        vm.radio_values.init_doc32 = "";
        vm.radio_values.init_doc34 = "";
        vm.radio_values.init_doc38 = "";
        vm.radio_values.init_doc62 = "";
        vm.radio_values.init_doc64 = "";
        vm.radio_values.init_doc66 = "";
        vm.radio_values.init_doc68 = "";
        vm.radio_values.init_doc610 = "";
        vm.radio_values.init_doc101 = "";
        vm.radio_values.init_doc124 = "";
        vm.radio_values.init_doc162 = "";
        vm.radio_values.init_doc163 = "";
        vm.radio_values.init_doc172 = "";
        vm.radio_values.init_doc84 = "";
        vm.radio_values.init_doc123 = "";
        vm.radio_values.init_doc122 = "";
        vm.radio_values.init_doc53 = "";
        vm.radio_values.init_doc254 = "";
        vm.radio_values.init_doc255 = "";
        vm.radio_values.init_doc257 = "";
        vm.radio_values.init_doc252 = "";
        vm.radio_values.init_doc2512 = "";
        vm.radio_values.init_doc2515 = "";
        vm.radio_values.init_doc2519 = "";
        vm.radio_values.init_doc2520 = "";
        vm.radio_values.init_doc2521 = "";
        vm.radio_values.init_doc2528 = "";
        vm.radio_values.init_doc274 = "";
        vm.radio_values.init_doc275 = "";
        vm.radio_values.init_doc277 = "";
        vm.radio_values.init_doc2713 = "";
        vm.radio_values.init_doc276 = "";
        vm.radio_values.init_doc284 = "";
        vm.radio_values.init_doc285 = "";
        vm.radio_values.init_doc286 = "";
        vm.radio_values.init_doc287 = "";
        vm.radio_values.init_doc294 = "";
        vm.radio_values.init_doc295 = "";
        vm.radio_values.init_doc2915 = "";
        vm.radio_values.init_doc296 = "";
        vm.radio_values.init_doc297 = "";
        vm.radio_values.init_doc307 = "";
        vm.radio_values.init_doc305 = "";
        vm.radio_values.init_doc312 = "";
        vm.radio_values.init_doc322 = "";
        vm.radio_values.init_doc324 = "";
        vm.radio_values.init_doc3211 = "";
        vm.radio_values.init_doc3212 = "";
        vm.radio_values.init_doc332 = "";
        vm.radio_values.init_doc334 = "";
        vm.radio_values.init_doc3311 = "";
        vm.radio_values.init_doc3312 = "";
        vm.radio_values.init_doc342 = "";
        vm.radio_values.init_doc344 = "";
        vm.radio_values.init_doc3411 = "";
        vm.radio_values.init_doc3412 = "";
        vm.radio_values.init_doc352 = "";
        vm.radio_values.init_doc3511 = "";
        vm.radio_values.init_doc3512 = "";
        vm.radio_values.init_doc362 = "";
        vm.radio_values.init_doc364 = "";
        vm.radio_values.init_doc372 = "";
        vm.radio_values.init_doc375 = "";
        vm.radio_values.init_doc3715 = "";
        vm.radio_values.init_doc3719 = "";
        vm.radio_values.init_doc3720 = "";
        vm.radio_values.init_doc3721 = "";
        vm.radio_values.init_doc382 = "";
        vm.radio_values.init_doc385 = "";
        vm.radio_values.init_doc3815 = "";
        vm.radio_values.init_doc3819 = "";
        vm.radio_values.init_doc3820 = "";
        vm.radio_values.init_doc3821 = "";
        vm.radio_values.init_doc392 = "";
        vm.radio_values.init_doc402 = "";
        vm.radio_values.init_doc412 = "";
        vm.radio_values.init_doc422 = "";
        vm.radio_values.init_doc432 = "";
        vm.radio_values.init_doc442 = "";
        vm.radio_values.init_doc452 = "";
        vm.radio_values.init_doc462 = "";
        vm.radio_values.init_doc472 = "";
        vm.radio_values.init_doc482 = "";
        vm.radio_values.init_doc492 = "";
        vm.radio_values.init_doc502 = "";
        vm.radio_values.init_doc512 = "";
        vm.radio_values.init_doc522 = "";
        vm.radio_values.init_doc532 = "";
        vm.radio_values.init_doc542 = "";
        vm.radio_values.init_doc552 = "";
        vm.radio_values.init_doc562 = "";
        vm.radio_values.init_doc572 = "";
        vm.radio_values.init_doc582 = "";
        vm.radio_values.init_doc592 = "";
        vm.radio_values.init_doc602 = "";
        vm.radio_values.init_doc622 = "";
        vm.radio_values.init_doc632 = "";
        vm.radio_values.init_doc642 = "";
        vm.radio_values.init_doc652 = "";
        vm.radio_values.init_doc662 = "";
        vm.radio_values.init_doc672 = "";
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
        vm.notRelevantReasone = [
            'Not Clear',
            'No Document',
            'Incorrect Document'
        ];


        $scope.remarksText = {
            '3c2': 'New community',
            '3c4': 'Not relevant reason',
            '3c8': 'Sub Caste',
            '1c3': 'New date of birth',
            '1c4': 'New year of passing',
            '1c6': 'Not relevant reason',
            '2c4': 'New year of passing',
            '2c6': 'Not relevant reason',
            '6c2': 'New Authority',
            '6c4': 'Relevant PG Degree Reason',
            '6c6': 'Relevant PG Degree in Tamil Reason',
            '6c8': 'Relevant PHD Degree in Tamil Reason',
            '6c10': 'Relevant MEd Degree in Tamil Reason',
            '10c1': 'New Gender',
            '12c2': 'Relevant reason',
            '16c2': 'New Gender',
            '16c3': 'Not relevant reason',
            '17c2': 'Not relevant reason',
            '25c4': 'New Year of Passing',
            '25c5': 'New PG Degree Mark Sheets relevant reason',
            '25c6': 'New Mode of study',
            '25c2': 'Document relevant reason',
            '25c12': 'New equivalence of PG Degree relevant reason',
            '25c15': 'New Month & Year of Passing',
            '25c19': 'New Period of study',
            '25c20': 'New Mode of study',
            '25c21': 'Percentage Remarks',
            '25c28': 'New Foreign PG Degree Relevant Reason',
            '27c4': 'New Year of Passing',
            '27c5': 'New Period of study',
            '27c6': 'New Relevant reason marksheet',
            '27c7': 'Not relevant reason',
            '27c13': 'Percentage of marks in M.Phill',
            '28c4': 'New Year of Passing',
            '28c5': 'New Period of study',
            '28c6': 'New Mode of study',
            '28c7': 'New relevant reason',
            '29c4': 'New Year of Passing',
            '29c5': 'New Period of study',
            '29c15': 'Foregin document relevant',
            '29c6': 'New Mode of study',
            '29c7': 'Not relevant reason',
            '30c7': 'Not relevant reason',
            '30c5': 'New Birth Certificate Marksheet',
            '31c2': 'New relevant reason',
            '32c2': 'New relevant reason',
            '32c4': 'New Degree Mark Sheets relevant reason',
            '32c11': 'New Date of Passing',
            '32c12': 'New Percentage of marks',
            '33c2': 'Relevant document resaon',
            '33c4': 'Relevant Marksheet reason',
            '33c11': 'New Year of passing',
            '33c12': 'New Percentage of marks',
            '34c2': 'New Relevant reason',
            '34c4': 'Degree mark sheet relevant reason',
            '34c11': 'New Month and Year of Passing',
            '34c12': 'New Percentage reason',
            '35c2': 'New relevant Reason',
            '35c11': 'New Month and Year of Passing',
            '35c12': 'New Percentage reason',
            '36c2': 'Last studied conduct relevant',
            '36c4': 'Latest Conduct Certificate relevant reason',
            '37c2': 'Document relevant reason',
            '37c5': 'UG Marksheet relevant reason',
            '37c15': 'New Month & Year of passing',
            '37c19': 'Period of study',
            '37c20': 'Mode of study',
            '37c21': 'Percentage of marks',
            '38c2': 'Document relevant reason',
            '38c5': 'UG Marksheet relevant reason',
            '38c15': 'New Month & Year of passing',
            '38c19': 'Period of study',
            '38c20': 'Mode of study',
            '38c21': 'Percentage of marks',
            '39c2': 'Relevant document reason',
            '40c2': 'Relevant document reason',
            '41c2': 'Relevant document reason',
            '42c2': 'Relevant document reason',
            '43c2': 'Relevant document reason',
            '44c2': 'Relevant document reason',
            '45c2': 'Relevant document reason',
            '46c2': 'Relevant document reason',
            '47c2': 'Relevant document reason',
            '48c2': 'Relevant document reason',
            '49c2': 'Relevant document reason',
            '50c2': 'Relevant document reason',
            '51c2': 'Relevant document reason',
            '52c2': 'Relevant document reason',
            '53c2': 'Relevant document reason',
            '54c2': 'Relevant document reason',
            '55c2': 'Relevant document reason',
            '56c2': 'Relevant document reason',
            '57c2': 'Relevant document reason',
            '58c2': 'Relevant document reason',
            '59c2': 'Relevant document reason',
            '60c2': 'Relevant document reason',
            '62c2': 'Relevant document reason',
            '63c2': 'Relevant document reason',
            '64c2': 'Relevant document reason',
            '65c2': 'Relevant document reason',
            '66c2': 'Relevant document reason',
            '67c2': 'Relevant document reason'
        };

        $scope.titles =
            {
                "10th / SSLC Certificate": 'SSLC Certificate',
                "12th / HSC Certificate": 'HSC Certificate',
                "Community Certificate": 'Community Certificate',
                "Diploma Certificate": 'Diploma Certificate',
                "Graduation Degree Certificate": 'UG Degree Certificate',
                "PSTM Certificate": 'PSTM Certificate',
                "General Information": 'General Information',
                "Discharged / to be discharged certificate": 'EX-SERVICEMEN',
                "Highest Certificate For NSS": 'NSS CERTIFICATE',
                "Highest Certificate For NCC": 'NCC CERTIFICATE',
                "Medal Certificate (For Department)": 'MEDAL',
                "NOC (For Department)": 'No Objection Certificate',
                "Highest Sports Certificate": 'SPORTS SPECIAL MARK CERTIFICATE',
                "Additional Mark": 'Additional Mark',
                "Gender Certificate(Transgender)": 'Gender Certificate(Transgender)',
                "Photo": 'PHOTO',
                "Sign": 'SIGNATURE',
                "MCA - 3 years": 'MCA - 3 years',
                "M.E. or M.Tech. degree in Computer Science or I.T. - 2 years": 'M.E. or M.Tech. degree in Computer Science or I.T. - 2 years',
                "M.E or M.Tech degree in Communication Systems - 2 years": 'M.E or M.Tech degree in Communication Systems - 2 years',
                "Post Graduate Diploma in Computer application - 1 year": 'Post Graduate Diploma in Computer application - 1 year',
                "B.E or B.Tech degree in Computer Science or I.T - 4 years": 'B.E or B.Tech degree in Computer Science or I.T - 4 years',
                "BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years": 'BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years',
                "B.E. degree in Electronics and Communication Engineering - 4 years": 'B.E. degree in Electronics and Communication Engineering - 4 years',
                "PG Degree Certificate": 'PG Degree Certificate',
                "Noc (Other Department)": 'NOC (OTHER DEPARTMENT)',
                "M.Phil Certificate": 'M.Phil Certificate',
                "SLET/NET Certificate": 'SLET / NET Certificate',
                "Phd Certificate": 'PHD Certificate',
                "Birth Certificate": 'Birth Certificate',
                "PWD Certificate": 'Special Category',
                "Special B.Ed in Teaching the Hearing Impairment – Marksheet": 'Special B.Ed in Teaching the Hearing Impairment',
                "Senior Diploma in Teaching Deaf (Hearing Impairment) – Marksheet": 'Senior Diploma in Teaching Deaf (Hearing Impairment)',
                "B.Ed Certificate": 'B.Ed.',
                "M.Ed Certificate": 'M.Ed.',
                "Conduct certificate from head of institution last studied": 'Conduct Certificate',
                "UG Degree / Equivalent or Provsisional Certificate": 'UG Degree',
                "UG Degree / Equivalent Consolidated Marksheet": 'UG Degree Consolidated Marksheet',
                "Work Experience 1": 'Work Experience 1',
                "Work Experience 2": 'Work Experience 2',
                "Work Experience 3": 'Work Experience 3',
                "Work Experience 4": 'Work Experience 4',
                "Work Experience 5": 'Work Experience 5',
                "UG Degree / Equivalent Marksheet 1": 'UG Degree / Equivalent Marksheet 1',
                "UG Degree / Equivalent Marksheet 2": 'UG Degree / Equivalent Marksheet 2',
                "UG Degree / Equivalent Marksheet 3": 'UG Degree / Equivalent Marksheet 3',
                "UG Degree / Equivalent Marksheet 4": 'UG Degree / Equivalent Marksheet 4',
                "UG Degree / Equivalent Marksheet 5": 'UG Degree / Equivalent Marksheet 5',
                "B.Ed Degree / Equivalent Marksheet": 'B.Ed Degree / Equivalent Consolidated Marksheet',
                "B.Ed Degree / Equivalent Marksheet 1": 'B.Ed Degree / Equivalent Marksheet 1',
                "B.Ed Degree / Equivalent Marksheet 2": 'B.Ed Degree / Equivalent Marksheet 2',
                "B.Ed Degree / Equivalent Marksheet 3": 'B.Ed Degree / Equivalent Marksheet 3',
                "B.Ed Degree / Equivalent Marksheet 4": 'B.Ed Degree / Equivalent Marksheet 4',
                "B.Ed Degree / Equivalent Marksheet 5": 'B.Ed Degree / Equivalent Marksheet 5',
                "M.Ed Degree / Equivalent Marksheet": 'M.Ed Degree / Equivalent Consolidated Marksheet',
                "M.Ed Degree / Equivalent Marksheet 1": 'M.Ed Degree / Equivalent Marksheet 1',
                "M.Ed Degree / Equivalent Marksheet 2": 'M.Ed Degree / Equivalent Marksheet 2',
                "M.Ed Degree / Equivalent Marksheet 3": 'M.Ed Degree / Equivalent Marksheet 3',
                "M.Ed Degree / Equivalent Marksheet 4": 'M.Ed Degree / Equivalent Marksheet 4',
                "M.Ed Degree / Equivalent Marksheet 5": 'M.Ed Degree / Equivalent Marksheet 5',
                "PG Degree / Equivalent Consolidated Marksheet": 'PG Degree / Equivalent Consolidated Marksheet',
                "PG Degree / Equivalent Marksheet 1": 'PG Degree / Equivalent Marksheet 1',
                "PG Degree / Equivalent Marksheet 2": 'PG Degree / Equivalent Marksheet 2',
                "PG Degree / Equivalent Marksheet 3": 'PG Degree / Equivalent Marksheet 3',
                "PG Degree / Equivalent Marksheet 4": 'PG Degree / Equivalent Marksheet 4',
                "PG Degree / Equivalent Marksheet 5": 'PG Degree / Equivalent Marksheet 5'
            };

        $scope.object = Object;


        $scope.number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $scope.device_details = false;


        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.resetValues = function () {
            vm.doc13 = '';
            vm.doc14 = '';
            vm.doc16 = '';
            vm.doc24 = '';
            vm.doc26 = '';
            vm.doc32 = '';
            vm.doc34 = '';
            vm.doc38 = '';
            vm.doc62 = '';
            vm.doc64 = '';
            vm.doc66 = '';
            vm.doc68 = '';
            vm.doc610 = '';
            vm.doc84 = '';
            vm.doc101 = '';
            vm.doc123 = '';
            vm.doc122 = '';
            vm.doc162 = '';
            vm.doc163 = '';
            vm.doc172 = '';
            vm.doc242 = '';
            vm.doc232 = '';
            vm.doc222 = '';
            vm.doc212 = '';
            vm.doc202 = '';
            vm.doc192 = '';
            vm.doc182 = '';
            vm.doc254 = '';
            vm.doc255 = '';
            vm.doc256 = '';
            vm.doc252 = '';
            vm.doc2512 = '';
            vm.doc2515 = '';
            vm.doc2519 = '';
            vm.doc2520 = '';
            vm.doc2521 = '';
            vm.doc2528 = '';
            vm.doc274 = '';
            vm.doc275 = '';
            vm.doc276 = '';
            vm.doc277 = '';
            vm.doc2713 = '';
            vm.doc284 = '';
            vm.doc285 = '';
            vm.doc286 = '';
            vm.doc287 = '';
            vm.doc294 = '';
            vm.doc295 = '';
            vm.doc2915 = '';
            vm.doc296 = '';
            vm.doc297 = '';
            vm.doc307 = '';
            vm.doc305 = '';
            vm.doc312 = '';
            vm.doc322 = '';
            vm.doc324 = '';
            vm.doc3211 = '';
            vm.doc3212 = '';
            vm.doc332 = '';
            vm.doc334 = '';
            vm.doc3311 = '';
            vm.doc3312 = '';
            vm.doc342 = '';
            vm.doc344 = '';
            vm.doc3411 = '';
            vm.doc3412 = '';
            vm.doc352 = '';
            vm.doc3511 = '';
            vm.doc3512 = '';
            vm.doc362 = '';
            vm.doc364 = '';
            vm.doc372 = '';
            vm.doc375 = '';
            vm.doc3715 = '';
            vm.doc3719 = '';
            vm.doc3720 = '';
            vm.doc3721 = '';

            vm.doc382 = '';
            vm.doc385 = '';
            vm.doc3815 = '';
            vm.doc3819 = '';
            vm.doc3820 = '';
            vm.doc3821 = '';
            vm.radio_values = {};
            vm.radio_values.init_doc13 = "";
            vm.radio_values.init_doc14 = "";
            vm.radio_values.init_doc16 = "";
            vm.radio_values.init_doc24 = "";
            vm.radio_values.init_doc26 = "";
            vm.radio_values.init_doc32 = "";
            vm.radio_values.init_doc34 = "";
            vm.radio_values.init_doc38 = "";
            vm.radio_values.init_doc62 = "";
            vm.radio_values.init_doc64 = "";
            vm.radio_values.init_doc66 = "";
            vm.radio_values.init_doc68 = "";
            vm.radio_values.init_doc610 = "";
            vm.radio_values.init_doc101 = "";
            vm.radio_values.init_doc124 = "";
            vm.radio_values.init_doc162 = "";
            vm.radio_values.init_doc163 = "";
            vm.radio_values.init_doc172 = "";
            vm.radio_values.init_doc84 = "";
            vm.radio_values.init_doc123 = "";
            vm.radio_values.init_doc122 = "";
            vm.radio_values.init_doc53 = "";
            vm.radio_values.init_doc254 = "";
            vm.radio_values.init_doc255 = "";
            vm.radio_values.init_doc257 = "";
            vm.radio_values.init_doc252 = "";
            vm.radio_values.init_doc2512 = "";
            vm.radio_values.init_doc2515 = "";
            vm.radio_values.init_doc2519 = "";
            vm.radio_values.init_doc2520 = "";
            vm.radio_values.init_doc2521 = "";
            vm.radio_values.init_doc2528 = "";
            vm.radio_values.init_doc274 = "";
            vm.radio_values.init_doc275 = "";
            vm.radio_values.init_doc277 = "";
            vm.radio_values.init_doc2713 = "";
            vm.radio_values.init_doc276 = "";
            vm.radio_values.init_doc284 = "";
            vm.radio_values.init_doc285 = "";
            vm.radio_values.init_doc286 = "";
            vm.radio_values.init_doc287 = "";
            vm.radio_values.init_doc294 = "";
            vm.radio_values.init_doc295 = "";
            vm.radio_values.init_doc2915 = "";
            vm.radio_values.init_doc296 = "";
            vm.radio_values.init_doc297 = "";
            vm.radio_values.init_doc307 = "";
            vm.radio_values.init_doc305 = "";
            vm.radio_values.init_doc312 = "";
            vm.radio_values.init_doc322 = "";
            vm.radio_values.init_doc324 = "";
            vm.radio_values.init_doc3211 = "";
            vm.radio_values.init_doc3212 = "";
            vm.radio_values.init_doc332 = "";
            vm.radio_values.init_doc334 = "";
            vm.radio_values.init_doc3311 = "";
            vm.radio_values.init_doc3312 = "";
            vm.radio_values.init_doc342 = "";
            vm.radio_values.init_doc344 = "";
            vm.radio_values.init_doc3411 = "";
            vm.radio_values.init_doc3412 = "";
            vm.radio_values.init_doc352 = "";
            vm.radio_values.init_doc3511 = "";
            vm.radio_values.init_doc3512 = "";
            vm.radio_values.init_doc362 = "";
            vm.radio_values.init_doc364 = "";
            vm.radio_values.init_doc372 = "";
            vm.radio_values.init_doc375 = "";
            vm.radio_values.init_doc3715 = "";
            vm.radio_values.init_doc3719 = "";
            vm.radio_values.init_doc3720 = "";
            vm.radio_values.init_doc3721 = "";
            vm.radio_values.init_doc382 = "";
            vm.radio_values.init_doc385 = "";
            vm.radio_values.init_doc3815 = "";
            vm.radio_values.init_doc3819 = "";
            vm.radio_values.init_doc3820 = "";
            vm.radio_values.init_doc3821 = "";
            $scope.radio = {};
            $('#dd-comment-2').val('');
            $('#dd-comment-3').val('');
            $scope.packages.comment = '';
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

        $('body').on('change', '#DD', function () {
            $scope.packages.filterDD = $(this).val();
            $scope.pageChangeHandler(1);
        });

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
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
                console.log(object);
                if (object['code'] == 1) {
                    $scope.candidateDetails = object['data'];
                    $scope.finalJsonData = {};
                    $scope.workExperience = [];
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
                            if ($scope.candidateDetails['document_list'][i]['status']['level' + $rootScope.userData.level].length > 0) {
                                $scope.radio[$scope.documentWithQuestions[$scope.candidateDetails['document_list'][i]['odm_name']][0]['doc_id']] = $scope.candidateDetails['document_list'][i]['status']['level' + $rootScope.userData.level][0]['answers'][0]['ans_id']
                            }
                        }

                        console.log('final json data');
                        console.log($scope.finalJsonData);
                        $scope.selectedInnerDoc = 0;
                    }
                    $('#sideNav').animate({'right': '0%'}, 300);
                    $scope.totalExperience = '';
                    if (object['data']['work_experience'].length > 0) {
                        $scope.workExperience = object['data']['work_experience'];
                        $scope.noOfDays = 0;
                        for (var i = 0; i < object['data']['work_experience'].length; i++) {
                            if (moment(object['data']['work_experience'][i]['owe_yoe_from'], "DD-MMM-YYYY") < moment("04-Oct-2019", "DD-MMM-YYYY")) {
                                var endDate = '';
                                if (moment(object['data']['work_experience'][i]['owe_yoe_to'], "DD-MMM-YYYY") > moment("04-Oct-2019", "DD-MMM-YYYY")) {
                                    endDate = moment("04-Oct-2019", "DD-MMM-YYYY");
                                } else {
                                    endDate = moment(object['data']['work_experience'][i]['owe_yoe_to'], "DD-MMM-YYYY");
                                }
                                var startDate = moment(object['data']['work_experience'][i]['owe_yoe_from'], "DD-MMM-YYYY");
                            }
                            $scope.noOfDays += endDate.diff(startDate, 'days');
                        }
                        console.log($scope.noOfDays);
                        $scope.totalExperience = Math.floor($scope.noOfDays / 365) + ' Years ' + Math.floor(($scope.noOfDays % 365) / 30) + ' Months ' + Math.floor((306 % 365) % 30) + ' Days';
                    }
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
                    if (fn && (typeof (fn) === 'function')) {
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
            console.log('path_name');
            console.log(path_name);
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
            console.log('selected path name');
            console.log($scope.selectedDocPath);
            if ($scope.selectedDocType == 'General Information') {
                $('#docFrame').attr("src", '../assets/src/images/general information.svg');
            } else {
                $('#docFrame').attr("src", $scope.selectedDocPath);
            }

            if ($scope.selectedDocNo == 0) {
                $('#modal-form').modal();
            }
        };

        $scope.openDocFile = function (path) {
            window.open(path);
        };

        $scope.showHistory = function (index, level) {
            if (level < $rootScope.userData.level) {
                return false;
            } else {
                $scope.selectedDocNo = index;
                $scope.selectedDocType = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['odm_name'];
                $scope.selectedDocPath = $scope.candidateDetails['document_list'][$scope.selectedDocNo]['ocd_doc_file_name'];
                console.log('selected doc type');
                console.log($scope.selectedDocType);
                if ($scope.selectedDocType == 'General Information') {
                    $('#docFrame').attr("src", '../assets/src/images/general information.svg');
                } else {
                    $('#docFrame').attr("src", $scope.selectedDocPath);
                }
                $('#modal-form').modal();
            }
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
            if (fields.length > 0) {
                for (let i = 0; i < fields.length; i++) {
                    if ($(fields[i])[0]['id'] != 's2id_autogen1') {
                        if ($(fields[i]).val() == "") {
                            alert("All fields are mandatory");
                            return false;
                        }
                    };

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

                        // if ($('input[name=' + radioName + ']:checked').val() != 1 && flag != true) {
                        //     break
                        // } else {
                        //     flag = true
                        // }
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


            if (value == 'done') {
                $('#modal-form').modal("toggle");
                $scope.candidateDetails['document_list'].push('hi');
                $scope.candidateDetails['document_list'].splice($scope.candidateDetails['document_list'].length - 1, 1);
            }

            console.log('final json data');
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
                if (typeof $scope.selectedIndex != 'undefined') {
                    if ($scope.rows[$scope.selectedIndex].status != 0) {
                        $("#modal-form input[type=radio], #modal-form input[type=text], #modal-form select").attr("disabled", "disabled")
                    }
                }

            }, 200)
        };

        $scope.initializeInputs = function () {
            console.log('initialize inpout');
            setTimeout(function () {
                $("#doc13, #doc23, #doc84, #doc123, #doc305, #doc3211, #doc3311, #doc3411, #doc3511, #doc3715, #doc3815").datepicker({
                    format: 'dd-mm-yyyy',
                    orientation: "auto"
                }).on('changeDate', function (value) {
                    console.log($("#" + event.target.id + "_age").val('abcded'));
                    // vm.doc13 = moment(value.date).format("DD-MM-YYYY")
                });
                $("#doc14, #doc24, #doc254, #doc274, #doc284, #doc294,  #doc2515").datepicker({
                    format: "M yyyy",
                    startView: 1,
                    minViewMode: 1,
                    maxViewMode: 2,
                    autoClose: true,
                }).on('changeDate', function (value) {
                    // vm.doc23 = moment(value.date).format("MM-YYYY")
                });
                $('#doc255, #doc275, #doc285, #doc295, #doc2519, #doc3719, #doc3819').datepicker({
                    format: "M yyyy",
                    startView: 1,
                    minViewMode: 1,
                    maxViewMode: 2,
                    multidate: true,
                    multidateSeparator: "-",
                    autoClose: true,
                }).on("changeDate", function (event) {
                    var dates = event.dates, elem = $(this);
                    if (elem.data("selecteddates") == dates.join(",")) return; //To prevernt recursive call, that lead to lead the maximum stack in the browser.
                    if (dates.length > 2) dates = dates.splice(dates.length - 1);
                    dates.sort(function (a, b) {
                        return new Date(a).getTime() - new Date(b).getTime()
                    });
                    elem.data("selecteddates", dates.join(",")).datepicker('setDates', dates);
                });

                $('#selectDoc38').select2();
            }, 500);
        };

        $scope.$watch('selectedDocNo', function () {
            if ($scope.selectedDocNo >= 0 && $scope.candidateDetails) {
                if ($scope.selectedDocNo == ($scope.candidateDetails['document_list'].length - 1)) {
                    $scope.showSubmit = true;
                } else {
                    $scope.showSubmit = false;
                }
            }
            $scope.setAnswerGiven();
        });

        $scope.$watch('radio', function (oldValue, newValue) {
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

                if ($rootScope.userData.level > 1) {
                    var a = confirm("Confirmation 1 !!! Are you sure you want to submit the detail of candidate id - " + $scope.rows[$scope.selectedIndex]['oum_user_id'])
                    if (a) {
                        var b = confirm("Confirmation 2 !!! Details can not be updated once submitted.");
                        if (b) {
                            $scope.submitFinalData(status);
                        }
                    }
                } else {
                    $scope.submitFinalData(status);
                }

            } else {
                alert('Please input answers for all the questions');
            }

        };

        $scope.submitFinalData = function (status) {
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
                candidate_status: $rootScope.userData.level == 1 ? '' : status
            }).then(function (object) {
                if (object['code'] == 1) {
                    // $scope.getDocumentData($scope.rows[$scope.selectedIndex]['oum_user_id']);
                    $('#sideNav').animate({'right': '-65%'}, 300);
                    $scope.pageChangeHandler($scope.currentPage)
                } else {
                    alert(object['message']);
                }
            });
        };

        $scope.openDefinedModal = function (name) {
            $('#' + name).modal('toggle');
        };

        $scope.closeModal = function (name) {
            $('#' + name).modal('toggle');
        };

        document.removeEventListener("keydown", function () {
            alert('removed');
        }, false);

        document.addEventListener("keydown", function (e) {
            var keyCode = e.keyCode;
            if (keyCode == 27) {
                if ($('#modal-exp').is(':visible')) {
                    setTimeout(function () {
                        $('#modal-exp').modal('hide');
                    }, 500)
                } else if ($('#modal-form').is(':visible')) {
                    setTimeout(function () {
                        $('#modal-form').modal('hide');
                    }, 500)
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
                        $("body").append('<a target="_blank" id="download" href="' + object['data']['file_path'] + '"></a>');
                        $("#download")[0].click();
                        setTimeout(function () {
                            $("#download").remove();
                        });
                        $("#loader").hide();
                    }, 3000);
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

        $scope.showExperienceModal = function () {
            $('#modal-exp').modal('toggle');
        };


        $(document).on('click', '.showModalExp', function () {
            $scope.showExperienceModal();
        });

        vm.calculateAge = function (value) {
            if (value != '') {
                console.log(value);
                var a = moment([2019, 7, 1]);
                var b = moment([value.split('-')[2], value.split('-')[1], value.split('-')[0]]);
                var years = a.diff(b, 'year');
                b.add(years, 'years');

                var months = a.diff(b, 'months');
                b.add(months, 'months');

                var days = a.diff(b, 'days');
                return years + ' years ' + months + ' months ' + days + ' days';
            }
        }

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
    }).directive('pgMarksheetConsolidated', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Marksheet_Consolidated.html"
        };
    }).directive('pgMarksheet1', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Marksheet1.html"
        };
    }).directive('pgMarksheet2', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Marksheet2.html"
        };
    }).directive('pgMarksheet3', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Marksheet3.html"
        };
    }).directive('pgMarksheet4', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Marksheet4.html"
        };
    }).directive('pgMarksheet5', function () {
        return {
            templateUrl: "/candidates/view/templates/PG_Marksheet5.html"
        };
    }).directive('nocCertificateForOtherDepartment', function () {
        return {
            templateUrl: "/candidates/view/templates/NOC_Other_Department.html"
        };
    }).directive('mphilDegreeCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/MPHIL_Degree.html"
        };
    }).directive('sletnetDegreeCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/SLETNET_Degree.html"
        };
    }).directive('phdDegreeCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Phd_Degree.html"
        };
    }).directive('birthCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Birth_Certificate.html"
        };
    }).directive('pwdCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/PWD_Certificate.html"
        };
    }).directive('specialBed', function () {
        return {
            templateUrl: "/candidates/view/templates/Special_BED.html"
        };
    }).directive('seniorDiploma', function () {
        return {
            templateUrl: "/candidates/view/templates/Senior_Diploma.html"
        };
    }).directive('bed', function () {
        return {
            templateUrl: "/candidates/view/templates/BEd.html"
        };
    }).directive('bedMarksheetConsolidated', function () {
        return {
            templateUrl: "/candidates/view/templates/Bed_Marksheet_Consolidated.html"
        };
    }).directive('bedMarksheet1', function () {
        return {
            templateUrl: "/candidates/view/templates/Bed_Marksheet1.html"
        };
    }).directive('bedMarksheet2', function () {
        return {
            templateUrl: "/candidates/view/templates/Bed_Marksheet2.html"
        };
    }).directive('bedMarksheet3', function () {
        return {
            templateUrl: "/candidates/view/templates/Bed_Marksheet3.html"
        };
    }).directive('bedMarksheet4', function () {
        return {
            templateUrl: "/candidates/view/templates/Bed_Marksheet4.html"
        };
    }).directive('bedMarksheet5', function () {
        return {
            templateUrl: "/candidates/view/templates/Bed_Marksheet5.html"
        };
    }).directive('med', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd.html"
        };
    }).directive('medMarksheetConsolidated', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd_Marksheet_Consolidated.html"
        };
    }).directive('medMarksheet1', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd_Marksheet1.html"
        };
    }).directive('medMarksheet2', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd_Marksheet2.html"
        };
    }).directive('medMarksheet3', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd_Marksheet3.html"
        };
    }).directive('medMarksheet4', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd_Marksheet4.html"
        };
    }).directive('medMarksheet5', function () {
        return {
            templateUrl: "/candidates/view/templates/MEd_Marksheet5.html"
        };
    }).directive('conductCertificate', function () {
        return {
            templateUrl: "/candidates/view/templates/Conduct_Certificate.html"
        };
    }).directive('ugDegree', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Degree.html"
        };
    }).directive('ugDegreeConsolidated', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Degree_Consolidated.html"
        };
    }).directive('ugMarksheet1', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Marksheet1.html"
        };
    }).directive('ugMarksheet2', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Marksheet2.html"
        };
    }).directive('ugMarksheet3', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Marksheet3.html"
        };
    }).directive('ugMarksheet4', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Marksheet4.html"
        };
    }).directive('ugMarksheet5', function () {
        return {
            templateUrl: "/candidates/view/templates/UG_Marksheet5.html"
        };
    }).directive('work1', function () {
        return {
            templateUrl: "/candidates/view/templates/Work1.html"
        };
    }).directive('work2', function () {
        return {
            templateUrl: "/candidates/view/templates/Work2.html"
        };
    }).directive('work3', function () {
        return {
            templateUrl: "/candidates/view/templates/Work3.html"
        };
    }).directive('work4', function () {
        return {
            templateUrl: "/candidates/view/templates/Work4.html"
        };
    }).directive('work5', function () {
        return {
            templateUrl: "/candidates/view/templates/Work5.html"
        };
    }).directive('generalInformation', function () {
        return {
            templateUrl: "/candidates/view/templates/General_Information.html"
        };
    })
})();


