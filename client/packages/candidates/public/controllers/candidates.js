(function () {
  'use strict';

  /* jshint -W098 */

  function CandidatesController($scope, $stateParams, $rootScope, $ocLazyLoad, Http, Message) {
    var vm = this;
    $scope.urlPath = window.location.origin;
    $scope.orchEntry = {};
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
    vm.ugcUniversity = [
      'Commercial University Ltd., Daryaganj, Delhi.',
      'United Nations University, Delhi.',
      'Vocational University, Delhi.',
      'ADR-Centric Juridical University, ADR House, 8J, Gopala Tower, 25 Rajendra Place, New Delhi - 110 008.',
      'Indian Institute of Science and Engineering, New Delhi.',
      'Viswakarma Open University for Self-Employment, Rozgar Sewasadan, 672, Sanjay Enclave, Opp. GTK Depot, Delhi-110033.',
      'Adhyatmik Vishwavidyalaya (Spiritual University), 351-352, Phase-I, Block-A, Vijay Vihar, Rithala, Rohini,Delhi-110085',
      'Badaganvi Sarkar World Open University Education Society, Gokak, Belgaum, Karnataka.',
      'St. John’s University, Kishanattam, Kerala.',
      'Raja Arabic University, Nagpur, Maharashtra.',
      'Indian Institute of Alternative Medicine, Kolkatta.',
      'Institute of Alternative Medicine and Research,8-A, Diamond Harbour Road, Builtech inn, 2nd Floor,Thakurpurkur, Kolkatta - 700063',
      'Varanaseya Sanskrit Vishwavidyalaya, Varanasi (UP) Jagatpuri, Delhi.',
      'Mahila Gram Vidyapith/Vishwavidyalaya, (Women’s University) Prayag, Allahabad, Uttar Pradesh.',
      'Gandhi Hindi Vidyapith, Prayag, Allahabad, Uttar Pradesh.',
      'National University of Electro Complex Homeopathy, Kanpur, Uttar Pradesh.',
      'Netaji Subhash Chandra Bose University (Open University), Achaltal, Aligarh, Uttar Pradesh.',
      'Uttar Pradesh Vishwavidyalaya, Kosi Kalan, Mathura, Uttar Pradesh.',
      'Maharana Pratap Shiksha Niketan Vishwavidyalaya, Pratapgarh, Uttar Pradesh.',
      'Indraprastha Shiksha Parishad, Institutional Area,Khoda,Makanpur,Noida Phase-II, Uttar Pradesh.',
      'Nababharat Shiksha Parishad, Anupoorna Bhawan, Plot No. 242, Pani Tanki Road,Shaktinagar, Rourkela-769014.',
      'North Orissa University of Agriculture & Technology, Odisha.',
      'Sree Bodhi Academy of Higher Education, No. 186, Thilaspet, Vazhuthavoor Road, Puducherry-605009',
      'Christ New Testament Deemed University, #32-32-2003, 7th Lane, Kakumanuvarithoto, Guntur, Andhra Pradesh-522002 and another address of Christ New Testament Deemed University, Fit No. 301, Grace Villa Apts., 7/5, Srinagar, Guntur, Andhra Pradesh-522002'
    ];
    $scope.initializeVariables = function () {
      $scope.radio = {};
      vm.doc13 = '';
      vm.doc12 = '';
      vm.doc14 = '';
      vm.doc16 = '';
      vm.doc17 = '';
      vm.doc22 = '';
      vm.doc23 = '';
      vm.doc24 = '';
      vm.doc26 = '';
      vm.doc27 = '';
      vm.doc32 = '';
      vm.doc34 = '';
      vm.doc35 = '';
      vm.doc36 = '';
      vm.doc37 = '';
      vm.doc38 = '';
      vm.doc39 = '';
      vm.doc310 = '';
      vm.doc62 = '';
      vm.doc64 = '';
      vm.doc66 = '';
      vm.doc68 = '';
      vm.doc610 = '';
      vm.doc611 = '';
      vm.doc612 = '';
      vm.doc613 = '';
      vm.doc614 = '';
      //136 PSTM PG

      vm.doc1362 = '';
      vm.doc1364 = '';
      vm.doc1366 = '';
      vm.doc1368 = '';
      vm.doc13610 = '';
      vm.doc13611 = '';
      vm.doc13612 = '';
      vm.doc13613 = '';
      vm.doc13614 = '';

      vm.doc1372 = '';
      vm.doc1374 = '';
      vm.doc1376 = '';
      vm.doc1378 = '';
      vm.doc13710 = '';
      vm.doc13711 = '';
      vm.doc13712 = '';
      vm.doc13713 = '';
      vm.doc13714 = '';
      vm.doc1382 = '';
      vm.doc1384 = '';
      vm.doc1386 = '';
      vm.doc1388 = '';
      vm.doc13810 = '';
      vm.doc13811 = '';
      vm.doc13812 = '';
      vm.doc13813 = '';
      vm.doc13814 = '';
      vm.doc1392 = '';
      vm.doc1394 = '';
      vm.doc1396 = '';
      vm.doc1398 = '';
      vm.doc13910 = '';
      vm.doc13911 = '';
      vm.doc13912 = '';
      vm.doc13913 = '';
      vm.doc13914 = '';

      vm.doc1402 = '';
      vm.doc1403 = '';
      vm.doc1405 = '';
      vm.doc1406 = '';
      vm.doc1407 = '';
      vm.doc1408 = '';
      vm.doc1409 = '';
      vm.doc14021 = '';


      vm.doc84 = '';
      vm.doc162 = '';
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
      vm.doc253 = '';
      vm.doc254 = '';
      vm.doc255 = '';
      vm.doc259 = '';
      vm.doc2510 = '';
      vm.doc2511 = '';
      vm.doc2525 = '';
      vm.doc252 = '';
      vm.doc2513 = '';
      vm.doc2515 = '';
      vm.doc2528 = '';
      vm.doc273 = '';
      vm.doc274 = '';
      vm.doc275 = '';
      vm.doc277 = '';
      vm.doc278 = '';
      vm.doc279 = '';
      vm.doc282 = '';
      vm.doc284 = '';
      vm.doc287 = '';
      vm.doc288 = '';
      vm.doc289 = '';
      vm.doc2812 = '';
      vm.doc292 = '';
      vm.doc293 = '';
      vm.doc294 = '';
      vm.doc295 = '';
      vm.doc2912 = '';
      vm.doc2915 = '';
      vm.doc2916 = '';
      vm.doc296 = '';
      vm.doc297 = '';
      vm.doc299 = '';
      vm.doc302 = '';
      vm.doc304 = '';
      vm.doc307 = '';
      vm.doc305 = '';
      vm.doc312 = '';
      vm.doc313 = '';
      vm.doc314 = '';
      vm.doc315 = '';
      vm.doc316 = '';
      vm.doc322 = '';
      vm.doc324 = '';
      vm.doc3211 = '';
      vm.doc3212 = '';
      vm.doc332 = '';
      vm.doc334 = '';
      vm.doc3311 = '';
      vm.doc3312 = '';
      vm.doc342 = '';
      vm.doc343 = '';
      vm.doc348 = '';
      vm.doc3411 = '';
      vm.doc352 = '';
      vm.doc353 = '';
      vm.doc358 = '';
      vm.doc3511 = '';
      vm.doc3512 = '';
      vm.doc362 = '';
      vm.doc364 = '';
      vm.doc372 = '';
      vm.doc373 = '';
      vm.doc374 = '';
      vm.doc375 = '';
      vm.doc379 = '';
      vm.doc3713 = '';
      vm.doc3714 = '';
      vm.doc3715 = '';
      vm.doc3721 = '';
      vm.doc3725 = '';
      vm.doc3730 = '';

      vm.doc382 = '';
      vm.doc383 = '';
      vm.doc384 = '';
      vm.doc387 = '';
      vm.doc3818 = '';
      vm.doc3819 = '';
      vm.doc3820 = '';
      vm.doc392 = '';
      vm.doc402 = '';
      vm.doc412 = '';
      vm.doc422 = '';
      vm.doc432 = '';
      vm.doc932 = '';
      vm.doc942 = '';
      vm.doc952 = '';
      vm.doc962 = '';
      vm.doc972 = '';
      vm.doc982 = '';
      vm.doc992 = '';
      vm.doc1002 = '';
      vm.doc1012 = '';
      vm.doc1022 = '';
      vm.doc1032 = '';
      vm.doc1042 = '';
      vm.doc1052 = '';
      vm.doc1062 = '';
      vm.doc1072 = '';
      vm.doc1082 = '';
      vm.doc1092 = '';
      vm.doc1102 = '';
      vm.doc1112 = '';
      vm.doc1122 = '';
      vm.doc1132 = '';
      vm.doc1142 = '';
      vm.doc1152 = '';
      vm.doc1162 = '';
      vm.doc1172 = '';
      vm.doc1182 = '';
      vm.doc1192 = '';
      vm.doc1202 = '';
      vm.doc1212 = '';
      vm.doc1222 = '';
      vm.doc1232 = '';
      vm.doc1242 = '';
      vm.doc1252 = '';
      vm.doc1262 = '';
      vm.doc1272 = '';
      vm.doc1282 = '';
      vm.doc1292 = '';
      vm.doc1302 = '';
      vm.doc1312 = '';
      vm.doc1322 = '';
      vm.doc1332 = '';
      vm.doc1342 = '';
      vm.doc1352 = '';
      vm.doc442 = '';
      vm.doc443 = '';
      vm.doc444 = '';
      vm.doc447 = '';
      vm.doc446 = '';
      vm.doc4419 = '';
      vm.doc4420 = '';
      vm.doc452 = '';
      vm.doc453 = '';
      vm.doc454 = '';
      vm.doc457 = '';
      vm.doc456 = '';
      vm.doc4519 = '';
      vm.doc4520 = '';
      vm.doc462 = '';
      vm.doc463 = '';
      vm.doc464 = '';
      vm.doc467 = '';
      vm.doc466 = '';
      vm.doc4619 = '';
      vm.doc4620 = '';
      vm.doc472 = '';
      vm.doc473 = '';
      vm.doc474 = '';
      vm.doc477 = '';
      vm.doc476 = '';
      vm.doc4719 = '';
      vm.doc4720 = '';
      vm.doc482 = '';
      vm.doc483 = '';
      vm.doc484 = '';
      vm.doc487 = '';
      vm.doc486 = '';
      vm.doc4819 = '';
      vm.doc4820 = '';
      vm.doc492 = '';
      vm.doc495 = '';
      vm.doc496 = '';
      vm.doc502 = '';
      vm.doc505 = '';
      vm.doc506 = '';
      vm.doc512 = '';
      vm.doc515 = '';
      vm.doc516 = '';
      vm.doc522 = '';
      vm.doc525 = '';
      vm.doc526 = '';
      vm.doc532 = '';
      vm.doc535 = '';
      vm.doc536 = '';
      vm.doc542 = '';
      vm.doc545 = '';
      vm.doc546 = '';

      vm.doc902 = '';
      vm.doc905 = '';
      vm.doc906 = '';
      vm.doc912 = '';
      vm.doc915 = '';
      vm.doc916 = '';
      vm.doc922 = '';
      vm.doc925 = '';
      vm.doc926 = '';
      vm.doc552 = '';
      vm.doc559 = '';
      vm.doc5512 = '';
      vm.doc5513 = '';
      vm.doc562 = '';
      vm.doc569 = '';
      vm.doc5612 = '';
      vm.doc5613 = '';
      vm.doc572 = '';
      vm.doc579 = '';
      vm.doc5712 = '';
      vm.doc5713 = '';
      vm.doc582 = '';
      vm.doc589 = '';
      vm.doc5812 = '';
      vm.doc5813 = '';
      vm.doc592 = '';
      vm.doc599 = '';
      vm.doc5912 = '';
      vm.doc5913 = '';
      vm.doc602 = '';
      vm.doc609 = '';
      vm.doc6012 = '';
      vm.doc6013 = '';
      vm.doc612 = '';
      vm.doc619 = '';
      vm.doc6112 = '';
      vm.doc6113 = '';
      vm.doc622 = '';
      vm.doc625 = '';
      vm.doc627 = '';
      vm.doc628 = '';
      vm.doc629 = '';
      vm.doc6214 = '';
      vm.doc6215 = '';
      vm.doc632 = '';
      vm.doc635 = '';
      vm.doc637 = '';
      vm.doc638 = '';
      vm.doc639 = '';
      vm.doc6314 = '';
      vm.doc6315 = '';
      vm.doc642 = '';
      vm.doc645 = '';
      vm.doc647 = '';
      vm.doc648 = '';
      vm.doc649 = '';
      vm.doc6414 = '';
      vm.doc6415 = '';
      vm.doc652 = '';
      vm.doc655 = '';
      vm.doc657 = '';
      vm.doc658 = '';
      vm.doc659 = '';
      vm.doc6514 = '';
      vm.doc6515 = '';
      vm.doc662 = '';
      vm.doc665 = '';
      vm.doc667 = '';
      vm.doc668 = '';
      vm.doc669 = '';
      vm.doc6614 = '';
      vm.doc6615 = '';
      vm.doc672 = '';
      vm.doc675 = '';
      vm.doc677 = '';
      vm.doc678 = '';
      vm.doc679 = '';
      vm.doc6714 = '';
      vm.doc6715 = '';
      vm.doc684 = '';
      vm.doc687 = '';
      vm.doc6811 = '';
      vm.doc693 = '';

      vm.doc702 = '';
      vm.doc703 = '';
      vm.doc704 = '';
      vm.doc707 = '';
      vm.doc706 = '';
      vm.doc7019 = '';
      vm.doc7020 = '';
      vm.doc712 = '';
      vm.doc713 = '';
      vm.doc714 = '';
      vm.doc717 = '';
      vm.doc716 = '';
      vm.doc7119 = '';
      vm.doc7120 = '';
      vm.doc722 = '';
      vm.doc723 = '';
      vm.doc724 = '';
      vm.doc727 = '';
      vm.doc726 = '';
      vm.doc7219 = '';
      vm.doc7220 = '';
      vm.doc732 = '';
      vm.doc733 = '';
      vm.doc734 = '';
      vm.doc737 = '';
      vm.doc736 = '';
      vm.doc7319 = '';
      vm.doc7320 = '';
      vm.doc742 = '';
      vm.doc743 = '';
      vm.doc744 = '';
      vm.doc747 = '';
      vm.doc746 = '';
      vm.doc7419 = '';
      vm.doc7420 = '';
      vm.doc752 = '';
      vm.doc753 = '';
      vm.doc754 = '';
      vm.doc757 = '';
      vm.doc756 = '';
      vm.doc7519 = '';
      vm.doc7520 = '';
      vm.doc762 = '';
      vm.doc763 = '';
      vm.doc764 = '';
      vm.doc767 = '';
      vm.doc766 = '';
      vm.doc7619 = '';
      vm.doc7620 = '';
      vm.doc772 = '';
      vm.doc773 = '';
      vm.doc774 = '';
      vm.doc777 = '';
      vm.doc776 = '';
      vm.doc7719 = '';
      vm.doc7720 = '';
      vm.doc782 = '';
      vm.doc783 = '';
      vm.doc784 = '';
      vm.doc787 = '';
      vm.doc786 = '';
      vm.doc7819 = '';
      vm.doc7820 = '';


      vm.doc802 = '';
      vm.doc805 = '';
      vm.doc807 = '';
      vm.doc808 = '';
      vm.doc809 = '';
      vm.doc8014 = '';
      vm.doc8015 = '';
      vm.doc812 = '';
      vm.doc815 = '';
      vm.doc817 = '';
      vm.doc818 = '';
      vm.doc819 = '';
      vm.doc8114 = '';
      vm.doc8115 = '';
      vm.doc822 = '';
      vm.doc825 = '';
      vm.doc827 = '';
      vm.doc828 = '';
      vm.doc829 = '';
      vm.doc8214 = '';
      vm.doc8215 = '';
      vm.doc832 = '';
      vm.doc835 = '';
      vm.doc837 = '';
      vm.doc838 = '';
      vm.doc839 = '';
      vm.doc8314 = '';
      vm.doc8315 = '';
      vm.doc842 = '';
      vm.doc845 = '';
      vm.doc847 = '';
      vm.doc848 = '';
      vm.doc849 = '';
      vm.doc8414 = '';
      vm.doc8415 = '';
      vm.doc852 = '';
      vm.doc855 = '';
      vm.doc857 = '';
      vm.doc858 = '';
      vm.doc859 = '';
      vm.doc8514 = '';
      vm.doc8515 = '';
      vm.doc862 = '';
      vm.doc865 = '';
      vm.doc867 = '';
      vm.doc868 = '';
      vm.doc869 = '';
      vm.doc8614 = '';
      vm.doc8615 = '';
      vm.doc872 = '';
      vm.doc875 = '';
      vm.doc877 = '';
      vm.doc878 = '';
      vm.doc879 = '';
      vm.doc8714 = '';
      vm.doc8715 = '';
      vm.doc882 = '';
      vm.doc885 = '';
      vm.doc887 = '';
      vm.doc888 = '';
      vm.doc889 = '';
      vm.doc8814 = '';
      vm.doc8815 = '';
      vm.radio_values = {};
      vm.radio_values.init_doc12 = "";
      vm.radio_values.init_doc13 = "";
      vm.radio_values.init_doc14 = "";
      vm.radio_values.init_doc16 = "";
      vm.radio_values.init_doc17 = "";
      vm.radio_values.init_doc22 = "";
      vm.radio_values.init_doc23 = "";
      vm.radio_values.init_doc24 = "";
      vm.radio_values.init_doc26 = "";
      vm.radio_values.init_doc27 = "";
      vm.radio_values.init_doc32 = "";
      vm.radio_values.init_doc34 = "";
      vm.radio_values.init_doc35 = "";
      vm.radio_values.init_doc36 = "";
      vm.radio_values.init_doc37 = "";
      vm.radio_values.init_doc38 = "";
      vm.radio_values.init_doc39 = "";
      vm.radio_values.init_doc310 = "";
      vm.radio_values.init_doc62 = "";
      vm.radio_values.init_doc64 = "";
      vm.radio_values.init_doc66 = "";
      vm.radio_values.init_doc68 = "";
      vm.radio_values.init_doc610 = "";
      vm.radio_values.init_doc611 = "";
      vm.radio_values.init_doc612 = "";
      vm.radio_values.init_doc613 = "";
      vm.radio_values.init_doc614 = "";
      //136

      vm.radio_values.init_doc1362 = "";
      vm.radio_values.init_doc1364 = "";
      vm.radio_values.init_doc1366 = "";
      vm.radio_values.init_doc1368 = "";
      vm.radio_values.init_doc13610 = "";
      vm.radio_values.init_doc13611 = "";
      vm.radio_values.init_doc13612 = "";
      vm.radio_values.init_doc13613 = "";
      vm.radio_values.init_doc13614 = "";
      vm.radio_values.init_doc1372 = "";
      vm.radio_values.init_doc1374 = "";
      vm.radio_values.init_doc1376 = "";
      vm.radio_values.init_doc1378 = "";
      vm.radio_values.init_doc13710 = "";
      vm.radio_values.init_doc13711 = "";
      vm.radio_values.init_doc13712 = "";
      vm.radio_values.init_doc13713 = "";
      vm.radio_values.init_doc13714 = "";
      vm.radio_values.init_doc1382 = "";
      vm.radio_values.init_doc1384 = "";
      vm.radio_values.init_doc1386 = "";
      vm.radio_values.init_doc1388 = "";
      vm.radio_values.init_doc13810 = "";
      vm.radio_values.init_doc13811 = "";
      vm.radio_values.init_doc13812 = "";
      vm.radio_values.init_doc13813 = "";
      vm.radio_values.init_doc13814 = "";
      vm.radio_values.init_doc1392 = "";
      vm.radio_values.init_doc1394 = "";
      vm.radio_values.init_doc1396 = "";
      vm.radio_values.init_doc1398 = "";
      vm.radio_values.init_doc13910 = "";
      vm.radio_values.init_doc13911 = "";
      vm.radio_values.init_doc13912 = "";
      vm.radio_values.init_doc13913 = "";
      vm.radio_values.init_doc13914 = "";
      vm.radio_values.init_doc1402 = "";
      vm.radio_values.init_doc14021 = "";
      vm.radio_values.init_doc1403 = "";
      vm.radio_values.init_doc1405 = "";
      vm.radio_values.init_doc1406 = "";
      vm.radio_values.init_doc1407 = "";
      vm.radio_values.init_doc1408 = "";
      vm.radio_values.init_doc162 = "";
      vm.radio_values.init_doc124 = "";
      vm.radio_values.init_doc162 = "";
      vm.radio_values.init_doc163 = "";
      vm.radio_values.init_doc172 = "";
      vm.radio_values.init_doc84 = "";
      vm.radio_values.init_doc123 = "";
      vm.radio_values.init_doc122 = "";
      vm.radio_values.init_doc53 = "";
      vm.radio_values.init_doc253 = "";
      vm.radio_values.init_doc254 = "";
      vm.radio_values.init_doc255 = "";
      vm.radio_values.init_doc259 = "";
      vm.radio_values.init_doc2510 = "";
      vm.radio_values.init_doc2511 = "";
      vm.radio_values.init_doc2525 = "";
      vm.radio_values.init_doc257 = "";
      vm.radio_values.init_doc252 = "";
      vm.radio_values.init_doc2513 = "";
      vm.radio_values.init_doc2515 = "";
      vm.radio_values.init_doc2528 = "";
      vm.radio_values.init_doc273 = "";
      vm.radio_values.init_doc274 = "";
      vm.radio_values.init_doc275 = "";
      vm.radio_values.init_doc277 = "";
      vm.radio_values.init_doc278 = "";
      vm.radio_values.init_doc279 = "";
      vm.radio_values.init_doc282 = "";
      vm.radio_values.init_doc284 = "";
      vm.radio_values.init_doc287 = "";
      vm.radio_values.init_doc288 = "";
      vm.radio_values.init_doc289 = "";
      vm.radio_values.init_doc2812 = "";
      vm.radio_values.init_doc292 = "";
      vm.radio_values.init_doc293 = "";
      vm.radio_values.init_doc294 = "";
      vm.radio_values.init_doc295 = "";
      vm.radio_values.init_doc2912 = "";
      vm.radio_values.init_doc2915 = "";
      vm.radio_values.init_doc2916 = "";
      vm.radio_values.init_doc296 = "";
      vm.radio_values.init_doc297 = "";
      vm.radio_values.init_doc299 = "";
      vm.radio_values.init_doc302 = "";
      vm.radio_values.init_doc304 = "";
      vm.radio_values.init_doc307 = "";
      vm.radio_values.init_doc305 = "";
      vm.radio_values.init_doc312 = "";
      vm.radio_values.init_doc313 = "";
      vm.radio_values.init_doc314 = "";
      vm.radio_values.init_doc315 = "";
      vm.radio_values.init_doc316 = "";
      vm.radio_values.init_doc322 = "";
      vm.radio_values.init_doc324 = "";
      vm.radio_values.init_doc3211 = "";
      vm.radio_values.init_doc3212 = "";
      vm.radio_values.init_doc332 = "";
      vm.radio_values.init_doc334 = "";
      vm.radio_values.init_doc3311 = "";
      vm.radio_values.init_doc3312 = "";
      vm.radio_values.init_doc342 = "";
      vm.radio_values.init_doc343 = "";
      vm.radio_values.init_doc348 = "";
      vm.radio_values.init_doc3411 = "";
      vm.radio_values.init_doc352 = "";
      vm.radio_values.init_doc353 = "";
      vm.radio_values.init_doc358 = "";
      vm.radio_values.init_doc3511 = "";
      vm.radio_values.init_doc3512 = "";
      vm.radio_values.init_doc362 = "";
      vm.radio_values.init_doc364 = "";
      vm.radio_values.init_doc372 = "";
      vm.radio_values.init_doc373 = "";
      vm.radio_values.init_doc374 = "";
      vm.radio_values.init_doc375 = "";
      vm.radio_values.init_doc379 = "";
      vm.radio_values.init_doc3713 = "";
      vm.radio_values.init_doc3714 = "";
      vm.radio_values.init_doc3715 = "";
      vm.radio_values.init_doc3721 = "";
      vm.radio_values.init_doc3725 = "";
      vm.radio_values.init_doc3730 = "";
      vm.radio_values.init_doc382 = "";
      vm.radio_values.init_doc383 = "";
      vm.radio_values.init_doc384 = "";
      vm.radio_values.init_doc387 = "";
      vm.radio_values.init_doc3818 = "";
      vm.radio_values.init_doc3819 = "";
      vm.radio_values.init_doc3820 = "";
      vm.radio_values.init_doc392 = "";
      vm.radio_values.init_doc402 = "";
      vm.radio_values.init_doc412 = "";
      vm.radio_values.init_doc422 = "";
      vm.radio_values.init_doc432 = "";
      vm.radio_values.init_doc932 = "";
      vm.radio_values.init_doc942 = "";
      vm.radio_values.init_doc952 = "";
      vm.radio_values.init_doc962 = "";
      vm.radio_values.init_doc972 = "";
      vm.radio_values.init_doc982 = "";
      vm.radio_values.init_doc992 = "";
      vm.radio_values.init_doc1002 = "";
      vm.radio_values.init_doc1012 = "";
      vm.radio_values.init_doc1022 = "";
      vm.radio_values.init_doc1032 = "";
      vm.radio_values.init_doc1042 = "";
      vm.radio_values.init_doc1052 = "";
      vm.radio_values.init_doc1062 = "";
      vm.radio_values.init_doc1072 = "";
      vm.radio_values.init_doc1082 = "";
      vm.radio_values.init_doc1092 = "";
      vm.radio_values.init_doc1102 = "";
      vm.radio_values.init_doc1112 = "";
      vm.radio_values.init_doc1122 = "";
      vm.radio_values.init_doc1132 = "";
      vm.radio_values.init_doc1142 = "";
      vm.radio_values.init_doc1152 = "";
      vm.radio_values.init_doc1162 = "";
      vm.radio_values.init_doc1172 = "";
      vm.radio_values.init_doc1182 = "";
      vm.radio_values.init_doc1192 = "";
      vm.radio_values.init_doc1202 = "";
      vm.radio_values.init_doc1212 = "";
      vm.radio_values.init_doc1222 = "";
      vm.radio_values.init_doc1232 = "";
      vm.radio_values.init_doc1242 = "";
      vm.radio_values.init_doc1252 = "";
      vm.radio_values.init_doc1262 = "";
      vm.radio_values.init_doc1272 = "";
      vm.radio_values.init_doc1282 = "";
      vm.radio_values.init_doc1292 = "";
      vm.radio_values.init_doc1302 = "";
      vm.radio_values.init_doc1312 = "";
      vm.radio_values.init_doc1322 = "";
      vm.radio_values.init_doc1332 = "";
      vm.radio_values.init_doc1342 = "";
      vm.radio_values.init_doc1352 = "";
      vm.radio_values.init_doc442 = "";
      vm.radio_values.init_doc443 = "";
      vm.radio_values.init_doc444 = "";
      vm.radio_values.init_doc447 = "";
      vm.radio_values.init_doc446 = "";
      vm.radio_values.init_doc4419 = "";
      vm.radio_values.init_doc4420 = "";
      vm.radio_values.init_doc452 = "";
      vm.radio_values.init_doc453 = "";
      vm.radio_values.init_doc454 = "";
      vm.radio_values.init_doc457 = "";
      vm.radio_values.init_doc456 = "";
      vm.radio_values.init_doc4519 = "";
      vm.radio_values.init_doc4520 = "";
      vm.radio_values.init_doc462 = "";
      vm.radio_values.init_doc463 = "";
      vm.radio_values.init_doc464 = "";
      vm.radio_values.init_doc467 = "";
      vm.radio_values.init_doc466 = "";
      vm.radio_values.init_doc4619 = "";
      vm.radio_values.init_doc4620 = "";
      vm.radio_values.init_doc472 = "";
      vm.radio_values.init_doc473 = "";
      vm.radio_values.init_doc474 = "";
      vm.radio_values.init_doc477 = "";
      vm.radio_values.init_doc476 = "";
      vm.radio_values.init_doc4719 = "";
      vm.radio_values.init_doc4720 = "";
      vm.radio_values.init_doc482 = "";
      vm.radio_values.init_doc483 = "";
      vm.radio_values.init_doc484 = "";
      vm.radio_values.init_doc487 = "";
      vm.radio_values.init_doc486 = "";
      vm.radio_values.init_doc4819 = "";
      vm.radio_values.init_doc4820 = "";
      vm.radio_values.init_doc492 = "";
      vm.radio_values.init_doc495 = "";
      vm.radio_values.init_doc496 = "";
      vm.radio_values.init_doc502 = "";
      vm.radio_values.init_doc505 = "";
      vm.radio_values.init_doc506 = "";
      vm.radio_values.init_doc512 = "";
      vm.radio_values.init_doc515 = "";
      vm.radio_values.init_doc516 = "";
      vm.radio_values.init_doc522 = "";
      vm.radio_values.init_doc525 = "";
      vm.radio_values.init_doc526 = "";
      vm.radio_values.init_doc532 = "";
      vm.radio_values.init_doc535 = "";
      vm.radio_values.init_doc536 = "";
      vm.radio_values.init_doc542 = "";
      vm.radio_values.init_doc545 = "";
      vm.radio_values.init_doc546 = "";
      vm.radio_values.init_doc902 = "";
      vm.radio_values.init_doc905 = "";
      vm.radio_values.init_doc906 = "";
      vm.radio_values.init_doc912 = "";
      vm.radio_values.init_doc915 = "";
      vm.radio_values.init_doc916 = "";
      vm.radio_values.init_doc922 = "";
      vm.radio_values.init_doc925 = "";
      vm.radio_values.init_doc926 = "";
      vm.radio_values.init_doc552 = "";
      vm.radio_values.init_doc559 = "";
      vm.radio_values.init_doc5512 = "";
      vm.radio_values.init_doc5513 = "";
      vm.radio_values.init_doc562 = "";
      vm.radio_values.init_doc569 = "";
      vm.radio_values.init_doc5612 = "";
      vm.radio_values.init_doc5613 = "";
      vm.radio_values.init_doc572 = "";
      vm.radio_values.init_doc579 = "";
      vm.radio_values.init_doc5712 = "";
      vm.radio_values.init_doc5713 = "";
      vm.radio_values.init_doc582 = "";
      vm.radio_values.init_doc589 = "";
      vm.radio_values.init_doc5812 = "";
      vm.radio_values.init_doc5813 = "";
      vm.radio_values.init_doc592 = "";
      vm.radio_values.init_doc599 = "";
      vm.radio_values.init_doc5912 = "";
      vm.radio_values.init_doc5913 = "";
      vm.radio_values.init_doc602 = "";
      vm.radio_values.init_doc609 = "";
      vm.radio_values.init_doc6012 = "";
      vm.radio_values.init_doc6013 = "";
      vm.radio_values.init_doc612 = "";
      vm.radio_values.init_doc619 = "";
      vm.radio_values.init_doc6112 = "";
      vm.radio_values.init_doc6113 = "";
      vm.radio_values.init_doc622 = "";
      vm.radio_values.init_doc625 = "";
      vm.radio_values.init_doc627 = "";
      vm.radio_values.init_doc628 = "";
      vm.radio_values.init_doc629 = "";
      vm.radio_values.init_doc6214 = "";
      vm.radio_values.init_doc6215 = "";
      vm.radio_values.init_doc632 = "";
      vm.radio_values.init_doc635 = "";
      vm.radio_values.init_doc637 = "";
      vm.radio_values.init_doc638 = "";
      vm.radio_values.init_doc639 = "";
      vm.radio_values.init_doc6314 = "";
      vm.radio_values.init_doc6315 = "";
      vm.radio_values.init_doc642 = "";
      vm.radio_values.init_doc645 = "";
      vm.radio_values.init_doc647 = "";
      vm.radio_values.init_doc648 = "";
      vm.radio_values.init_doc649 = "";
      vm.radio_values.init_doc6414 = "";
      vm.radio_values.init_doc6415 = "";
      vm.radio_values.init_doc652 = "";
      vm.radio_values.init_doc655 = "";
      vm.radio_values.init_doc657 = "";
      vm.radio_values.init_doc658 = "";
      vm.radio_values.init_doc659 = "";
      vm.radio_values.init_doc6514 = "";
      vm.radio_values.init_doc6515 = "";
      vm.radio_values.init_doc662 = "";
      vm.radio_values.init_doc665 = "";
      vm.radio_values.init_doc667 = "";
      vm.radio_values.init_doc668 = "";
      vm.radio_values.init_doc669 = "";
      vm.radio_values.init_doc6614 = "";
      vm.radio_values.init_doc6615 = "";
      vm.radio_values.init_doc672 = "";
      vm.radio_values.init_doc675 = "";
      vm.radio_values.init_doc677 = "";
      vm.radio_values.init_doc678 = "";
      vm.radio_values.init_doc679 = "";
      vm.radio_values.init_doc6714 = "";
      vm.radio_values.init_doc6715 = "";
      vm.radio_values.init_doc684 = "";
      vm.radio_values.init_doc687 = "";
      vm.radio_values.init_doc6811 = "";
      vm.radio_values.init_doc693 = "";


      vm.radio_values.init_doc702 = "";
      vm.radio_values.init_doc703 = "";
      vm.radio_values.init_doc704 = "";
      vm.radio_values.init_doc707 = "";
      vm.radio_values.init_doc706 = "";
      vm.radio_values.init_doc7019 = "";
      vm.radio_values.init_doc7020 = "";
      vm.radio_values.init_doc712 = "";
      vm.radio_values.init_doc713 = "";
      vm.radio_values.init_doc714 = "";
      vm.radio_values.init_doc717 = "";
      vm.radio_values.init_doc716 = "";
      vm.radio_values.init_doc7119 = "";
      vm.radio_values.init_doc7120 = "";
      vm.radio_values.init_doc722 = "";
      vm.radio_values.init_doc723 = "";
      vm.radio_values.init_doc724 = "";
      vm.radio_values.init_doc727 = "";
      vm.radio_values.init_doc726 = "";
      vm.radio_values.init_doc7219 = "";
      vm.radio_values.init_doc7220 = "";
      vm.radio_values.init_doc732 = "";
      vm.radio_values.init_doc733 = "";
      vm.radio_values.init_doc734 = "";
      vm.radio_values.init_doc737 = "";
      vm.radio_values.init_doc736 = "";
      vm.radio_values.init_doc7319 = "";
      vm.radio_values.init_doc7320 = "";
      vm.radio_values.init_doc742 = "";
      vm.radio_values.init_doc743 = "";
      vm.radio_values.init_doc744 = "";
      vm.radio_values.init_doc747 = "";
      vm.radio_values.init_doc746 = "";
      vm.radio_values.init_doc7419 = "";
      vm.radio_values.init_doc7420 = "";
      vm.radio_values.init_doc752 = "";
      vm.radio_values.init_doc753 = "";
      vm.radio_values.init_doc754 = "";
      vm.radio_values.init_doc757 = "";
      vm.radio_values.init_doc756 = "";
      vm.radio_values.init_doc7519 = "";
      vm.radio_values.init_doc7520 = "";
      vm.radio_values.init_doc762 = "";
      vm.radio_values.init_doc763 = "";
      vm.radio_values.init_doc764 = "";
      vm.radio_values.init_doc767 = "";
      vm.radio_values.init_doc766 = "";
      vm.radio_values.init_doc7619 = "";
      vm.radio_values.init_doc7620 = "";
      vm.radio_values.init_doc772 = "";
      vm.radio_values.init_doc773 = "";
      vm.radio_values.init_doc774 = "";
      vm.radio_values.init_doc777 = "";
      vm.radio_values.init_doc776 = "";
      vm.radio_values.init_doc7719 = "";
      vm.radio_values.init_doc7720 = "";
      vm.radio_values.init_doc782 = "";
      vm.radio_values.init_doc783 = "";
      vm.radio_values.init_doc784 = "";
      vm.radio_values.init_doc787 = "";
      vm.radio_values.init_doc786 = "";
      vm.radio_values.init_doc7819 = "";
      vm.radio_values.init_doc7820 = "";


      vm.radio_values.init_doc802 = "";
      vm.radio_values.init_doc805 = "";
      vm.radio_values.init_doc807 = "";
      vm.radio_values.init_doc808 = "";
      vm.radio_values.init_doc809 = "";
      vm.radio_values.init_doc8014 = "";
      vm.radio_values.init_doc8015 = "";
      vm.radio_values.init_doc812 = "";
      vm.radio_values.init_doc815 = "";
      vm.radio_values.init_doc817 = "";
      vm.radio_values.init_doc818 = "";
      vm.radio_values.init_doc819 = "";
      vm.radio_values.init_doc8114 = "";
      vm.radio_values.init_doc8115 = "";
      vm.radio_values.init_doc822 = "";
      vm.radio_values.init_doc825 = "";
      vm.radio_values.init_doc827 = "";
      vm.radio_values.init_doc828 = "";
      vm.radio_values.init_doc829 = "";
      vm.radio_values.init_doc8214 = "";
      vm.radio_values.init_doc8215 = "";
      vm.radio_values.init_doc832 = "";
      vm.radio_values.init_doc835 = "";
      vm.radio_values.init_doc837 = "";
      vm.radio_values.init_doc838 = "";
      vm.radio_values.init_doc839 = "";
      vm.radio_values.init_doc8314 = "";
      vm.radio_values.init_doc8315 = "";
      vm.radio_values.init_doc842 = "";
      vm.radio_values.init_doc845 = "";
      vm.radio_values.init_doc847 = "";
      vm.radio_values.init_doc848 = "";
      vm.radio_values.init_doc849 = "";
      vm.radio_values.init_doc8414 = "";
      vm.radio_values.init_doc8415 = "";
      vm.radio_values.init_doc852 = "";
      vm.radio_values.init_doc855 = "";
      vm.radio_values.init_doc857 = "";
      vm.radio_values.init_doc858 = "";
      vm.radio_values.init_doc859 = "";
      vm.radio_values.init_doc8514 = "";
      vm.radio_values.init_doc8515 = "";
      vm.radio_values.init_doc862 = "";
      vm.radio_values.init_doc865 = "";
      vm.radio_values.init_doc867 = "";
      vm.radio_values.init_doc868 = "";
      vm.radio_values.init_doc869 = "";
      vm.radio_values.init_doc8614 = "";
      vm.radio_values.init_doc8615 = "";
      vm.radio_values.init_doc872 = "";
      vm.radio_values.init_doc875 = "";
      vm.radio_values.init_doc877 = "";
      vm.radio_values.init_doc878 = "";
      vm.radio_values.init_doc879 = "";
      vm.radio_values.init_doc8714 = "";
      vm.radio_values.init_doc8715 = "";
      vm.radio_values.init_doc882 = "";
      vm.radio_values.init_doc885 = "";
      vm.radio_values.init_doc887 = "";
      vm.radio_values.init_doc888 = "";
      vm.radio_values.init_doc889 = "";
      vm.radio_values.init_doc8814 = "";
      vm.radio_values.init_doc8815 = "";
    };
    $scope.initializeVariables();

    $scope.remarksText = {
      '3c2': 'New community',
      '3c4': 'Not relevant reason',
      '3c5': 'New certificate number',
      '3c6': 'New community certificate date',
      '3c7': 'New Issuing authority',
      '3c8': 'Sub Caste',
      '3c9': 'Comunity certificate issued with',
      '3c10': 'New Religion',
      '1c2': 'Name in the certificate',
      '1c3': 'New date of publication',
      '1c4': 'New year of passing',
      '1c6': 'Not relevant reason',
      '1c7': 'New certificate number',
      '2c2': 'Name in the certificate',
      '2c3': 'New Date of publication',
      '2c4': 'New year of passing',
      '2c6': 'Not relevant reason',
      '2c7': 'New certificate number',
      '6c2': 'New Authority',
      '6c4': 'Relevant PG Degree Reason',
      '6c6': 'Relevant PG Degree in Tamil Reason',
      '6c8': 'Relevant PHD Degree in Tamil Reason',
      '6c10': 'Relevant MEd Degree in Tamil Reason',
      '6c11': 'PG & PHD Degree not matched',
      '6c12': 'Only (PG / PHD) / SLET / NET Degree not matched',
      '6c13': 'PG and M.Ed degree and Ph.D not matched',
      '6c14': 'both PG and M.Ed (with (or) without Ph.D not matched',
      '136c2': 'New Authority',
      '136c4': 'Relevant PG Degree Reason',
      '136c6': 'Relevant PG Degree in Tamil Reason',
      '136c8': 'Relevant PHD Degree in Tamil Reason',
      '136c10': 'Relevant MEd Degree in Tamil Reason',
      '136c11': 'PG & PHD Degree not matched',
      '136c12': 'Only (PG / PHD) / SLET / NET Degree not matched',
      '136c13': 'PG and M.Ed degree and Ph.D not matched',
      '136c14': 'both PG and M.Ed (with (or) without Ph.D not matched',
      '137c2': 'New Authority',
      '137c4': 'Relevant PG Degree Reason',
      '137c6': 'Relevant PG Degree in Tamil Reason',
      '137c8': 'Relevant PHD Degree in Tamil Reason',
      '137c10': 'Relevant MEd Degree in Tamil Reason',
      '137c11': 'PG & PHD Degree not matched',
      '137c12': 'Only (PG / PHD) / SLET / NET Degree not matched',
      '137c13': 'PG and M.Ed degree and Ph.D not matched',
      '137c14': 'both PG and M.Ed (with (or) without Ph.D not matched',
      '138c2': 'New Authority',
      '138c4': 'Relevant PG Degree Reason',
      '138c6': 'Relevant PG Degree in Tamil Reason',
      '138c8': 'Relevant PHD Degree in Tamil Reason',
      '138c10': 'Relevant MEd Degree in Tamil Reason',
      '138c11': 'PG & PHD Degree not matched',
      '138c12': 'Only (PG / PHD) / SLET / NET Degree not matched',
      '138c13': 'PG and M.Ed degree and Ph.D not matched',
      '138c14': 'both PG and M.Ed (with (or) without Ph.D not matched',
      '139c2': 'New Authority',
      '139c4': 'Relevant PG Degree Reason',
      '139c6': 'Relevant PG Degree in Tamil Reason',
      '139c8': 'Relevant PHD Degree in Tamil Reason',
      '139c10': 'Relevant MEd Degree in Tamil Reason',
      '139c11': 'PG & PHD Degree not matched',
      '139c12': 'Only (PG / PHD) / SLET / NET Degree not matched',
      '139c13': 'PG and M.Ed degree and Ph.D not matched',
      '139c14': 'both PG and M.Ed (with (or) without Ph.D not matched',
      '140c2': 'Educational Qualification Order',
      '140c3': 'Any course date',
      '140c5': 'Discontinued date',
      '140c6': 'New admission date',
      '140c7': 'Rejoining date',
      '140c8': 'Cut off date 04.10.2019',
      '140c21': 'If Educational qualification order selected Others',
      '12c2': 'Relevant reason',
      '16c2': 'New Gender',
      '16c3': 'Not relevant reason',
      '17c2': 'Not relevant reason',
      '25c4': 'New name in the certificate',
      '25c5': 'New PG Degree Mark Sheets relevant reason',
      '25c2': 'Document relevant reason',
      '25c3': 'New Degree Certificate Number',
      '25c9': 'Name of subject',
      '25c10': 'Pg Degree Government Order',
      '25c11': 'Government order not matched',
      '25c13': 'Name of university',
      '25c15': 'New Month & Year of Passing',
      '25c25': 'UGC Recognised University',
      '25c28': 'New Foreign PG Degree Relevant Reason',
      '27c3': 'Name of the university',
      '27c4': 'New Year of Passing',
      '27c5': 'New  Certificate Number',
      '27c7': 'Not relevant reason',
      '27c8': 'Name of the subject',
      '27c9': 'Name of institute',
      '28c2': 'Name in the SLET Certificate',
      '28c4': 'New Year of Passing',
      '28c7': 'New relevant reason',
      '28c8': 'New relevant reason',
      '28c9': 'Name in the NET Certificate',
      '28c12': 'New Year of Passing',
      '29c2': 'Name in the PHD Certificate',
      '29c3': 'Name of the university',
      '29c4': 'New Year of Passing',
      '29c5': 'New Certificate Number',
      '29c12': 'Part-time date',
      '29c15': 'Foreign document relevant',
      '29c16': 'Date of publication of result',
      '29c6': 'New Mode of study',
      '29c7': 'Not relevant reason',
      '29c9': 'Name of institute',
      '30c2': 'New Certificate Number',
      '30c4': 'New Place of Birth',
      '30c7': 'Not relevant reason',
      '30c5': 'New Date of Birth',
      '31c2': 'New relevant reason',
      '31c3': 'New Certificate Number',
      '31c4': 'New authority of disability certificate',
      '31c5': 'New category of disability',
      '31c6': 'New percentage of disability',
      '32c2': 'New relevant reason',
      '32c4': 'New Degree Mark Sheets relevant reason',
      '32c11': 'New Date of Passing',
      '32c12': 'New Percentage of marks',
      '33c2': 'Relevant document resaon',
      '33c4': 'Relevant Marksheet reason',
      '33c11': 'New Year of passing',
      '33c12': 'New Percentage of marks',
      '34c2': 'New Relevant reason',
      '34c3': 'Certificate Number',
      '34c8': 'Name of university',
      '34c11': 'New Month and Year of Passing',
      '35c2': 'New relevant Reason',
      '35c3': 'Certificate Number',
      '35c8': 'Name of university',
      '35c11': 'New Month and Year of Passing',
      '35c12': 'New Percentage reason',
      '36c2': 'Last studied conduct relevant',
      '36c4': 'Latest Conduct Certificate relevant reason',
      '37c2': 'Name in the M.Phill Certificate',
      '37c3': 'Certificate Number',
      '37c4': 'Name in the certificate',
      '37c5': 'UG Marksheet relevant reason',
      '37c9': 'Name of subject',
      '37c13': 'New name of the university',
      '37c14': 'New institute studied',
      '37c15': 'New Month & Year of passing',
      '37c19': 'Period of study',
      '37c21': 'Percentage of marks',
      '37c25': 'UGC Recognised University',
      '37c30': 'Government Order No for UG',
      '38c2': 'Document relevant reason',
      '38c3': 'New Institute',
      '38c4': 'Name in the marksheet',
      '38c7': 'No. of Marksheet',
      '38c18': 'New Date of publications',
      '38c19': 'Period of study',
      '38c20': 'Mode of study',
      '39c2': 'Relevant document reason',
      '40c2': 'Relevant document reason',
      '41c2': 'Relevant document reason',
      '42c2': 'Relevant document reason',
      '43c2': 'Relevant document reason',
      '93c2': 'Relevant document reason',
      '94c2': 'Relevant document reason',
      '95c2': 'Relevant document reason',
      '96c2': 'Relevant document reason',
      '97c2': 'Relevant document reason',
      '98c2': 'Relevant document reason',
      '99c2': 'Relevant document reason',
      '100c2': 'Relevant document reason',
      '101c2': 'Relevant document reason',
      '102c2': 'Relevant document reason',
      '103c2': 'Relevant document reason',
      '104c2': 'Relevant document reason',
      '105c2': 'Relevant document reason',
      '106c2': 'Relevant document reason',
      '107c2': 'Relevant document reason',
      '108c2': 'Relevant document reason',
      '109c2': 'Relevant document reason',
      '110c2': 'Relevant document reason',
      '111c2': 'Relevant document reason',
      '112c2': 'Relevant document reason',
      '113c2': 'Relevant document reason',
      '114c2': 'Relevant document reason',
      '115c2': 'Relevant document reason',
      '116c2': 'Relevant document reason',
      '117c2': 'Relevant document reason',
      '118c2': 'Relevant document reason',
      '119c2': 'Relevant document reason',
      '120c2': 'Relevant document reason',
      '121c2': 'Relevant document reason',
      '122c2': 'Relevant document reason',
      '123c2': 'Relevant document reason',
      '124c2': 'Relevant document reason',
      '125c2': 'Relevant document reason',
      '126c2': 'Relevant document reason',
      '127c2': 'Relevant document reason',
      '128c2': 'Relevant document reason',
      '129c2': 'Relevant document reason',
      '130c2': 'Relevant document reason',
      '131c2': 'Relevant document reason',
      '132c2': 'Relevant document reason',
      '133c2': 'Relevant document reason',
      '134c2': 'Relevant document reason',
      '135c2': 'Relevant document reason',
      '44c2': 'Relevant document reason',
      '44c3': 'New Institute',
      '44c4': 'Name in the marksheet',
      '44c7': 'No of marksheet',
      '44c6': 'New date of publications',
      '44c19': 'Period of study',
      '44c20': 'Mode of study',
      '45c2': 'Relevant document reason',
      '45c3': 'New Institute',
      '45c4': 'Name in the marksheet',
      '45c7': 'No of marksheet',
      '45c6': 'New date of publications',
      '45c19': 'Period of study',
      '45c20': 'Mode of study',
      '46c2': 'Relevant document reason',
      '46c3': 'New Institute',
      '46c4': 'Name in the marksheet',
      '46c7': 'No of marksheet',
      '46c6': 'New date of publications',
      '46c19': 'Period of study',
      '46c20': 'Mode of study',
      '47c2': 'Relevant document reason',
      '47c3': 'New Institute',
      '47c4': 'Name in the marksheet',
      '47c7': 'No of marksheet',
      '47c6': 'New date of publications',
      '47c19': 'Period of study',
      '47c20': 'Mode of study',
      '48c2': 'Relevant document reason',
      '48c3': 'New Institute',
      '48c4': 'Name in the marksheet',
      '48c7': 'No of marksheet',
      '48c6': 'New date of publications',
      '48c19': 'Period of study',
      '48c20': 'Mode of study',
      '49c2': 'Relevant document reason',
      '49c5': 'Date of publications',
      '49c6': 'Name of institute',
      '50c2': 'Relevant document reason',
      '50c5': 'Date of publications',
      '50c6': 'Name of institute',
      '51c2': 'Relevant document reason',
      '51c5': 'Date of publications',
      '51c6': 'Name of institute',
      '52c2': 'Relevant document reason',
      '52c5': 'Date of publications',
      '52c6': 'Name of institute',
      '53c2': 'Relevant document reason',
      '53c5': 'Date of publications',
      '53c6': 'Name of institute',
      '54c2': 'Relevant document reason',
      '54c5': 'Date of publications',
      '54c6': 'Name of institute',
      '90c2': 'Relevant document reason',
      '90c5': 'Date of publications',
      '90c6': 'Name of institute',
      '91c2': 'Relevant document reason',
      '91c5': 'Date of publications',
      '91c6': 'Name of institute',
      '92c2': 'Relevant document reason',
      '92c5': 'Date of publications',
      '92c6': 'Name of institute',
      '55c2': 'Relevant document reason',
      '55c9': 'Name of institute',
      '55c12': 'Percentage of marks',
      '55c13': 'Date of publications',
      '56c2': 'Relevant document reason',
      '56c9': 'Name of institute',
      '56c12': 'Percentage of marks',
      '56c13': 'Date of publications',
      '57c2': 'Relevant document reason',
      '57c9': 'Name of institute',
      '57c12': 'Percentage of marks',
      '57c13': 'Date of publications',
      '58c2': 'Relevant document reason',
      '58c9': 'Name of institute',
      '58c12': 'Percentage of marks',
      '58c13': 'Date of publications',
      '59c2': 'Relevant document reason',
      '59c9': 'Name of institute',
      '59c12': 'Percentage of marks',
      '59c13': 'Date of publications',
      '60c2': 'Relevant document reason',
      '60c9': 'Name of institute',
      '60c12': 'Percentage of marks',
      '60c13': 'Date of publications',
      '61c2': 'Relevant document reason',
      '61c9': 'Name of institute',
      '61c12': 'Percentage of marks',
      '61c13': 'Date of publications',
      '62c2': 'Relevant document reason',
      '62c5': 'Name in the PG Marksheet',
      '62c7': 'Number of Mark Sheet',
      '62c8': 'Name date of publications of result',
      '62c9': 'New Month and year of passing',
      '62c14': 'Name of institute',
      '62c15': 'Mode of study',
      '63c2': 'Relevant document reason',
      '63c5': 'Name in the PG Degree Certificate',
      '63c7': 'Number of Marksheet',
      '63c8': 'New date of publication of result',
      '63c9': 'New period of study',
      '63c14': 'Name of institute',
      '63c15': 'Mode of study',
      '64c2': 'Relevant document reason',
      '64c5': 'Name in the PG Degree Certificate',
      '64c7': 'Number of Marksheet',
      '64c8': 'New date of publication of result',
      '64c9': 'New period of study',
      '64c14': 'Name of institute',
      '64c15': 'Mode of study',
      '65c2': 'Relevant document reason',
      '65c5': 'Name in the PG Degree Certificate',
      '65c7': 'Number of Marksheet',
      '65c8': 'New date of publication of result',
      '65c9': 'New period of study',
      '65c14': 'Name of institute',
      '65c15': 'Mode of study',
      '66c2': 'Relevant document reason',
      '66c5': 'Name in the PG Degree Certificate',
      '66c7': 'Number of Marksheet',
      '66c8': 'New date of publication of result',
      '66c9': 'New period of study',
      '66c14': 'Name of institute',
      '66c15': 'Mode of study',
      '67c2': 'Relevant document reason',
      '67c5': 'Name in the PG Degree Certificate',
      '67c7': 'Number of Marksheet',
      '67c8': 'New date of publication of result',
      '67c9': 'New period of study',
      '67c14': 'Name of institute',
      '67c15': 'Mode of study',
      '68c4': 'Month & Year of passing',
      '68c7': 'Not relevant reason',
      '68c11': 'Date of publication of result',
      '69c3': 'Not relevant reason',
      '70c2': 'Relevant document reason',
      '70c3': 'New Institute',
      '70c4': 'Name in the marksheet',
      '70c7': 'No of marksheet',
      '70c6': 'New date of publications',
      '70c19': 'Period of study',
      '70c20': 'Mode of study',
      '71c2': 'Relevant document reason',
      '71c3': 'New Institute',
      '71c4': 'Name in the marksheet',
      '71c7': 'No of marksheet',
      '71c6': 'New date of publications',
      '71c19': 'Period of study',
      '71c20': 'Mode of study',
      '72c2': 'Relevant document reason',
      '72c3': 'New Institute',
      '72c4': 'Name in the marksheet',
      '72c7': 'No of marksheet',
      '72c6': 'New date of publications',
      '72c19': 'Period of study',
      '72c20': 'Mode of study',
      '73c2': 'Relevant document reason',
      '73c3': 'New Institute',
      '73c4': 'Name in the marksheet',
      '73c7': 'No of marksheet',
      '73c6': 'New date of publications',
      '73c19': 'Period of study',
      '73c20': 'Mode of study',
      '74c2': 'Relevant document reason',
      '74c3': 'New Institute',
      '74c4': 'Name in the marksheet',
      '74c7': 'No of marksheet',
      '74c6': 'New date of publications',
      '74c19': 'Period of study',
      '74c20': 'Mode of study',
      '75c2': 'Relevant document reason',
      '75c3': 'New Institute',
      '75c4': 'Name in the marksheet',
      '75c7': 'No of marksheet',
      '75c6': 'New date of publications',
      '75c19': 'Period of study',
      '75c20': 'Mode of study',
      '76c2': 'Relevant document reason',
      '76c3': 'New Institute',
      '76c4': 'Name in the marksheet',
      '76c7': 'No of marksheet',
      '76c6': 'New date of publications',
      '76c19': 'Period of study',
      '76c20': 'Mode of study',
      '77c2': 'Relevant document reason',
      '77c3': 'New Institute',
      '77c4': 'Name in the marksheet',
      '77c7': 'No of marksheet',
      '77c6': 'New date of publications',
      '77c19': 'Period of study',
      '77c20': 'Mode of study',
      '78c2': 'Relevant document reason',
      '78c3': 'New Institute',
      '78c4': 'Name in the marksheet',
      '78c7': 'No of marksheet',
      '78c6': 'New date of publications',
      '78c19': 'Period of study',
      '78c20': 'Mode of study',
      '80c2': 'Relevant document reason',
      '80c5': 'Name in the PG Degree Certificate',
      '80c7': 'Number of Marksheet',
      '80c8': 'New date of publication of result',
      '80c9': 'New period of study',
      '80c14': 'Name of institute',
      '80c15': 'Mode of study',
      '81c2': 'Relevant document reason',
      '81c5': 'Name in the PG Degree Certificate',
      '81c7': 'Number of Marksheet',
      '81c8': 'New date of publication of result',
      '81c9': 'New period of study',
      '81c14': 'Name of institute',
      '81c15': 'Mode of study',
      '82c2': 'Relevant document reason',
      '82c5': 'Name in the PG Degree Certificate',
      '82c7': 'Number of Marksheet',
      '82c8': 'New date of publication of result',
      '82c9': 'New period of study',
      '82c14': 'Name of institute',
      '82c15': 'Mode of study',
      '83c2': 'Relevant document reason',
      '83c5': 'Name in the PG Degree Certificate',
      '83c7': 'Number of Marksheet',
      '83c8': 'New date of publication of result',
      '83c9': 'New period of study',
      '83c14': 'Name of institute',
      '83c15': 'Mode of study',
      '84c2': 'Relevant document reason',
      '84c5': 'Name in the PG Degree Certificate',
      '84c7': 'Number of Marksheet',
      '84c8': 'New date of publication of result',
      '84c9': 'New period of study',
      '84c14': 'Name of institute',
      '84c15': 'Mode of study',
      '85c2': 'Relevant document reason',
      '85c5': 'Name in the PG Degree Certificate',
      '85c7': 'Number of Marksheet',
      '85c8': 'New date of publication of result',
      '85c9': 'New period of study',
      '85c14': 'Name of institute',
      '85c15': 'Mode of study',
      '86c2': 'Relevant document reason',
      '86c5': 'Name in the PG Degree Certificate',
      '86c7': 'Number of Marksheet',
      '86c8': 'New date of publication of result',
      '86c9': 'New period of study',
      '86c14': 'Name of institute',
      '86c15': 'Mode of study',
      '87c2': 'Relevant document reason',
      '87c5': 'Name in the PG Degree Certificate',
      '87c7': 'Number of Marksheet',
      '87c8': 'New date of publication of result',
      '87c9': 'New period of study',
      '87c14': 'Name of institute',
      '87c15': 'Mode of study',
      '88c2': 'Relevant document reason',
      '88c5': 'Name in the PG Degree Certificate',
      '88c7': 'Number of Marksheet',
      '88c8': 'New date of publication of result',
      '88c9': 'New period of study',
      '88c14': 'Name of institute',
      '88c15': 'Mode of study',
    };

    $scope.titles =
        {
          "10th / SSLC Certificate": 'SSLC Certificate',
          "12th / HSC Certificate": 'HSC Certificate',
          "Community Certificate": 'Community Certificate',
          "Diploma Certificate": 'Diploma Certificate',
          "Graduation Degree Certificate": 'UG Degree Certificate',
          "PSTM Certificate": 'PSTM Certificate',
          "PSTM Certificate for PG Degree": 'PSTM Certificate for PG Degree',
          "PSTM Certificate for Ph.D Degree": 'PSTM Certificate for Ph.D Degree',
          "PSTM Certificate for B.Ed Degree": 'PSTM Certificate for B.Ed Degree',
          "PSTM Certificate for M.Ed Degree": 'PSTM Certificate for M.Ed Degree',
          "General Information": 'General Information',
          "Order of Qualification": 'Order of Qualification',
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
          "M.Phil Marksheet": 'M.Phil Marksheet',
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
          "Work Experience 6": 'Work Experience 6',
          "Work Experience 7": 'Work Experience 7',
          "Work Experience 8": 'Work Experience 8',
          "Work Experience 9": 'Work Experience 9',
          "Work Experience 10": 'Work Experience 10',
          "Work Experience 11": 'Work Experience 11',
          "Work Experience 12": 'Work Experience 12',
          "Work Experience 13": 'Work Experience 13',
          "Work Experience 14": 'Work Experience 14',
          "Work Experience 15": 'Work Experience 15',
          "Work Experience 16": 'Work Experience 16',
          "Work Experience 17": 'Work Experience 17',
          "Work Experience 18": 'Work Experience 18',
          "Work Experience 19": 'Work Experience 19',
          "Work Experience 20": 'Work Experience 20',
          "Work Experience 21": 'Work Experience 21',
          "Work Experience 22": 'Work Experience 22',
          "Work Experience 23": 'Work Experience 23',
          "Work Experience 24": 'Work Experience 24',
          "Work Experience 25": 'Work Experience 25',
          "Work Experience 26": 'Work Experience 26',
          "Work Experience 27": 'Work Experience 27',
          "Work Experience 28": 'Work Experience 28',
          "Work Experience 29": 'Work Experience 29',
          "Work Experience 30": 'Work Experience 30',
          "Work Experience 31": 'Work Experience 31',
          "Work Experience 32": 'Work Experience 32',
          "Work Experience 33": 'Work Experience 33',
          "Work Experience 34": 'Work Experience 34',
          "Work Experience 35": 'Work Experience 35',
          "Work Experience 36": 'Work Experience 36',
          "Work Experience 37": 'Work Experience 37',
          "Work Experience 38": 'Work Experience 38',
          "Work Experience 39": 'Work Experience 39',
          "Work Experience 40": 'Work Experience 40',
          "Work Experience 41": 'Work Experience 41',
          "Work Experience 42": 'Work Experience 42',
          "Work Experience 43": 'Work Experience 43',
          "Work Experience 44": 'Work Experience 44',
          "Work Experience 45": 'Work Experience 45',
          "Work Experience 46": 'Work Experience 46',
          "Work Experience 47": 'Work Experience 47',
          "Work Experience 48": 'Work Experience 48',
          "UG Degree / Equivalent Marksheet 1": 'UG Degree / Equivalent Marksheet 1',
          "UG Degree / Equivalent Marksheet 2": 'UG Degree / Equivalent Marksheet 2',
          "UG Degree / Equivalent Marksheet 3": 'UG Degree / Equivalent Marksheet 3',
          "UG Degree / Equivalent Marksheet 4": 'UG Degree / Equivalent Marksheet 4',
          "UG Degree / Equivalent Marksheet 5": 'UG Degree / Equivalent Marksheet 5',
          "UG Degree / Equivalent Marksheet 6": 'UG Degree / Equivalent Marksheet 6',
          "UG Degree / Equivalent Marksheet 7": 'UG Degree / Equivalent Marksheet 7',
          "UG Degree / Equivalent Marksheet 8": 'UG Degree / Equivalent Marksheet 8',
          "UG Degree / Equivalent Marksheet 9": 'UG Degree / Equivalent Marksheet 9',
          "UG Degree / Equivalent Marksheet 10": 'UG Degree / Equivalent Marksheet 10',
          "UG Degree / Equivalent Marksheet 11": 'UG Degree / Equivalent Marksheet 11',
          "UG Degree / Equivalent Marksheet 12": 'UG Degree / Equivalent Marksheet 12',
          "UG Degree / Equivalent Marksheet 13": 'UG Degree / Equivalent Marksheet 13',
          "UG Degree / Equivalent Marksheet 14": 'UG Degree / Equivalent Marksheet 14',
          "B.Ed Degree / Equivalent Marksheet": 'B.Ed Degree / Equivalent Consolidated Marksheet',
          "B.Ed Degree / Equivalent Marksheet 1": 'B.Ed Degree / Equivalent Marksheet 1',
          "B.Ed Degree / Equivalent Marksheet 2": 'B.Ed Degree / Equivalent Marksheet 2',
          "B.Ed Degree / Equivalent Marksheet 3": 'B.Ed Degree / Equivalent Marksheet 3',
          "B.Ed Degree / Equivalent Marksheet 4": 'B.Ed Degree / Equivalent Marksheet 4',
          "B.Ed Degree / Equivalent Marksheet 5": 'B.Ed Degree / Equivalent Marksheet 5',
          "B.Ed Degree / Equivalent Marksheet 6": 'B.Ed Degree / Equivalent Marksheet 6',
          "B.Ed Degree / Equivalent Marksheet 7": 'B.Ed Degree / Equivalent Marksheet 7',
          "B.Ed Degree / Equivalent Marksheet 8": 'B.Ed Degree / Equivalent Marksheet 8',
          "M.Ed Degree / Equivalent Marksheet": 'M.Ed Degree / Equivalent Consolidated Marksheet',
          "M.Ed Degree / Equivalent Marksheet 1": 'M.Ed Degree / Equivalent Marksheet 1',
          "M.Ed Degree / Equivalent Marksheet 2": 'M.Ed Degree / Equivalent Marksheet 2',
          "M.Ed Degree / Equivalent Marksheet 3": 'M.Ed Degree / Equivalent Marksheet 3',
          "M.Ed Degree / Equivalent Marksheet 4": 'M.Ed Degree / Equivalent Marksheet 4',
          "M.Ed Degree / Equivalent Marksheet 5": 'M.Ed Degree / Equivalent Marksheet 5',
          "M.Ed Degree / Equivalent Marksheet 6": 'M.Ed Degree / Equivalent Marksheet 6',
          "PG Degree / Equivalent Consolidated Marksheet": 'PG Degree / Equivalent Consolidated Marksheet',
          "PG Degree / Equivalent Marksheet 1": 'PG Degree / Equivalent Marksheet 1',
          "PG Degree / Equivalent Marksheet 2": 'PG Degree / Equivalent Marksheet 2',
          "PG Degree / Equivalent Marksheet 3": 'PG Degree / Equivalent Marksheet 3',
          "PG Degree / Equivalent Marksheet 4": 'PG Degree / Equivalent Marksheet 4',
          "PG Degree / Equivalent Marksheet 5": 'PG Degree / Equivalent Marksheet 5',
          "PG Degree / Equivalent Marksheet 6": 'PG Degree / Equivalent Marksheet 6',
          "PG Degree / Equivalent Marksheet 7": 'PG Degree / Equivalent Marksheet 7',
          "PG Degree / Equivalent Marksheet 8": 'PG Degree / Equivalent Marksheet 8',
          "PG Degree / Equivalent Marksheet 9": 'PG Degree / Equivalent Marksheet 9',
          "PG Degree / Equivalent Marksheet 10": 'PG Degree / Equivalent Marksheet 10',
          "PG Degree / Equivalent Marksheet 11": 'PG Degree / Equivalent Marksheet 11',
          "PG Degree / Equivalent Marksheet 12": 'PG Degree / Equivalent Marksheet 12',
          "PG Degree / Equivalent Marksheet 13": 'PG Degree / Equivalent Marksheet 13',
          "PG Degree / Equivalent Marksheet 14": 'PG Degree / Equivalent Marksheet 14',
          "SLET / NET Exemption certificate": 'SLET / NET Exemption certificate'
        };

    $scope.object = Object;


    $scope.number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.device_details = false;


    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.resetValues = function () {
      $scope.initializeVariables();
      $('#dd-comment-2').val('');
      $('#dd-comment-3').val('');
      $scope.packages.comment = '';
      $("#modal-form input[type=radio], #modal-form input[type=text], #modal-form select").removeAttr("disabled")
    };

    $scope.getQuestions = function () {
      Http.get("/assets/question.json", 'local').then(function (object) {
        $rootScope.documentWithQuestions = object;
        console.log('document with questions');
        console.log($rootScope.documentWithQuestions)
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
      if ($scope.selectedDocType == 'General Information') {
        $('#docFrame').attr("src", '../assets/src/images/general information.svg');
      } else if ($scope.selectedDocType == 'Order of Qualification') {
        $('#docFrame').attr("src", '../assets/src/images/order_of_edu.svg');
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
        } else if ($scope.selectedDocType == 'Order of Qualification') {
          $('#docFrame').attr("src", '../assets/src/images/order_of_edu.svg');
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
          if ($(fields[i]).className == "undefined") {
            if ($(fields[i]).val() == "") {
              alert("All fields are mandatory");
              return false;
            }
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

            // if ($('input[name=' + radioName + ']:checked').val() != 1 && flag != true) {
            //     break
            // } else {
            //     flag = true
            // }
          }
        }
      }


      console.log($scope.finalJsonData);
      console.log($scope.selectedDocType);
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
        $("#doc13, #doc23, #doc36, #doc84, #doc123, #doc305, #doc3211, #doc3311,  #doc3511, #doc3715, #doc3818, #doc446, #doc456, #doc466, #doc476, #doc486, #doc495,#doc505,#doc515,#doc525,#doc535,#doc545,#doc5513,#doc5613,#doc5713,#doc5813,#doc5913,#doc6013,#doc6113,#doc905,#doc915,#doc925, #doc628, #doc638, #doc648, #doc658, #doc668, #doc678, #doc6811, #doc2916, #doc2912, #doc706, #doc716, #doc726, #doc736, #doc746, #doc756, #doc766, #doc776, #doc786, #doc808, #doc818, #doc828, #doc838, #doc848, #doc858, #doc868, #doc878, #doc888, #doc1403, #doc1405, #doc1406, #doc1407, #doc1408").datepicker({
          format: 'dd-mm-yyyy',
          orientation: "auto"
        }).on('changeDate', function (value) {
          console.log($("#" + event.target.id + "_age").val('abcded'));
          // vm.doc13 = moment(value.date).format("DD-MM-YYYY")
        });
        $("#doc13, #doc14, #doc24, #doc254, #doc274, #doc684, #doc284, #doc2812, #doc294,  #doc2515, #doc3411").datepicker({
          format: "M yyyy",
          startView: 1,
          minViewMode: 1,
          maxViewMode: 2,
          autoClose: true
        }).on('changeDate', function (value) {
          // vm.doc23 = moment(value.date).format("MM-YYYY")
        });
        $('#doc255, #doc285, #doc3819, #doc4419, #doc4519, #doc4619, #doc4719,#doc4819, #doc629, #doc639, #doc649, #doc659, #doc669, #doc679, #doc7019,#doc7119,#doc7219,#doc7319,#doc7419,#doc7519,#doc7619,#doc7719,#doc7819, #doc809, #doc819, #doc829, #doc839, #doc849, #doc859, #doc869, #doc879, #doc889').datepicker({
          format: "M yyyy",
          startView: 1,
          minViewMode: 1,
          maxViewMode: 2,
          multidate: true,
          multidateSeparator: "-",
          autoClose: true
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
          $("body").append("<a id='downloadable" + $scope.count + "' download target='_blank' href='" + $scope.urlPath + "/api/tamilnadu/candidates/download?file=" + number + "'></a>")
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
        url: $scope.urlPath + '/api/tamilnadu/candidates/import-candidates',
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
      // // window.open($scope.urlPath+'/assets/uploads/'+user_id+'.pdf');
      // Http.getLocal("/api/get-pdf", {
      //   user_id: user_id
      // }).then(function (response) {
      //   if (response.code == 1) {
      //     $("body").append('<a target="_blank" id="download" href="/assets/uploads/' + user_id + '/' + user_id + '.pdf"></a>');
      //     $("#download")[0].click();
      //     setTimeout(function () {
      //       $("#download").remove();
      //     })
      //   } else {
      //     alert(response.message)
      //   }
      // });
      $("body").append('<a target="_blank" id="download" href="/assets/uploads/' + user_id + '/' + user_id + '.pdf"></a>');
      $("#download")[0].click();
      setTimeout(function () {
        $("#download").remove();
      })
    };

    $scope.educationIndex = '';
    $scope.openEducationModel = function (index) {
      $scope.educationIndex = index;
      $('#modal-education').modal('toggle');
    };
    $scope.closeEducationModel = function () {
      $('#modal-education').modal('toggle');
    };

    $scope.showExperienceModal = function () {
      Http.post("/biz/scores/orchEntry", {
        'float_pgMarks': 56,
        'dt_pg_por': '15/05/1998',
        'str_subjHandledStatus': 1,
        'v_subjHandled': 'Home Science',
        'v_subjApplied': 'Home Science',
        'dt_elp_fromDt': '14/11/2003',
        'dt_elp_toDt': '02/04/2018',
        'dt_slet_por': '01/02/2001',
        'dt_net_por': '01/01/0001',
        'str_caste': 'OC_CATEGORY',
        'bool_diffAbled': 'False',
        'bool_sletStatus': 'True',
        'bool_netStatus': 'False',
        'v_subjSlet': 'Home Science',
        'v_subjNet': '',
        'bool_equivFlag1': '',
        'bool_equivFlag2': '',
        'dt_mphil_por': '01/01/0001',
        'dt_phd_por': '01/01/0001',
        'bool_chk1': 'False',
        'bool_chk2': 'False'
      }).then(function (object) {
        console.log(object);
        $scope.orchEntry = object;
        $('#modal-exp').modal('toggle');
      })

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
    };
    $scope.generatePDF = function () {
      // Choose the element that our invoice is rendered in.
      var element = document.getElementById("invoice");
      // Choose the element and save the PDF for our user.
      html2pdf()
          .from(element)
          .save();
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
      templateUrl: "/candidates/view/templawork_experiencetes/Diploma_Certificate.html"
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
  }).directive('pstmbedCertificate', function () {
    return {
      templateUrl: "/candidates/view/templates/PSTMBED_Certificate.html"
    };
  }).directive('pstmmedCertificate', function () {
    return {
      templateUrl: "/candidates/view/templates/PSTMMED_Certificate.html"
    };
  }).directive('pstmpgCertificate', function () {
    return {
      templateUrl: "/candidates/view/templates/PSTMPG_Certificate.html"
    };
  }).directive('pstmphdCertificate', function () {
    return {
      templateUrl: "/candidates/view/templates/PSTMPHD_Certificate.html"
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
  }).directive('pgMarksheet6', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet6.html"
    };
  }).directive('pgMarksheet7', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet7.html"
    };
  }).directive('pgMarksheet8', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet8.html"
    };
  }).directive('pgMarksheet9', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet9.html"
    };
  }).directive('pgMarksheet10', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet10.html"
    };
  }).directive('pgMarksheet11', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet11.html"
    };
  }).directive('pgMarksheet12', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet12.html"
    };
  }).directive('pgMarksheet13', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet13.html"
    };
  }).directive('pgMarksheet14', function () {
    return {
      templateUrl: "/candidates/view/templates/PG_Marksheet14.html"
    };
  }).directive('nocCertificateForOtherDepartment', function () {
    return {
      templateUrl: "/candidates/view/templates/NOC_Other_Department.html"
    };
  }).directive('mphilDegreeCertificate', function () {
    return {
      templateUrl: "/candidates/view/templates/MPHIL_Degree.html"
    };
  }).directive('mphilDegreeMarksheet', function () {
    return {
      templateUrl: "/candidates/view/templates/MPHIL_Marksheet.html"
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
  }).directive('bedMarksheet6', function () {
    return {
      templateUrl: "/candidates/view/templates/Bed_Marksheet6.html"
    };
  }).directive('bedMarksheet7', function () {
    return {
      templateUrl: "/candidates/view/templates/Bed_Marksheet7.html"
    };
  }).directive('bedMarksheet8', function () {
    return {
      templateUrl: "/candidates/view/templates/Bed_Marksheet8.html"
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
  }).directive('medMarksheet6', function () {
    return {
      templateUrl: "/candidates/view/templates/MEd_Marksheet6.html"
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
  }).directive('ugMarksheet6', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet6.html"
    };
  }).directive('ugMarksheet7', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet7.html"
    };
  }).directive('ugMarksheet8', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet8.html"
    };
  }).directive('ugMarksheet9', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet9.html"
    };
  }).directive('ugMarksheet10', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet10.html"
    };
  }).directive('ugMarksheet11', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet11.html"
    };
  }).directive('ugMarksheet12', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet12.html"
    };
  }).directive('ugMarksheet13', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet13.html"
    };
  }).directive('ugMarksheet14', function () {
    return {
      templateUrl: "/candidates/view/templates/UG_Marksheet14.html"
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
  }).directive('work6', function () {
    return {
      templateUrl: "/candidates/view/templates/Work6.html"
    };
  }).directive('work7', function () {
    return {
      templateUrl: "/candidates/view/templates/Work7.html"
    };
  }).directive('work8', function () {
    return {
      templateUrl: "/candidates/view/templates/Work8.html"
    };
  }).directive('work9', function () {
    return {
      templateUrl: "/candidates/view/templates/Work9.html"
    };
  }).directive('work10', function () {
    return {
      templateUrl: "/candidates/view/templates/Work10.html"
    };
  }).directive('work11', function () {
    return {
      templateUrl: "/candidates/view/templates/Work11.html"
    };
  }).directive('work12', function () {
    return {
      templateUrl: "/candidates/view/templates/Work12.html"
    };
  }).directive('work13', function () {
    return {
      templateUrl: "/candidates/view/templates/Work13.html"
    };
  }).directive('work14', function () {
    return {
      templateUrl: "/candidates/view/templates/Work14.html"
    };
  }).directive('work15', function () {
    return {
      templateUrl: "/candidates/view/templates/Work15.html"
    };
  }).directive('work16', function () {
    return {
      templateUrl: "/candidates/view/templates/Work16.html"
    };
  }).directive('work17', function () {
    return {
      templateUrl: "/candidates/view/templates/Work17.html"
    };
  }).directive('work18', function () {
    return {
      templateUrl: "/candidates/view/templates/Work18.html"
    };
  }).directive('work19', function () {
    return {
      templateUrl: "/candidates/view/templates/Work19.html"
    };
  }).directive('work20', function () {
    return {
      templateUrl: "/candidates/view/templates/Work20.html"
    };
  }).directive('work21', function () {
    return {
      templateUrl: "/candidates/view/templates/Work21.html"
    };
  }).directive('work22', function () {
    return {
      templateUrl: "/candidates/view/templates/Work22.html"
    };
  }).directive('work23', function () {
    return {
      templateUrl: "/candidates/view/templates/Work23.html"
    };
  }).directive('work24', function () {
    return {
      templateUrl: "/candidates/view/templates/Work24.html"
    };
  }).directive('work25', function () {
    return {
      templateUrl: "/candidates/view/templates/Work25.html"
    };
  }).directive('work26', function () {
    return {
      templateUrl: "/candidates/view/templates/Work26.html"
    };
  }).directive('work27', function () {
    return {
      templateUrl: "/candidates/view/templates/Work27.html"
    };
  }).directive('work28', function () {
    return {
      templateUrl: "/candidates/view/templates/Work28.html"
    };
  }).directive('work29', function () {
    return {
      templateUrl: "/candidates/view/templates/Work29.html"
    };
  }).directive('work30', function () {
    return {
      templateUrl: "/candidates/view/templates/Work30.html"
    };
  }).directive('work31', function () {
    return {
      templateUrl: "/candidates/view/templates/Work31.html"
    };
  }).directive('work32', function () {
    return {
      templateUrl: "/candidates/view/templates/Work32.html"
    };
  }).directive('work33', function () {
    return {
      templateUrl: "/candidates/view/templates/Work33.html"
    };
  }).directive('work34', function () {
    return {
      templateUrl: "/candidates/view/templates/Work34.html"
    };
  }).directive('work35', function () {
    return {
      templateUrl: "/candidates/view/templates/Work35.html"
    };
  }).directive('work36', function () {
    return {
      templateUrl: "/candidates/view/templates/Work36.html"
    };
  }).directive('work37', function () {
    return {
      templateUrl: "/candidates/view/templates/Work37.html"
    };
  }).directive('work38', function () {
    return {
      templateUrl: "/candidates/view/templates/Work38.html"
    };
  }).directive('work39', function () {
    return {
      templateUrl: "/candidates/view/templates/Work39.html"
    };
  }).directive('work40', function () {
    return {
      templateUrl: "/candidates/view/templates/Work40.html"
    };
  }).directive('work41', function () {
    return {
      templateUrl: "/candidates/view/templates/Work41.html"
    };
  }).directive('work42', function () {
    return {
      templateUrl: "/candidates/view/templates/Work42.html"
    };
  }).directive('work43', function () {
    return {
      templateUrl: "/candidates/view/templates/Work43.html"
    };
  }).directive('work44', function () {
    return {
      templateUrl: "/candidates/view/templates/Work44.html"
    };
  }).directive('work45', function () {
    return {
      templateUrl: "/candidates/view/templates/Work45.html"
    };
  }).directive('work46', function () {
    return {
      templateUrl: "/candidates/view/templates/Work46.html"
    };
  }).directive('work47', function () {
    return {
      templateUrl: "/candidates/view/templates/Work47.html"
    };
  }).directive('work48', function () {
    return {
      templateUrl: "/candidates/view/templates/Work48.html"
    };
  }).directive('generalInformation', function () {
    return {
      templateUrl: "/candidates/view/templates/General_Information.html"
    };
  }).directive('exemption', function () {
    return {
      templateUrl: "/candidates/view/templates/Exemption.html"
    };
  }).directive('orderOfQualification', function () {
    return {
      templateUrl: "/candidates/view/templates/Order_Of_Qualification.html"
    };
  })
})();


