var Promise = require("bluebird");

module.exports = function (dataObj) {


    // var dataObj = {};
    //console.log(dataObj);
    // var dataObj = {};
    // dataObj=<%=request.getAttribute("JSONSTRING")%>;
    function returnStringIfNull(string) {
        return string == null ? '' : string
    }

    //console.log('check');
    //console.log(dataObj.wkExperienceDtlsList[0])
    var fontSize = 8;
    // pdfMake.fonts = {
    //     Roboto: {
    //         normal: 'Roboto-Regular.ttf',
    //         bold: 'Roboto-Medium.ttf',
    //         italics: 'Roboto-Italic.ttf',
    //         bolditalics: 'Roboto-MediumItalic.ttf'
    //     },
    //     latha: {
    //         normal: 'latha.ttf'
    //     },
    // };


    var contentCheck = [];
    var stateNewVal = "";
    var districtNewVal = "";
    var districtNewVal2 = "";
    var policeJurisdictionNewVal = "";
    var policeJurisdictionNewVal2 = "";
    var religionLabel = "";
    var religionVal = "";
    var religionTamilVal = "";
    /*
     The below check is for District and State selections
     */
    if (dataObj.altStateValDesc != null && dataObj.altStateValDesc == "Tamil Nadu") {
        stateNewVal = dataObj.stateValDesc;
        districtNewVal2 = dataObj.altDistrictValDesc;
        policeJurisdictionNewVal2 = dataObj.addressBean.alternateCity;
    }
    else {
        stateNewVal = dataObj.altStateValDesc;
        districtNewVal2 = dataObj.altDistrictValOthers;
        policeJurisdictionNewVal2 = dataObj.alternateCityother;
    }

    if (dataObj.stateValDesc != null && dataObj.stateValDesc == "Tamil Nadu") {
        stateNewVal = dataObj.stateValDesc;
        districtNewVal = dataObj.districtValDesc;
        policeJurisdictionNewVal = dataObj.addressBean.cityName;
    }
    else {
        stateNewVal = dataObj.stateValDesc;
        districtNewVal = dataObj.districtValother;
        policeJurisdictionNewVal = dataObj.cityNameother;
    }

    if (dataObj.religionBeliefOthers == "") {
        religionLabel = "Religion /";
        religionTamilVal = "மதம் ";
        religionVal = dataObj.religionBelief;
    }
    else {
        religionLabel = "Other Religion /";
        religionTamilVal = "பிற மதம்";
        religionVal = dataObj.religionBeliefOthers == null ? ' ' : dataObj.religionBeliefOthers;
    }


    var governmntTamilNewVal = "";

    if (dataObj.governmntTamil == "Y") {
        governmntTamilNewVal = "Yes";
    }
    else {
        governmntTamilNewVal = "No";
    }

    /* workexperience Conditions*/
    var GovtempNewVal = "";
    var MedalNewVal = "";

    if (dataObj.wkExperienceDtlsList[0].govtemp == "Y") {
        GovtempNewVal = "Yes";
    } else {
        GovtempNewVal = "No";
    }

    //console.log(dataObj.wkExperienceDtlsList[0]['govtemp']);
    //console.log(GovtempNewVal);

    //console.log(dataObj.wkExperienceDtlsList[0].policeStation == null ? "''" : dataObj.wkExperienceDtlsList[0].policeStation)

    if (dataObj.wkExperienceDtlsList[0].policeMedalsName == "Y") {
        MedalNewVal = "Yes";
    }
    else {
        MedalNewVal = "No";
    }


    var designationOfIssuingAuthority = "";
    if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "1") {
        designationOfIssuingAuthority = "SP/DC";
    } else if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "2") {
        designationOfIssuingAuthority = "DIG";
    } else if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "3") {
        designationOfIssuingAuthority = "IGP/ADDL.COP/COP";
    } else if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "4") {
        designationOfIssuingAuthority = "ADGP/COP";
    } else if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "5") {
        designationOfIssuingAuthority = "DGP";
    } else if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "6") {
        designationOfIssuingAuthority = "SP / DC/ Commandant";
    } else if (dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority == "7") {
        designationOfIssuingAuthority = "DIG/ JC";
    } else {
        designationOfIssuingAuthority = dataObj.wkExperienceDtlsList[0].designationOfIssuingAuthority;
    }


    var ageDiff = dataObj.serviceAsOn;
    var specialOption = dataObj.getAgeQuotaDetailsRadioChk;
    var dtArr;
    var yearVal;
    if (ageDiff != null && ageDiff != '') {
        dtArr = ageDiff.split(" ");
        yearVal = parseInt(dtArr[0]);
    } else {
        yearVal = '';
    }

    //console.log(dataObj.wkExperienceDtlsList[0].policeMedalsName);
    //console.log(MedalNewVal);


    contentCheck.push({
        fontSize: 14,
        absolutePosition: {x: 100, y: 14},
        table: {
            widths: ['*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: [{text: 'APPLICATION FOR SUB - INSPECTOR OF POLICE (TECHNICAL) - 2018', bold: true}]
                    }
                ]
            ]
        },
        layout: 'noBorders'
    });


    contentCheck.push({
            image: 'logo',
            height: 52,
            width: 306
        }, {
            fontSize: fontSize,
            margin: [0, 10, 0, 0],
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: [{text: 'User ID / ', bold: true}, {
                                text: 'பயனர் ', font: 'latha'
                            }, ' ID ']
                        },
                        {text: dataObj.userId, bold: true}
                    ]
                ]
            },
            layout: 'noBorders'
        }
    );
    if (dataObj.afterApplyVeiwPayment != null && dataObj.afterApplyVeiwPayment == "true") {
        contentCheck.push({
            fontSize: fontSize,
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: [{text: 'Recruitment / ', bold: true}, {
                                text: 'தேர்வு ', font: 'latha'
                            }]
                        },
                        {text: returnStringIfNull(dataObj.disciplineTypeDesc), bold: true}
                    ]
                ]
            },
            layout: 'noBorders'
        });
    }

    if (dataObj.afterApplyVeiwPayment != null && dataObj.afterApplyVeiwPayment == "true" && dataObj.PaymentStatusForApplicationPdf == "A") {
        contentCheck.push({
            fontSize: fontSize,
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: [{text: 'Application No. / ', bold: true}, {
                                text: 'விண்ணப்ப எண் ', font: 'latha'
                            }]
                        }, {
                        text: returnStringIfNull(dataObj.additionalDetailsBean.applicationNumber),
                        bold: true
                    }
                    ]
                ]
            },
            layout: 'noBorders'
        });


        if (dataObj.postMasterList != null) {
            var count = 0;
            for (var i = 0; i < dataObj.postMasterList.length; i++) {
                count++;

                contentCheck.push({
                    fontSize: fontSize,
                    table: {
                        widths: [170, '*'],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: [{text: 'Preference ' + count + ' / ', bold: true}, {
                                        text: 'விருப்பப்பதவி ', font: 'latha'
                                    }, count]
                                },
                                {text: returnStringIfNull(dataObj.postMasterList[i]), bold: true}
                            ]
                        ]
                    },
                    layout: 'noBorders'
                });
            }
        }
    }
    /* if (dataObj.afterApplyVeiwPayment != null && dataObj.afterApplyVeiwPayment == "true") {
     contentCheck.push({
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: [{text: 'Preferred District/City for Written Test / ', bold: true}, {
     text: 'விருப்பமான தேர்வு மையம் ',
     font: 'latha',
     }]
     },
     [
     {text: returnStringIfNull(dataObj.testCenter1), bold: true}
     ],
     ]
     ]
     },
     layout: 'noBorders'
     });
     }*/
    contentCheck.push
    ({
            fontSize: 14,
            margin: [0, 20, 0, 0],
            table: {
                widths: ['*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: [{
                                text: 'Personal Details / ',
                                bold: true
                            }, {
                                text: 'தனி நபர் விவரங்கள் ', font: 'latha',
                            }]
                        },
                    ]
                ]
            },
            layout: 'noBorders'

        },
        // {
        // image: 'aadhaar',
        // height: 80, width: 80,
        // absolutePosition: {x: 480, y: 88},
        // },
        {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Name / ', {text: 'பெயர் ', font: 'latha',}]},
                        {text: returnStringIfNull(dataObj.personalDetailsBean.candidateFirstName) + ' ' + returnStringIfNull(dataObj.personalDetailsBean.candidateLastName)}
                    ]
                ]
            },
            layout: 'noBorders'
        },
        // {
        //     table: {
        //         widths: [170, '*'],
        //         headerRows: 1,
        //         body: [
        //             [
        //                 {text: ['Mobile Number / ', {text: 'கைபேசி எண் ', font: 'latha',}]},
        //                 [
        //                     {text: returnStringIfNull(dataObj.personalDetailsBean.mobileNo), bold: true}
        //                 ],
        //             ]
        //         ]
        //     },
        //     layout: 'noBorders'
        // },
        {
            fontSize: fontSize,
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Date Of Birth / ', {text: 'பிறந்த தேதி ', font: 'latha',}]},
                        {text: returnStringIfNull(dataObj.personalDetailsBean.dateOfBirth)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Gender / ', {text: 'பாலினம் ', font: 'latha',}]},
                        {text: dataObj.genderValDesc == null ? ' ' : dataObj.genderValDesc}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Marital Status / ', {text: 'திருமண நிலை ', font: 'latha',}]},
                        {text: dataObj.mariatalStatus == null ? ' ' : dataObj.mariatalStatus}
                    ]
                ]
            },
            layout: 'noBorders'
        },
        {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Identification Marks 1 / ', {text: 'அங்கமச்ச அடையாளங்கள் ', font: 'latha',}]},
                        {text: dataObj.idMarks == null ? ' ' : dataObj.idMarks}
                    ]
                ]
            },
            layout: 'noBorders'
        });

    if (dataObj.idMarks1 != null && dataObj.idMarks1 != '') {
        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Identification Marks 2 / ', {text: 'அங்கமச்ச அடையாளங்கள் ', font: 'latha',}]},
                        {text: dataObj.idMarks1 == null ? ' ' : dataObj.idMarks1}
                    ]
                ]
            },
            layout: 'noBorders'
        });
    }
    contentCheck.push({
        table: {
            widths: [170, '*'],
            headerRows: 1,
            body: [
                [
                    {text: ['Nationality / ', {text: 'குடியுரிமை ', font: 'latha',}]},
                    {text: dataObj.nationalityDesc == null ? ' ' : dataObj.nationalityDesc}
                ]
            ]
        },
        layout: 'noBorders'
    });

    contentCheck.push({
        table: {
            widths: [170, '*'],
            headerRows: 1,
            body: [
                [
                    {text: ['Father\'s Name /', {text: 'தந்தை பெயர் ', font: 'latha',}]},
                    {text: returnStringIfNull(dataObj.personalDetailsBean.fatherFirstName) + ' ' + returnStringIfNull(dataObj.personalDetailsBean.fatherLastName)}
                ]
            ]
        },
        layout: 'noBorders'
    }, {
        table: {
            widths: [170, '*'],
            headerRows: 1,
            body: [
                [
                    {text: ['Mother\'s Name / ', {text: 'தாயார் பெயர் ', font: 'latha',}]},
                    {text: dataObj.personalDetailsBean.motherFirstName + ' ' + dataObj.personalDetailsBean.motherLastName}
                ]
            ]
        },
        layout: 'noBorders'
    });


    var dataPersonal = [];
    dataPersonal.push([
        {
            text: ['Personal Photo ID Details / ', {
                text: 'பிற தனி அடையாள ஆவணம் ',
                font: 'latha',
            }],
        },
        {
            text: ['ID Number / ', {
                text: 'அடையாள அட்டையின் எண் ',
                font: 'latha',
            }]
        },
        {
            text: ['Date of Issue / ', {
                text: 'வழங்கப்பட்ட  தேதி ',
                font: 'latha',
            }]
        },
        {
            text: ['Place of Issue / ', {
                text: 'வழங்கப்பட்ட  இடம் ',
                font: 'latha',
            }]
        },
        {
            text: ['Issuing Authority / ', {
                text: 'சான்றிதழ் வழங்கிய அதிகாரி ',
                font: 'latha',
            }]
        },
    ])

    //console.log('check id number');
    //console.log(dataObj.idNumber);
    if (dataObj.idNumber != '' && dataObj.idNumber !== null) {
        //console.log('in check id number');
        //console.log(dataObj.idNumber);
        dataPersonal.push([
            {
                text: [returnStringIfNull(dataObj.idproofPersonalID) + ' / ', {
                    text: ' நிரந்தர கணக்கு எண் அட்டை',
                    font: 'latha',
                }]
            },
            {
                text: [returnStringIfNull(dataObj.idNumber)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.dateOfIssue)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.placeOfIssue)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.issuingAuthority)],
                bold: true
            },
        ])
    }
    if (dataObj.idNumber1 != '' && dataObj.idNumber1 !== null) {
        dataPersonal.push([
            {
                text: [returnStringIfNull(dataObj.idproofPersonalID1) + ' / ', {
                    text: 'வாக்காளர் அட்டை',
                    font: 'latha',
                }]
            },
            {
                text: [returnStringIfNull(dataObj.idNumber1)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.dateOfIssue1)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.placeOfIssue1)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.issuingAuthority1)],
                bold: true
            },
        ])
    }
    if (dataObj.idNumber2 != '' && dataObj.idNumber2 !== null) {
        dataPersonal.push([
            {
                text: [returnStringIfNull(dataObj.idproofPersonalID2) + ' / ', {
                    text: 'ஆதார் அட்டை',
                    font: 'latha',
                }]
            },
            {
                text: [returnStringIfNull(dataObj.idNumber2)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.dateOfIssue2)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.placeOfIssue2)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.issuingAuthority2)],
                bold: true
            },
        ])
    }
    if (dataObj.idNumber3 != '' && dataObj.idNumber3 !== null) {
        dataPersonal.push([
            {
                text: [returnStringIfNull(dataObj.idproofPersonalID3) + ' / ', {
                    text: 'ஓட்டுநர் உரிமம்',
                    font: 'latha',
                }]
            },
            {
                text: [returnStringIfNull(dataObj.idNumber3)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.dateOfIssue3)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.placeOfIssue3)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.issuingAuthority3)],
                bold: true
            },
        ])
    }

    if (dataObj.idNumber4 != '' && dataObj.idNumber4 !== null) {
        dataPersonal.push([
            {
                text: [returnStringIfNull(dataObj.idproofPersonalID4)]
            },
            {
                text: [returnStringIfNull(dataObj.idNumber4)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.dateOfIssue4)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.placeOfIssue4)],
                bold: true
            },
            {
                text: [returnStringIfNull(dataObj.issuingAuthority4)],
                bold: true
            },
        ])
    }

    /*
     if ((dataObj.idNumber != '' && dataObj.idNumber !== null)
     || (dataObj.idNumber1 != '' && dataObj.idNumber1 !== null)
     || (dataObj.idNumber2 != '' && dataObj.idNumber2 !== null)
     || (dataObj.idNumber3 != '' && dataObj.idNumber3 !== null)
     || (dataObj.idNumber4 != '' && dataObj.idNumber4 !== null)
     ) {
     contentCheck.push(
     {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {text: ['Personal Photo ID / ', {text: 'தனி அடையாள ஆவண விவரங்கள் ', font: 'latha',}]},
     {
     table: {
     widths: ['20%', '20%', '20%', '20%', '20%'],
     headerRows: 1,
     body: dataPersonal
     }
     }
     ]
     ]
     },
     layout: 'noBorders'
     });
     }*/

    contentCheck.push(
        {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Permanent Address / ', {text: 'நிரந்தர முகவரி ', font: 'latha',}]},
                        {text: ' '}
                    ]
                ]
            },
            layout: 'noBorders'
        },
        {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Address / ', {text: 'முகவரி ', font: 'latha',}]},
                        [
                            {text: returnStringIfNull(dataObj.addressBean.addressFiled1)},
                            {text: returnStringIfNull(dataObj.addressBean.addressFiled2)},
                            {text: returnStringIfNull(dataObj.addressBean.addressFiled3)},
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['State / Union Territory / ', {
                                text: 'மாநிலம் / யூனியன் பிரதேசம் ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(stateNewVal), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['District / City / ', {
                                text: 'மாவட்டம் / நகரம் ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(districtNewVal), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Police Station in whose Jurisdiction your residence falls / ', {
                                text: 'தங்கள் வசிப்பிட எல்லைக்குட்பட்ட காவல் நிலையம் ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(policeJurisdictionNewVal), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Pincode / ', {
                                text: 'அஞ்சல் குறியீடு ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(dataObj.addressBean.pinCode), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Address for Communication / ', {text: 'கடித முகவரி ', font: 'latha',}]},
                        [
                            {text: ''},
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Address / ', {text: 'முகவரி ', font: 'latha',}]},
                        [
                            {text: dataObj.addressBean.alternateAddressFiled1 == null ? ' ' : dataObj.addressBean.alternateAddressFiled1},
                            {text: dataObj.addressBean.alternateAddressFiled2 == null ? ' ' : dataObj.addressBean.alternateAddressFiled2},
                            {text: dataObj.addressBean.alternateAddressFiled3 == null ? ' ' : dataObj.addressBean.alternateAddressFiled3},
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['State / Union Territory / ', {
                                text: 'மாநிலம் / யூனியன் பிரதேசம் ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: dataObj.altStateValDesc == null ? ' ' : dataObj.altStateValDesc, bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['District / City / ', {
                                text: 'மாவட்டம் / நகரம் ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(districtNewVal2), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Police Station in whose Jurisdiction your residence falls / ', {
                                text: 'தங்கள் வசிப்பிட எல்லைக்குட்பட்ட காவல் நிலையம் ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(policeJurisdictionNewVal2), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Pincode / ', {
                                text: 'அஞ்சல் குறியீடு ',
                                font: 'latha',
                            }]
                        },
                        [
                            {
                                text: dataObj.addressBean.alternatePinCode == null ? ' ' : dataObj.addressBean.alternatePinCode,
                                bold: true
                            }
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        });


    // contentCheck.push({
    //     table: {
    //         widths: [170, '*'],
    //         headerRows: 1,
    //         body: [
    //             [
    //                 {text: ['']},
    //                 [
    //                     {text: returnStringIfNull(dataObj.testCenter1), bold: true}
    //                 ],
    //             ]
    //         ]
    //     },
    //     layout: 'noBorders'
    // });

    contentCheck.push(
        // {
        //     table: {
        //         widths: [170, '*'],
        //         headerRows: 1,
        //         body: [
        //             [
        //                 {text: ['Email Id / ', {text: 'மின்னஞ்சல் முகவரி ', font: 'latha',}]},
        //                 [
        //                     {text: returnStringIfNull(dataObj.personalDetailsBean.email), bold: true}
        //                 ],
        //             ]
        //         ]
        //     },
        //     layout: 'noBorders'
        // },
        {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Religion / ', {text: "மதம் ", font: 'latha',}]},
                        [
                            {text: returnStringIfNull(dataObj.religionBelief), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        });

    if (dataObj.religionBelief.toLowerCase() == "others") {
        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Other Religion / ', {text: "பிற மதம் ", font: 'latha',}]},
                        [
                            {text: returnStringIfNull(dataObj.religionBeliefOthers), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }

    contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Do you possess Community certificate issued by Tamilnadu Govt / ', {
                                text: 'தமிழ்நாடு அரசால் வழங்கப்பட்ட சாதிச் சான்றிதழ் பெற்றுள்ளீரா? ',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(governmntTamilNewVal), bold: true}
                        ],
                    ]
                ]
            },
            layout: 'noBorders'
        },
        {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Community / ', {text: 'வகுப்பு ', font: 'latha',}]},
                        {text: dataObj.categoryValDesc == null ? ' ' : dataObj.categoryValDesc}
                    ]
                ]
            },
            layout: 'noBorders'
        }
    )
    /*End Of Personal Deatails*/


    // start of community details

    if (dataObj.categoryValDesc != "OC") {
        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        ' ',
                        {
                            table: {
                                widths: ['20%', '20%', '20%', '20%', '20%'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: ['Sub Caste / ', {
                                                text: 'சாதி உட்பிரிவு ',
                                                font: 'latha',
                                            }],
                                        },
                                        {
                                            text: ['Community Certificate Number  / ', {
                                                text: 'சாதிச் சான்றிதழ் எண் ',
                                                font: 'latha',
                                            }]
                                        },
                                        {
                                            text: ['Designation Of Issuing Authority / ', {
                                                text: 'சான்றிதழ் வழங்கிய அதிகாரியின் பதவி ',
                                                font: 'latha',
                                            }]
                                        },
                                        {
                                            text: ['Place of Issue / ', {
                                                text: 'வழங்கப்பட்ட இடம் ',
                                                font: 'latha',
                                            }]
                                        },
                                        {
                                            text: ['Date Of Issue Of Certificate / ', {
                                                text: 'சான்றிதழ் வழங்கிய தேதி ',
                                                font: 'latha',
                                            }]
                                        },
                                    ],
                                    [
                                        {
                                            text: [{
                                                text: returnStringIfNull(dataObj.subcaste),
                                                bold: true,
                                            }],
                                        },
                                        {
                                            text: [{
                                                text: returnStringIfNull(dataObj.comCertificateNumber),
                                                bold: true,
                                            }],
                                        },
                                        {
                                            text: [{
                                                text: returnStringIfNull(dataObj.designationIssuingAuthority),
                                                bold: true,
                                            }],
                                        },
                                        {
                                            text: [{
                                                text: returnStringIfNull(dataObj.placeOfIssueSubcaste),
                                                bold: true,
                                            }],
                                        },
                                        {
                                            text: [{
                                                text: returnStringIfNull(dataObj.dateOfCertificate),
                                                bold: true,
                                            }],
                                        },
                                    ]
                                ]
                            }
                        }
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }

    if (dataObj.candidateAgeQuotacheck != null) {
        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Age Relaxation Options / ', {text: 'வயது தளர்வு விருப்பம்', font: 'latha',}]},
                        {text: dataObj.candidateAgeQuotacheck == null ? ' ' : dataObj.candidateAgeQuotacheck}
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }// end of community details


    /*Start Of Academic Deatails*/

    contentCheck.push({
        fontSize: 14,
        margin: [0, 20, 0, 0],
        table: {
            widths: ['*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: [{
                            text: 'Academic Details / ',
                            bold: true
                        }, {
                            text: 'கல்வித்தகுதி விவரங்கள் ', font: 'latha',
                        }]
                    },
                ]
            ]
        },
        layout: 'noBorders'
    })

    var tableDataAcademicDetails = [];
    tableDataAcademicDetails.push([
        {
            text: [{
                text: 'Examination / ',
                bold: true
            }, {
                text: 'தேர்வு ',
                font: 'latha',
            }],
        },
        {
            text: [{
                text: 'Registration Number / ',
                bold: true
            }, {
                text: 'பதிவு எண் ',
                font: 'latha',
            }],
        },
        {
            text: [{
                text: 'Name Of the School / College / Institute / ',
                bold: true
            }, {
                text: 'பள்ளி/கல்லூரி/பயிற்சி மையத்தின் பெயர் ',
                font: 'latha',
            }],
        },
        {
            text: [{
                text: 'Diploma/ Degree /',
                bold: true
            }, {
                text: 'பட்டயப் படிப்பு/பட்டப் படிப்பு',
                font: 'latha',
            }]
        },
        {
            text: [{
                text: 'Major Subject  / ',
                bold: true
            }, {
                text: 'முதன்மைப் பாடம் ',
                font: 'latha',
            }]
        },
        {
            text: [{
                text: 'Month/Year Of Passing  / ',
                bold: true
            }, {
                text: 'தேர்ச்சி பெற்ற மாதம் / வருடம்',
                font: 'latha',
            }]
        },
        {
            text: [{
                text: 'Name of the Board / University / ',
                bold: true
            }, {
                text: 'தேர்வுகள் குழுமம் / பல்கலைக் கழகம் ',
                font: 'latha',
            }]
        },
        {
            text: [{
                text: 'Date Of Issue Of Marksheet / Certificate / ',
                bold: true
            }, {
                text: 'மதிப்பெண் சான்றிதழ் வழங்கப்பட்ட நாள் ',
                font: 'latha',
            }]
        },
        {
            text: [{
                text: 'Medium Of Instruction  / ',
                bold: true
            }, {
                text: 'கல்வி பயிற்று மொழி ',
                font: 'latha',
            }]
        },
    ])

    //console.log(typeof dataObj.educationDtlsList);
    //console.log(dataObj.educationDtlsList.length);
    if (typeof dataObj.educationDtlsList == 'object') {
        for (var i = 0; i < dataObj.educationDtlsList.length; i++) {
            tableDataAcademicDetails.push([
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['examination']),
                        bold: true
                    }],
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['registrationNo']),
                        bold: true
                    }],
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['university']),
                        bold: true
                    }],
                },
                {
                    text: [{
                        text: dataObj.educationDtlsList[i]['degreeSubject'] == null ? " " : dataObj.educationDtlsList[i]['degreeSubject'],
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: dataObj.educationDtlsList[i]['majorSubject'] == null || dataObj.educationDtlsList[i]['majorSubject'] == '' ? " " : dataObj.educationDtlsList[i]['majorSubject'],
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['dateOfPassing']),
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['issueAuthority']),
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['dateOfIssue']),
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.educationDtlsList[i]['partTimeFullTimeSelected']),
                        bold: true
                    }]
                }
            ])
        }
    }


    contentCheck.push({
        table: {
            dontBreakRows: true, keepWithHeaderRows: 1,
            widths: ['10%', '10%', '12%', '10%', '10%', '10%', '16%', '12%', '10%'],
            headerRows: 1,
            body: tableDataAcademicDetails
        }
    });
    //console.log("ACADEMIC", JSON.parse(JSON.stringify(contentCheck)));

    /*End of Academic details*/

    // Start of SSLC

    contentCheck.push({
        margin: [0, 20, 0, 0],
        table: {
            widths: [400, '*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: ['Have you studied Tamil as a subject in SSLC? / ', {
                            text: ' நீவீர் ',
                            font: 'latha',
                        }, '10', {
                            text: 'ம் வகுப்பில் தமிழை ஒரு பாடமாக பயின்றுள்ளீரா?',
                            font: 'latha',
                        }]
                    },
                    {text: returnStringIfNull(dataObj.sslcTamil)}
                ]
            ]
        },
        layout: 'noBorders'
    })

    // End of SSLC


    // start of additional qualification
    /*
     if (dataObj.addAcademicDtlsList !== null && dataObj.addAcademicDtlsList.length > 0) {

     contentCheck.push({
     fontSize: 14,
     margin: [0, 20, 0, 0],
     table: {
     widths: ['*'],
     headerRows: 1,
     body: [
     [
     {
     text: [{
     text: 'Additional Qualifications / ',
     bold: true
     }, {
     text: 'கூடுதல் தகுதிகள் ', font: 'latha',
     }]
     },
     ]
     ]
     },
     layout: 'noBorders'
     })


     var additinalQualificationArray = [];
     additinalQualificationArray.push([
     {
     text: [{
     text: 'Examination / ',
     bold: true
     }, {
     text: 'தேர்வு ',
     font: 'latha',
     }],
     },
     {
     text: [{
     text: 'Registration Number / ',
     bold: true
     }, {
     text: 'பதிவு எண் ',
     font: 'latha',
     }],
     },
     {
     text: [{
     text: 'Name Of the School / College / Institute / ',
     bold: true
     }, {
     text: 'பள்ளி/கல்லூரி/பயிற்சி மையத்தின் பெயர் ',
     font: 'latha',
     }],
     },
     {
     text: [{
     text: 'Degree Course  / ',
     bold: true
     }, {
     text: 'பட்டப் படிப்பு ',
     font: 'latha',
     }]
     },
     {
     text: [{
     text: 'Major Subject  / ',
     bold: true
     }, {
     text: 'முதன்மைப் பாடம் ',
     font: 'latha',
     }]
     },
     {
     text: [{
     text: 'Month/Year Of Passing  / ',
     bold: true
     }, {
     text: 'தேர்ச்சி பெற்ற மாதம் / வருடம் ',
     font: 'latha',
     }]
     },
     {
     text: [{
     text: 'Name of the Board / University (Degree should be recognized by UGC)  / ',
     bold: true
     }, {
     text: 'தேர்வுகள் குழுமம் / பல்கலைக் கழகம் (பட்டப்படிப்பு பல்கலை கழக மானிய குழுவால் அங்கீகரிக்கப்பட்டிருக்க வேண்டும்) ',
     font: 'latha',
     }]
     },
     {
     text: [{
     text: 'Date Of Issue Of Marksheet / Certificate / ',
     bold: true
     }, {
     text: 'மதிப்பெண் சான்றிதழ் வழங்கப்பட்ட நாள் ',
     font: 'latha',
     }]
     },
     {
     text: [{
     text: 'Medium Of Instruction  / ',
     bold: true
     }, {
     text: 'கல்வி பயிற்று மொழி ',
     font: 'latha',
     }]
     },
     ]);

     for (var i = 0; i < dataObj.addAcademicDtlsList.length; i++) {
     additinalQualificationArray.push([
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addExam']),
     bold: true
     }],
     },
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addRegNo']),
     bold: true
     }],
     },
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addUniversity']),
     bold: true
     }],
     },
     {
     text: [{
     text: dataObj.addAcademicDtlsList[i]['addDegreeCourse'] == null ? " " : dataObj.addAcademicDtlsList[i]['addDegreeCourse'],
     bold: true
     }]
     },
     {
     text: [{
     text: dataObj.addAcademicDtlsList[i]['addMajorCourse'] == null || dataObj.addAcademicDtlsList[i]['addMajorCourse'] == '' ? " " : dataObj.addAcademicDtlsList[i]['addMajorCourse'],
     bold: true
     }]
     },
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addDateofPassing']),
     bold: true
     }]
     },
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addAuthority']),
     bold: true
     }]
     },
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addDateOfIssue']),
     bold: true
     }]
     },
     {
     text: [{
     text: returnStringIfNull(dataObj.addAcademicDtlsList[i]['addMedium']),
     bold: true
     }]
     }
     ])
     }


     contentCheck.push({
     table: {
     dontBreakRows: true, keepWithHeaderRows: 1,
     widths: ['10%', '10%', '12%', '10%', '10%', '10%', '16%', '12%', '10%'],
     headerRows: 1,
     body: additinalQualificationArray
     }
     })
     }
     */
    // end of additional qualification

    /*Start of Work Experience*/
    contentCheck.push({
        fontSize: 14,
        margin: [0, 20, 0, 0],
        table: {
            widths: ['*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: [{
                            text: 'Work Experience / ',
                            bold: true
                        }, {
                            text: 'பணியில் முன்னனுபவம்', font: 'latha',
                        }]
                    },
                ]
            ]
        },
        layout: 'noBorders'
    })

    contentCheck.push({
        table: {
            widths: [170, '*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: ['Whether you are a Government Servant / ', {
                            text: 'நீவீர் அரசு பணியில் உள்ளீரா?',
                            font: 'latha',
                        }]
                    },
                    {text: returnStringIfNull(GovtempNewVal)}
                ]
            ]
        },
        layout: 'noBorders'
    })
    if (GovtempNewVal == 'Yes') {
        contentCheck.push({
            margin: [0, 10, 0, 0],
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Department / ', {
                                text: 'துறை ',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept)}
                    ]
                ]
            },
            layout: 'noBorders'
        });
    }
    if (returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept) == "Police") {
        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Date Of Enlistment / ', {text: 'பணியில் சேர்ந்த நாள் ', font: 'latha',}]},
                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].enlistment)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: [' Service as on(11-07-2018) / ', {
                                text: 'பணியில் சேர்ந்த நாள்',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].serviceAsOn)}
                    ]
                ]
            },
            layout: 'noBorders'
        });

        if (yearVal >= '5') {
            if (specialOption != '3') {

                contentCheck.push({
                    table: {
                        widths: [170, '*'],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: [' Are you applying under departmental Quota or open quota? / ', {
                                        text: 'நீங்கள் துறை ஒதுக்கீடு அல்லது திறந்த ஒதுக்கீடு கீழ் விண்ணப்பிக்கிறீர்களா?',
                                        font: 'latha',
                                    }]
                                },
                                {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].underQuota)}
                            ]
                        ]
                    },
                    layout: 'noBorders'
                });
            }
        }

        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['GPF/CPS/RPC Number / ', {
                                text: 'பொது வருங்கால வைப்புநிதிக் கணக்கு எண்/ பங்கீட்டு ஓய்வூதியக் கணக்கு எண் ',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].gpfNumber)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {text: ['Present Rank / ', {text: 'தற்போதைய பதவி ', font: 'latha',}]},
                        {text: returnStringIfNull(dataObj.presentRank)}
                    ]
                ]
            },
            layout: 'noBorders'
        });

        contentCheck.push();

        if (returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept) != "Other") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {text: ['Present Posting at / ', {text: 'தற்போது பணிபுரியும் இடம் ', font: 'latha',}]},
                            {text: ''}
                        ]
                    ]
                },
                layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {text: ['Unit  / ', {text: 'பிரிவு ', font: 'latha',}]},
                            {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].presentPostingUnit)}
                        ]
                    ]
                },
                layout: 'noBorders'
            });
        } else {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {text: ['Present Rank / ', {text: 'தற்போதைய பதவி ', font: 'latha',}]},
                            {text: returnStringIfNull(dataObj.rank)}
                        ]
                    ]
                },
                layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {text: ['Unit  / ', {text: 'பிரிவு ', font: 'latha',}]},
                            {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].unit)}
                        ]
                    ]
                },
                layout: 'noBorders'
            });
        }
        if (dataObj.wkExperienceDtlsList[0].presentPostingUnit == "YOUTH BRIGADE" || dataObj.wkExperienceDtlsList[0].presentPostingUnit == "TALUK POLICE") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['District / City / Commissionarate  / ', {
                                    text: 'மாவட்டம்/நகரம்/மாநகரம் ',
                                    font: 'latha',
                                }]
                            },
                            {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].presentPosting)}
                        ]
                    ]
                },
                layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Police Station  / ', {
                                    text: 'மாவட்டம்/நகரம்/மாநகரம் ',
                                    font: 'latha',
                                }]
                            },
                            {text: dataObj.wkExperienceDtlsList[0].policeStation == null ? "''" : dataObj.wkExperienceDtlsList[0].policeStation}
                        ]
                    ]
                },
                layout: 'noBorders'
            })
        }

        if (dataObj.wkExperienceDtlsList[0].presentPostingUnit == "OTHER") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Please Specify Other Unit  / ', {
                                    text: 'மாவட்டம்/நகரம்/மாநகரம் ',
                                    font: 'latha',
                                }]
                            },
                            {text: dataObj.wkExperienceDtlsList[0].unitsOther == null ? "" : dataObj.wkExperienceDtlsList[0].unitsOther}
                        ]
                    ]
                },
                layout: 'noBorders'
            })
        }

        if (dataObj.wkExperienceDtlsList[0].presentPostingUnit != "YOUTH BRIGADE" && dataObj.wkExperienceDtlsList[0].presentPostingUnit != "TALUK POLICE" &&
            dataObj.wkExperienceDtlsList[0].presentPostingUnit != "POLICE HEADQUARTERS" && dataObj.wkExperienceDtlsList[0].presentPostingUnit != "OTHER" && dataObj.wkExperienceDtlsList[0].policedept != "Other") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['District / City / Commissionarate  / ', {
                                    text: 'மாவட்டம்/நகரம்/மாநகரம் ',
                                    font: 'latha',
                                }]
                            },
                            {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].presentPosting)}
                        ]
                    ]
                },
                layout: 'noBorders'
            })
        }

        if (returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept) != "Other") {

            if (returnStringIfNull(dataObj.underQuotaOption) == "1") {

                contentCheck.push({
                    table: {
                        widths: [170, '*'],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: ['Have you won any Medal in National Police Duty Meet?  / ', {
                                        text: 'தேசிய அளவிலான காவல்துறை பணி சம்மந்தப்பட்ட திறனாய்வு போட்டிகளில் பதக்கம் பெற்றுள்ளீரா? ',
                                        font: 'latha',
                                    }]
                                },
                                {text: returnStringIfNull(MedalNewVal)}
                            ]
                        ]
                    },
                    layout: 'noBorders'
                })


                if (MedalNewVal == "Yes") {
                    contentCheck.push(
                        {
                            table: {
                                widths: [170, '*'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: ['Select Year of Duty Meet  / ', {
                                                text: 'தேசிய அளவிலான காவல்துறை திறனாய்வு போட்டி வருடம்',
                                                font: 'latha',
                                            }]
                                        },
                                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].dutyYear)}
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            table: {
                                widths: [170, '*'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: ['Event Police Duty Meet  / ', {
                                                text: 'தேசிய அளவிலான காவல்துறை திறனாய்வு போட்டியில் தாங்கள் கலந்து கொண்ட நிகழ்வு',
                                                font: 'latha',
                                            }]
                                        },
                                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].event)}
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            table: {
                                widths: [170, '*'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            text: ['Type of Medal Won  / ', {
                                                text: 'வெற்றிப்பெற்ற பதக்கத்தின் வகை',
                                                font: 'latha',
                                            }]
                                        },
                                        {text: returnStringIfNull(dataObj.policeMedals)}
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        })
                }
            }
        }
    }
    if (returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept) == "Other") {
        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Present Rank  / ', {
                                text: 'தற்போதைய பதவி',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.rank)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Unit / ', {
                                text: 'பிரிவு',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.unit)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Department Name  / ', {
                                text: 'துறையின் பெயர் ',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.department)}
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }

    if (returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept) != null && returnStringIfNull(dataObj.wkExperienceDtlsList[0].policedept) != '') {

        contentCheck.push({
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['NOC File Number /', {
                                text: 'தடையில்லா சான்றின் கோப்பு எண்',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].certificateNumber)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Designation Of Issuing Authority  / ', {
                                text: 'தேசிய அளவிலான காவல்துறை திறனாய்வு போட்டியில் தாங்கள் கலந்து கொண்ட நிகழ்வு',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(designationOfIssuingAuthority)}
                    ]
                ]
            },
            layout: 'noBorders'
        }, {
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['NOC Date  / ', {
                                text: 'தேசிய அளவிலான காவல்துறை திறனாய்வு போட்டியில் தாங்கள் கலந்து கொண்ட நிகழ்வு',
                                font: 'latha',
                            }]
                        },
                        {text: returnStringIfNull(dataObj.wkExperienceDtlsList[0].nocDate)}
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }

    /*End of Work Experience*/

    /*Start of addtional details*/
    contentCheck.push({
        fontSize: 14,
        margin: [0, 20, 0, 0],
        table: {
            widths: ['*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: [{
                            text: 'Additional Details / ',
                            bold: true
                        }, {
                            text: 'கூடுதல் விவரங்கள் ', font: 'latha',
                        }]
                    },
                ]
            ]
        },
        layout: 'noBorders'
    }, {
        table: {
            widths: [170, '*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: ['Whether any Criminal case have been filed against you?  / ', {
                            text: 'உம்மீது ஏதேனும் குற்ற வழக்கு பதிவு செய்யப்பட்டுள்ளதா? ',
                            font: 'latha',
                        }]
                    },
                    {text: returnStringIfNull(dataObj.additionalDetailsBean.crime)}
                ]
            ]
        },
        layout: 'noBorders'
    })


    if (dataObj.additionalDetailsBean.crime == "Yes") {
        var tableDataCrime = [];
        tableDataCrime.push([
            {
                text: [{
                    text: 'Crime Number / Year / ',
                    bold: true
                }, {
                    text: 'குற்ற எண் / ஆண்டு ',
                    font: 'latha',
                }],
            },
            {
                text: [{
                    text: 'State / Union Territory / ',
                    bold: true
                }, {
                    text: 'மாநிலம் / யூனியன் பிரதேசம் ',
                    font: 'latha',
                }],
            },
            {
                text: [{
                    text: 'District/City / ',
                    bold: true
                }, {
                    text: 'மாவட்டம் / நகரம் ',
                    font: 'latha',
                }],
            },
            {
                text: [{
                    text: 'Police Station  / ',
                    bold: true
                }, {
                    text: 'காவல் நிலையம் ',
                    font: 'latha',
                }]
            },
            {
                text: [{
                    text: 'Current Status of the Case  / ',
                    bold: true
                }, {
                    text: 'வழக்கின் தற்போதைய நிலை ',
                    font: 'latha',
                }]
            }
        ])

        for (var i = 0; i < dataObj.additionalDetailsBean.crimeDetailList.length; i++) {
            tableDataCrime.push([
                {
                    text: [{
                        text: returnStringIfNull(dataObj.additionalDetailsBean.crimeDetailList[i]['crimeNumber']) + ' / ' + returnStringIfNull(dataObj.additionalDetailsBean.crimeDetailList[i]['dateOfCrime']),
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: returnStringIfNull(dataObj.additionalDetailsBean.crimeDetailList[i]['stateVal']),
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: dataObj.additionalDetailsBean.crimeDetailList[i]['stateVal'] != 'Tamil Nadu' ? dataObj.additionalDetailsBean.crimeDetailList[i]['districtValother'] : dataObj.additionalDetailsBean.crimeDetailList[i]['districtyDisplay'],
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: dataObj.additionalDetailsBean.crimeDetailList[i]['stateVal'] != 'Tamil Nadu' ? dataObj.additionalDetailsBean.crimeDetailList[i]['policeStationOther'] : dataObj.additionalDetailsBean.crimeDetailList[i]['policeStationDisplay'],
                        bold: true
                    }]
                },
                {
                    text: [{
                        text: dataObj.additionalDetailsBean.crimeDetailList[i]['caseStationVal'],
                        bold: true
                    }]
                },

            ])
        }

        contentCheck.push(
            {
                table: {
                    dontBreakRows: true,
                    keepWithHeaderRows: 1,
                    widths: ['20%', '20%', '20%', '20%', '20%'],
                    headerRows: 1,
                    body: tableDataCrime
                }
            })

    }


    // contentCheck.push({
    //
    //     table: {
    //         widths: [170, '*'],
    //         headerRows: 1,
    //         body: [
    //             [
    //                 {
    //                     text: ['Whether Participated in any Previous Recruitment at this Board?  / ', {
    //                         text: 'இக்குழுமத்தால் நடத்தப்பட்ட முந்தைய தேர்வுகளில் பங்குபெற்றுள்ளீரா? ',
    //                         font: 'latha',
    //                     }]
    //                 },
    //                 {text: returnStringIfNull(dataObj.additionalDetailsBean.boardName)}
    //             ]
    //         ]
    //     },
    //     layout: 'noBorders'
    // })


    // if (dataObj.additionalDetailsBean.boardName == "Yes") {
    //     contentCheck.push(
    //         {
    //             table: {
    //                 widths: [170, '*'],
    //                 headerRows: 1,
    //                 body: [
    //                     [
    //                         {
    //                             text: ['Select the Recruitments you have Participated Previously?  / ', {
    //                                 text: 'முன்னதாக பங்குபெற்ற தேர்வின் விவரங்கள் தெரிவிக்கவும்? ',
    //                                 font: 'latha',
    //                             }]
    //                         },
    //                         {text: ''}
    //                     ]
    //                 ]
    //             },
    //             layout: 'noBorders'
    //         });
    //
    //     var tableRecruitment = [];
    //     tableRecruitment.push([
    //         {
    //             text: [{
    //                 text: 'Recruitment / ',
    //                 bold: true
    //             }, {
    //                 text: 'தேர்வு ',
    //                 font: 'latha',
    //             }],
    //         },
    //         {
    //             text: [{
    //                 text: 'Enrollment Number / ',
    //                 bold: true
    //             }, {
    //                 text: 'சேர்க்கை எண் ',
    //                 font: 'latha',
    //             }],
    //             hLineColor: function (i, node) {
    //                 return (i === 0 || i === node.table.body.length) ? 'red' : 'blue';
    //             },
    //         },
    //         {
    //             text: [{
    //                 text: 'Written Test Centre / ',
    //                 bold: true
    //             }, {
    //                 text: 'எழுத்து தேர்வு மையம் ',
    //                 font: 'latha',
    //             }],
    //             hLineColor: function (i, node) {
    //                 return (i === 0 || i === node.table.body.length) ? 'red' : 'blue';
    //             },
    //         },
    //         {
    //             colSpan: 2,
    //             text: [{
    //                 text: 'Stage Cleared in the Recruitment / ',
    //                 bold: true
    //             }, {
    //                 text: 'தேர்வில் தேர்ச்சிபெற்ற நிலை ',
    //                 font: 'latha',
    //             }]
    //         },
    //         {},
    //         {
    //             colSpan: 3,
    //             text: [{
    //                 text: 'Select Special Quotas Claimed or age Relaxation Claimed Under Special Categories / ',
    //                 bold: true
    //             }, {
    //                 text: 'சிறப்பு ஒதுக்கீடு மற்றும் சிறப்பு வகைக்கான வயது வரம்பு சலுகை கோருகிறீரா ? ',
    //                 font: 'latha',
    //             }]
    //         },
    //         {}, {}
    //     ])
    //
    //     tableRecruitment.push([
    //         {},
    //         {},
    //         {},
    //         {
    //             text: [{
    //                 text: 'Stage / ',
    //                 bold: true
    //             }, {
    //                 text: 'நிலை',
    //                 font: 'latha'
    //             }]
    //         },
    //         {
    //             text: [{
    //                 text: 'Status / ',
    //                 bold: true
    //             }, {
    //                 text: 'தகுதி நிலை',
    //                 font: 'latha'
    //             }]
    //         },
    //         {
    //             text: [{
    //                 text: 'Categories / ',
    //                 bold: true
    //             }, {
    //                 text: 'பிரிவுகள்',
    //                 font: 'latha'
    //             }]
    //         },
    //         {
    //             text: [{
    //                 text: 'Sub Categories / ',
    //                 bold: true
    //             }, {
    //                 text: 'உட்பிரிவுகள்',
    //                 font: 'latha'
    //             }]
    //         },
    //         {
    //             text: [{
    //                 text: 'Sub Categories 2 / ',
    //                 bold: true
    //             }, {
    //                 text: 'உட்பிரிவுகள்',
    //                 font: 'latha'
    //             }]
    //         },
    //     ])
    //
    //
    //     console.log(dataObj.additionalDetailsBean.examName);
    //     console.log(dataObj.additionalDetailsBean.examName1);
    //     console.log(dataObj.additionalDetailsBean.examName2);
    //     console.log(dataObj.additionalDetailsBean.examName3);
    //     console.log(dataObj.additionalDetailsBean.examName4);
    //     console.log(dataObj.additionalDetailsBean.examName5);
    //     console.log(dataObj.additionalDetailsBean.examName6);
    //     if (dataObj.additionalDetailsBean.examName != null) {
    //         tableRecruitment.push([
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examName == null ? '' : dataObj.additionalDetailsBean.examName,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.enrollmentNo == null ? '' : dataObj.additionalDetailsBean.enrollmentNo,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examCenterName == null ? '' : dataObj.additionalDetailsBean.examCenterName,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageName == null ? '' : dataObj.additionalDetailsBean.stageName,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageLevelName == null ? '' : dataObj.additionalDetailsBean.stageLevelName,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryName == null ? '' : dataObj.additionalDetailsBean.categoryName,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryLevelName == null ? '' : dataObj.additionalDetailsBean.categoryLevelName,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categorySportsName == null ? '' : dataObj.additionalDetailsBean.categorySportsName,
    //                     bold: true
    //                 }]
    //             },
    //         ])
    //     }
    //     if (dataObj.additionalDetailsBean.examName2 != null) {
    //         tableRecruitment.push([
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examName2 == null ? '' : dataObj.additionalDetailsBean.examName2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.enrollmentNo2 == null ? '' : dataObj.additionalDetailsBean.enrollmentNo2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examCenterName2 == null ? '' : dataObj.additionalDetailsBean.examCenterName2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageName2 == null ? '' : dataObj.additionalDetailsBean.stageName2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageLevelName2 == null ? '' : dataObj.additionalDetailsBean.stageLevelName2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryName2 == null ? '' : dataObj.additionalDetailsBean.categoryName2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryLevelName2 == null ? '' : dataObj.additionalDetailsBean.categoryLevelName2,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categorySportsName2 == null ? '' : dataObj.additionalDetailsBean.categorySportsName2,
    //                     bold: true
    //                 }]
    //             },
    //         ])
    //     }
    //     if (dataObj.additionalDetailsBean.examName3 != null) {
    //         tableRecruitment.push([
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examName3 == null ? '' : dataObj.additionalDetailsBean.examName3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.enrollmentNo3 == null ? '' : dataObj.additionalDetailsBean.enrollmentNo3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examCenterName3 == null ? '' : dataObj.additionalDetailsBean.examCenterName3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageName3 == null ? '' : dataObj.additionalDetailsBean.stageName3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageLevelName3 == null ? '' : dataObj.additionalDetailsBean.stageLevelName3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryName3 == null ? '' : dataObj.additionalDetailsBean.categoryName3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryLevelName3 == null ? '' : dataObj.additionalDetailsBean.categoryLevelName3,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categorySportsName3 == null ? '' : dataObj.additionalDetailsBean.categorySportsName3,
    //                     bold: true
    //                 }]
    //             },
    //         ])
    //     }
    //     if (dataObj.additionalDetailsBean.examName4 != null) {
    //         tableRecruitment.push([
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examName4 == null ? '' : dataObj.additionalDetailsBean.examName4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.enrollmentNo4 == null ? '' : dataObj.additionalDetailsBean.enrollmentNo4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examCenterName4 == null ? '' : dataObj.additionalDetailsBean.examCenterName4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageName4 == null ? '' : dataObj.additionalDetailsBean.stageName4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageLevelName4 == null ? '' : dataObj.additionalDetailsBean.stageLevelName4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryName4 == null ? '' : dataObj.additionalDetailsBean.categoryName4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryLevelName4 == null ? '' : dataObj.additionalDetailsBean.categoryLevelName4,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categorySportsName4 == null ? '' : dataObj.additionalDetailsBean.categorySportsName4,
    //                     bold: true
    //                 }]
    //             },
    //         ])
    //     }
    //     if (dataObj.additionalDetailsBean.examName5 != null) {
    //         tableRecruitment.push([
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examName5 == null ? '' : dataObj.additionalDetailsBean.examName5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.enrollmentNo5 == null ? '' : dataObj.additionalDetailsBean.enrollmentNo5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examCenterName5 == null ? '' : dataObj.additionalDetailsBean.examCenterName5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageName5 == null ? '' : dataObj.additionalDetailsBean.stageName5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageLevelName5 == null ? '' : dataObj.additionalDetailsBean.stageLevelName5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryName5 == null ? '' : dataObj.additionalDetailsBean.categoryName5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryLevelName5 == null ? '' : dataObj.additionalDetailsBean.categoryLevelName5,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categorySportsName5 == null ? '' : dataObj.additionalDetailsBean.categorySportsName5,
    //                     bold: true
    //                 }]
    //             },
    //         ])
    //     }
    //     if (dataObj.additionalDetailsBean.examName6 != null) {
    //         tableRecruitment.push([
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examName6 == null ? '' : dataObj.additionalDetailsBean.examName6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.enrollmentNo6 == null ? '' : dataObj.additionalDetailsBean.enrollmentNo6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.examCenterName6 == null ? '' : dataObj.additionalDetailsBean.examCenterName6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageName6 == null ? '' : dataObj.additionalDetailsBean.stageName6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.stageLevelName6 == null ? '' : dataObj.additionalDetailsBean.stageLevelName6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryName6 == null ? '' : dataObj.additionalDetailsBean.categoryName6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categoryLevelName6 == null ? '' : dataObj.additionalDetailsBean.categoryLevelName6,
    //                     bold: true
    //                 }]
    //             },
    //             {
    //                 text: [{
    //                     text: dataObj.additionalDetailsBean.categorySportsName6 == null ? '' : dataObj.additionalDetailsBean.categorySportsName6,
    //                     bold: true
    //                 }]
    //             },
    //         ])
    //     }
    //
    //
    //     contentCheck.push({
    //         table: {
    //             dontBreakRows: true,keepWithHeaderRows: 1,
    //             widths: ['10%', '10%', '10%', '10%', '20%', '10%', '10%', '20%'],
    //             headerRows: 1,
    //             body: tableRecruitment
    //         }
    //     });
    // }


    // documents start here

    contentCheck.push({
        fontSize: 14,
        margin: [0, 20, 0, 0],
        table: {
            widths: ['*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: [{
                            text: 'Documents / ',
                            bold: true
                        }, {
                            text: 'ஆவணங்கள்', font: 'latha',
                        }]
                    },
                ]
            ]
        },
        layout: 'noBorders'
    });

    var contentDATA = ["Gender Certificate(Third Gender)",
        "Community Certificate",
        "10th / SSLC Certificate",
        "PSTM Certificate",
        "XII / HSC / ITI Certificate",
        "Diploma Certificate",
        "Graduation Degree Certificate",
        "PG Degree Certificate",
        "Post Graduation Degree Certificate",
        "NOC (For Department)",
        "BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years",
        "B.E. degree in Electronics and Communication Engineering - 4 years",
        "B.E or B.Tech degree in Computer Science or I.T - 4 years",
        "Post Graduate Diploma in Computer application - 1 year",
        "M.E or M.Tech degree in Communication Systems - 2 years",
        "M.E. or M.Tech. degree in Computer Science or I.T. - 2 years",
        "MCA - 3 years",
        "Medal Certificate (For Department)",
        "Highest Sports Certificate",
        "Highest Certificate For NCC",
        "Highest Certificate For NSS",
        "Destitute Widow Certificate",
        "Discharged / to be discharged certificate",
        "Gender Certificate(Transgender)"
    ];

    function getString(string) {
        for (var i = 0; i < contentDATA.length; i++) {
            if (string.indexOf(contentDATA[i]) == 0) {
                return contentTamil[contentDATA[i]];
                break;
            }
        }
        return false;
    }

    var contentTamil = {
        "Gender Certificate(Third Gender)": {
            text: ['Gender Certificate(Third Gender) / ', {
                text: 'திருநங்கைக்கான சான்றிதழ் ',
                font: 'latha',
            }]
        },
        "Community Certificate": {text: ['Community Certificate / ', {text: 'சாதிச்சான்றிதழ் ', font: 'latha',}]},
        "10th / SSLC Certificate": {
            text: ['10th / SSLC Certificate/ 10 / SSLC ', {
                text: 'சான்றிதழ் ',
                font: 'latha',
            }]
        },
        "PSTM Certificate": {
            text: ['PSTM Certificate / ', {
                text: 'தமிழ் பயிற்று மொழியில் படித்ததற்கானச் சான்றிதழ் ',
                font: 'latha',
            }]
        },
        "XII / HSC / ITI Certificate": {
            text: [' XII / HSC / ITI Certificate/ XII / HSC / ITI / ', {
                text: 'சான்றிதழ்',
                font: 'latha',
            }]
        },
        "Diploma Certificate": {
            text: ['Diploma Certificate / ', {
                text: 'பட்டயப்படிப்பு சான்றிதழ்',
                font: 'latha',
            }]
        },
        "Graduation Degree Certificate": {
            text: ['Graduation Degree Certificate / ', {
                text: 'இளங்கலை பட்டப்படிப்பு சான்றிதழ் ',
                font: 'latha',
            }]
        },
        "PG Degree Certificate": {
            text: ['PG Degree Certificate / ', {
                text: 'முதுகலை பட்டப்படிப்பு சான்றிதழ் ',
                font: 'latha',
            }]
        },
        "Post Graduation Degree Certificate": {
            text: ['Post Graduation Degree Certificate / ', {
                text: 'முதுகலை பட்டப்படிப்பு சான்றிதழ் ',
                font: 'latha',
            }]
        },
        "NOC (For Department)": {
            text: ['NOC (For Department) / ', {
                text: 'தடையில்லா சான்றிதழ்',
                font: 'latha',
            }]
        },
        "BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years": {
            text: ['BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years']
        },
        "B.E. degree in Electronics and Communication Engineering - 4 years": {
            text: ['B.E. degree in Electronics and Communication Engineering - 4 years']
        },
        "B.E or B.Tech degree in Computer Science or I.T - 4 years": {
            text: ['B.E or B.Tech degree in Computer Science or I.T - 4 years']
        },
        "Post Graduate Diploma in Computer application - 1 year": {
            text: ['Post Graduate Diploma in Computer application - 1 year']
        },
        "M.E or M.Tech degree in Communication Systems - 2 years": {
            text: ['M.E or M.Tech degree in Communication Systems - 2 years']
        },
        "M.E. or M.Tech. degree in Computer Science or I.T. - 2 years": {
            text: ['M.E. or M.Tech. degree in Computer Science or I.T. - 2 years']
        },
        "MCA - 3 years": {
            text: ['MCA - 3 years']
        },
        "Medal Certificate (For Department)": {
            text: ['Medal Certificate (For Department) /', {
                text: 'பதக்கச் சான்றிதழ்',
                font: 'latha',
            }]
        },
        "Highest Sports Certificate": {
            text: ['Highest Sports Certificate /', {
                text: 'உயர்ந்தபட்ச விளையாட்டு',
                font: 'latha',
            }]
        }, "Highest Certificate For NCC": {
            text: ['Highest Certificate For NCC /', {
                text: 'உயர்ந்தபட்ச சான்றிதழ் தேசிய மாணவர் படை',
                font: 'latha',
            }]
        }, "Highest Certificate For NSS": {
            text: ['Highest Certificate For NSS /', {
                text: 'உயர்ந்தபட்ச சான்றிதழ் நாட்டு நலப்பணித் திட்டம்',
                font: 'latha',
            }]
        }, "Destitute Widow Certificate": {
            text: ['Destitute Widow Certificate /', {
                text: 'ஆதரவற்ற விதவைக்கான சான்றிதழ்',
                font: 'latha',
            }]
        }, "Discharged / to be discharged certificate": {
            text: ['Discharged / to be discharged certificate', {
                text: 'பணியிலிருந்து விடுவிக்கப்பட்ட நாள்',
                font: 'latha',
            }]
        }, "Gender Certificate(Transgender)": {
            text: ['Gender Certificate(Transgender)', {
                text: 'திருநங்கைக்கான சான்றிதழ்',
                font: 'latha',
            }]
        }
    };

    for (var i = 0; i < dataObj.uploadList.length; i++) {


        //console.log("LABEL", dataObj.uploadList[i]['docLabel1']);
        //console.log("VERIFY ", dataObj.uploadList[i]['docVerify1']);
        //console.log("FILENMAE", dataObj.uploadList[i]['documentFileName1']);
        //console.log("OCD", dataObj.uploadList[i]['ocdFlagValue']);

        let text = JSON.parse(JSON.stringify(getString(dataObj.uploadList[i]['docLabel1'])));
        //console.log("TEXT", text);
        if (text != false) {
            //console.log("Text Found ", text);
        } else {
            //console.log("Text not Found ", false);
        }

        if (dataObj.uploadList[i]['ocdFlagValue'].indexOf("ADD") > -1) {
            var additionalText = dataObj.uploadList[i]['docLabel1'].split("for ");
            ////console.log("ADDITIONAL TEXT", additionalText);
            text.text.push(" for " + additionalText[1]);
        }
        // console.log(text);
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        text,
                        {text: dataObj.uploadList[i]['documentFileName1'] == null ? '' : dataObj.uploadList[i]['documentFileName1']},
                        {text: dataObj.uploadList[i]['docVerify1'] == null ? (dataObj.afterApplyVeiwPayment != null && dataObj.afterApplyVeiwPayment == "true" ? 'Confirmed' : '') : dataObj.uploadList[i]['docVerify1']},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }

    if (dataObj.docLabelNSS != null && dataObj.additionalDetailsBean.nssCertificate == "Yes") {
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Highest Certificate(For NSS) / ', {
                                text: ' உயர்ந்தபட்ச சான்றிதழ் (நாட்டு நலப்பணித் திட்டம்) ',
                                font: 'latha',
                            }]
                        },
                        {text: dataObj.documentFileNameNSS},
                        {text: 'Confirmed'},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }


    if (dataObj.docLabelNCC != null && dataObj.additionalDetailsBean.nccCertificate == "Yes") {
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Highest Certificate(For NCC) / ', {
                                text: ' உயர்ந்தபட்ச சான்றிதழ் (தேசிய மாணவர் படை) ',
                                font: 'latha',
                            }]
                        },
                        {text: dataObj.documentFileNameNCC},
                        {text: 'Confirmed'},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }
    if (dataObj.docLabelSports2 != null && dataObj.additionalDetailsBean.sportsQuaota == "Yes") {
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Form I /Form II/ Form III/ District Level Participation Certificate / ', {
                                text: ' படிவம்-',
                                font: 'latha',
                            }, 'I /', {
                                text: ' படிவம்-',
                                font: 'latha',
                            }, 'II /', {
                                text: ' படிவம்-',
                                font: 'latha',
                            }, 'III /', {
                                text: 'மாவட்ட அளவில் கலந்து கொண்டதிற்கான சான்றிதழ்',
                                font: 'latha'
                            }]
                        },
                        {text: dataObj.documentFileNameSports2},
                        {text: 'Confirmed'},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }
    if (dataObj.docLabelSports != null) {
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Latest Form I Or Form II Or Form III Certificate / ', {
                                text: ' சமீபத்திய விளையாட்டுப் படிவம்-I /படிவம்- II/படிவம்- III சான்றிதழ் ',
                                font: 'latha',
                            }, {
                                text: ' சமீபத்திய விளையாட்டுப் படிவம்-',
                                font: 'latha',
                            }, 'I /', {
                                text: ' படிவம்- ',
                                font: 'latha',
                            }, 'II /', {
                                text: ' படிவம்- ',
                                font: 'latha',
                            }, 'III /', {
                                text: 'சான்றிதழ் '
                            }]
                        },
                        {text: dataObj.documentFileNameSports},
                        {text: 'Confirmed'},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }
    if (dataObj.docLabelDischarge != null && dataObj.additionalDetailsBean.exServiceman == "Yes") {
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Discharged / to be discharged certificate / ', {
                                text: ' பணியிலிருந்து விடுவிக்கப்பட்ட / விடுவிக்கப்படுவதற்கான சான்றிதழ்  ',
                                font: 'latha',
                            }]
                        },
                        {text: dataObj.documentFileNameDischarge},
                        {text: 'Confirmed'},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }
    /* if (dataObj.docLabelWard != null && dataObj.additionalDetailsBean.wardsQuaota == "Yes") {
     contentCheck.push({
     table: {
     widths: [190, 170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Ward Certificate / ', {
     text: ' வாரிசுச் சான்றிதழ் ',
     font: 'latha',
     }]
     },
     {text: dataObj.documentFileNameWard},
     {text: 'Confirmed'},
     ]
     ]
     },
     layout: 'noBorders'
     })
     }*/
    if (dataObj.docLabelWidow != null && dataObj.additionalDetailsBean.widow == "Yes") {
        contentCheck.push({
            table: {
                widths: [190, 170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Destitute Widow Certificate / ', {
                                text: 'ஆதரவற்ற விதவைக்கான சான்றிதழ்',
                                font: 'latha',
                            }]
                        },
                        {text: dataObj.documentFileNameWidow},
                        {text: 'Confirmed'},
                    ]
                ]
            },
            layout: 'noBorders'
        })
    }


    /*if (returnStringIfNull(dataObj.disciplineType) == "14" && returnStringIfNull(dataObj.additionalDetailsBean.arpdepartmentQuaota) == "Yes") {
     contentCheck.push({
     table: {
     widths: [190, 170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Department Quota Details in Age Relaxation / ', {
     text: ' உயர்ந்தபட்ச சான்றிதழ் (நாட்டு நலப்பணித் திட்டம்) ',
     font: 'latha',
     }]
     },
     {text: dataObj.deptageDataFileName},
     {text: 'Confirmed'},
     ]
     ]
     },
     layout: 'noBorders'
     })
     }

     if (returnStringIfNull(dataObj.disciplineType) == "14" && returnStringIfNull(dataObj.additionalDetailsBean.departmentQuaota) == "Yes") {
     contentCheck.push({
     table: {
     widths: [190, 170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Department Quota Details / ', {
     text: ' உயர்ந்தபட்ச சான்றிதழ் (நாட்டு நலப்பணித் திட்டம்) ',
     font: 'latha',
     }]
     },
     {text: dataObj.quotaData8FileName},
     {text: 'Confirmed'},
     ]
     ]
     },
     layout: 'noBorders'
     })
     }
     */
    /*    if (returnStringIfNull(dataObj.disciplineType) == "14" && returnStringIfNull(dataObj.additionalDetailsBean.extraQualification) == "Yes") {
     contentCheck.push({
     table: {
     widths: [190, 170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Additional marks for extra qualification / ', {
     text: ' உயர்ந்தபட்ச சான்றிதழ் (நாட்டு நலப்பணித் திட்டம்) ',
     font: 'latha',
     }]
     },
     {text: dataObj.uploadExtraQualificationFileName},
     {text: 'Confirmed'},
     ]
     ]
     },
     layout: 'noBorders'
     })
     }*/

    // documents end here

    function checkEmaptyIfNull(string) {
        return string == null ? ' ' : string;
    }

    /*Start of Age Details

     if (((dataObj.additionalDetailsBean.exServiceman != null && dataObj.additionalDetailsBean.exServiceman != "") ||
     (dataObj.additionalDetailsBean.widow != null && dataObj.additionalDetailsBean.widow != "")
     || (dataObj.additionalDetailsBean.arpdepartmentQuaota != null && dataObj.additionalDetailsBean.arpdepartmentQuaota != "")) &&
     dataObj.additionalDetailsBean.ageflag == true) {

     contentCheck.push(
     {
     fontSize: 14,
     margin: [0, 20, 0, 0],
     table: {
     widths: ['*'],
     headerRows: 1,
     body: [
     [
     {
     text: [{
     text: 'Age Relaxation Details / ',
     bold: true
     }, {
     text: 'வயது வரம்பு சலுகை விவரங்கள் ', font: 'latha',
     }]
     },
     ]
     ]
     },
     layout: 'noBorders'
     })


     if (dataObj.additionalDetailsBean.exServiceman != null && dataObj.additionalDetailsBean.exServiceman != '' && dataObj.additionalDetailsBean.ageExflag == true) {

     contentCheck.push(
     {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Are you an Ex-Servicemen/Ex-Servicewomen or presently serving (going to retire within one year)? / ', {
     text: ' நீவிர் முன்னாள் இராணுவத்தினரா அல்லது தற்போது பணியில் உள்ளீரா? (பணியிலிருந்து ஓராண்டிற்குள் விடுவிக்கப்படுபவர்)*',
     font: 'latha',
     }]
     },
     [
     {text: checkEmaptyIfNull(dataObj.additionalDetailsBean.exServiceman), bold: true}
     ],
     ]
     ]
     },
     layout: 'noBorders'
     })
     if (dataObj.additionalDetailsBean.exServiceman == 'Yes') {
     contentCheck.push({

     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Service Number /  ', {
     text: 'சேவை எண் ',
     font: 'latha',
     }]
     },
     [
     {text: checkEmaptyIfNull(dataObj.additionalDetailsBean.serviceNumber), bold: true}
     ],
     ]
     ]
     },
     layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Date of Enlistment/ ', {
     text: 'பணியில் சேர்ந்த நாள்  ',
     font: 'latha',
     }]
     },
     [
     {
     text: checkEmaptyIfNull(dataObj.additionalDetailsBean.dateOfEnlistment),
     bold: true
     }
     ],
     ]
     ]
     },
     layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Date of Discharge /  to be discharged ', {
     text: 'பணியிலிருந்து விடுவிக்கப்பட்ட / விடுவிக்கப்படும் நாள்   ',
     font: 'latha',
     }]
     },
     [
     {text: checkEmaptyIfNull(dataObj.additionalDetailsBean.dateOfDischarge), bold: true}
     ],
     ]
     ]
     },
     layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Certificate Number / ', {
     text: 'சான்றிதழ் எண் ',
     font: 'latha',
     }]
     },
     [
     {
     text: checkEmaptyIfNull(dataObj.additionalDetailsBean.exCertificateNumber),
     bold: true
     }
     ],
     ]
     ]
     },
     layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Designation Of Issuing Authority /', {
     text: ' சான்றிதழ் வழங்கிய அதிகாரி ',
     font: 'latha',
     }]
     },
     [
     {
     text: checkEmaptyIfNull(dataObj.additionalDetailsBean.exCertIssuingAuthority),
     bold: true
     }
     ],
     ]
     ]
     },
     layout: 'noBorders'
     });
     }
     }


     if (dataObj.genderValDesc == "Female" && dataObj.mariatalStatus != "Married" && dataObj.additionalDetailsBean.widow != null && dataObj.additionalDetailsBean.widow != '' && dataObj.additionalDetailsBean.ageWidowflag == true) {

     contentCheck.push(
     {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Are You A Destitute Widow ?  / ', {
     text: 'நீங்கள் ஆதரவற்ற விதவையா? ',
     font: 'latha',
     }]
     },
     [
     {text: returnStringIfNull(dataObj.additionalDetailsBean.widow), bold: true}
     ],
     ]
     ]
     }, layout: 'noBorders'
     })
     if (dataObj.additionalDetailsBean.widow == 'Yes') {
     contentCheck.push(
     {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Name Of Late Husband / ', {
     text: 'கணவரின் பெயர்(காலமானவர்) ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.nameOfLateHusband),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Date Of Death / ', {
     text: 'இறந்த தேதி ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfDeath),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Certificate Number / ', {
     text: 'சான்றிதழ் எண் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.deathCertificateNumber),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Designation Of Issuing Authority /  ', {
     text: 'சான்றிதழ் வழங்கிய அதிகாரி',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.deathCertIssuingAuthority),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Date Of Issue Of The Certificate  /  ', {
     text: 'சான்றிதழ் வழங்கப்பட்ட தேதி ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfdeathCertificate),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }
     )
     }

     }

     //Dept Quota age relaxation
     if (returnStringIfNull(dataObj.disciplineType) == "14" && dataObj.additionalDetailsBean.arpdepartmentQuaota != null && dataObj.additionalDetailsBean.ageDeptFlag == true) {
     contentCheck.push({
     margin: [0, 20, 0, 0],
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Would You Like To Avail Department Quota? / ', {
     text: 'நீவிர் நாட்டு நலப்பணித்திட்டத்தின் சான்றிதழ் வைத்துள்ளீரா ?',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdepartmentQuaota),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     });

     if (returnStringIfNull(dataObj.additionalDetailsBean.arpdepartmentQuaota) == "Yes") {
     contentCheck.push({
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Date Of Enlistment / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_dateOfEnlistment),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Service as on(Date of Notification) / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_serviceAsOn),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Present Rank / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_presentRank),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     })


     if (returnStringIfNull(dataObj.additionalDetailsBean.arpdeptpresentPostingUnit) == "OTHER") {
     contentCheck.push({
     table: {
     widths: [170, 170, 170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Present Posting - Unit / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdeptpresentPostingUnit),
     bold: true
     }
     ],
     {
     text: ['Other Unit / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_unitsOther),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     })
     } else if (returnStringIfNull(dataObj.additionalDetailsBean.arpdeptpresentPostingUnit) != "") {
     contentCheck.push({
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Present Posting - Unit / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdeptpresentPostingUnit),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     })
     }

     if (returnStringIfNull(dataObj.additionalDetailsBean.arpdept_presentPosting) != "") {
     contentCheck.push({
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Present Posting - District / City / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpPolicCityDesc),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     })
     }

     if (returnStringIfNull(dataObj.additionalDetailsBean.arpdept_policeStation) != "") {
     contentCheck.push({
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Present Posting - Police Station / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpPoliceStationDesc),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     })
     }

     contentCheck.push({
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['GPF/CPS/RPC Number / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_gpsNumber),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Certificate Number / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_CertificateNumber),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['Designation Of Issuing Authority / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_CertIssuingAuthority),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     }, {
     table: {
     widths: [170, '*'],
     headerRows: 1,
     body: [
     [
     {
     text: ['NOC Date / ', {
     text: 'உயர்ந்தபட்ச சான்றிதழ் ',
     font: 'latha',
     }]
     },
     [
     {
     text: returnStringIfNull(dataObj.additionalDetailsBean.arpdept_NocDate),
     bold: true
     }
     ],
     ]
     ]
     }, layout: 'noBorders'
     })

     }

     }

     }

     End of Age Details  */

    /* Start of Quotas */

    contentCheck.push(
        {
            fontSize: 14,
            table: {
                widths: ['*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: [{
                                text: 'Special Mark/ ',
                                bold: true
                            }, {
                                text: 'சிறப்பு மதிப்பெண்கள்', font: 'latha',
                            }, {
                                text: ' & Age Relaxation/ ',
                                bold: true
                            }, {
                                text: 'வயது தளர்வு', font: 'latha',
                            }]
                        },
                    ]
                ]
            }, layout: 'noBorders'
        }
    )


    if ((dataObj.getAgeQuotaDetailsRadioChk != null && dataObj.getAgeQuotaDetailsRadioChk != '3') || (dataObj.underQuotaOption != null && dataObj.underQuotaOption != '1')) {


        if (dataObj.additionalDetailsBean.nccCertificate != null) {
            contentCheck.push({
                margin: [0, 20, 0, 0],
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Are You Possessing NCC A/B/C Certificates ?  / ', {
                                    text: 'நீவிர் தேசிய மாணவர் படையின்  ',
                                    font: 'latha',
                                }, 'A / B / C ', {
                                    text: 'சான்றிதழ்களை வைத்துள்ளீரா ? ',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.nccCertificate), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            });

        }

        if (dataObj.additionalDetailsBean.nssCertificate != null) {
            contentCheck.push({
                margin: [0, 20, 0, 0],
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Are You Possessing NSS Certificates ? / ', {
                                    text: 'நீவிர் நாட்டு நலப்பணித்திட்டத்தின் சான்றிதழ் வைத்துள்ளீரா ?',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.nssCertificate), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            });
        }
        if (dataObj.additionalDetailsBean.sportsQuaota != null) {
            contentCheck.push({
                margin: [0, 20, 0, 0],
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Would You Like To Avail Special Marks For Sports? /', {
                                    text: 'விளையாட்டிற்கான சிறப்பு மதிப்பெண்கள் பெற உங்களுக்கு விருப்பமா?',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.sportsQuaota), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            });

        }

    }

    // end  of Displaying heading for Dept when selected No on Quota Details Page and filed work exp yes as police

    if (dataObj.getAgeQuotaDetailsRadioChk != null && dataObj.getAgeQuotaDetailsRadioChk == "1") {
        contentCheck.push({
            margin: [0, 20, 0, 0],
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Are you an Ex-Servicemen or presently serving (going to retire within one year)? /', {
                                text: 'நீவிர் முன்னாள் இராணுவத்தினரா அல்லது தற்போது பணியில் உள்ளீரா? (பணியிலிருந்து ஓராண்டிற்குள் விடுவிக்கப்படுபவர்)',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(dataObj.additionalDetailsBean.exServiceman), bold: true}
                        ],
                    ]
                ]
            }, layout: 'noBorders'
        });

        if (returnStringIfNull(dataObj.additionalDetailsBean.exServiceman) == "Yes") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Service Number / ', {
                                    text: 'சேவை எண்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.serviceNumber), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Date Of Enlistment / ', {
                                    text: 'பணியில் சேர்ந்த நாள்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfEnlistment), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Date of Discharge / to be discharged / ', {
                                    text: 'பணியிலிருந்து விடுவிக்கப்பட்ட / விடுவிக்கப்படும் நாள்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfDischarge), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Certificate Number / ', {
                                    text: 'சான்றிதழ் எண்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.exCertificateNumber),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Designation Of Issuing Authority / ', {
                                    text: 'சான்றிதழ் வழங்கிய அதிகாரி',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.exCertIssuingAuthority),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }
    }
    if (dataObj.getAgeQuotaDetailsRadioChk != null && dataObj.getAgeQuotaDetailsRadioChk == "4") {
        contentCheck.push({
            margin: [0, 20, 0, 0],
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Are you an Ex-Servicewomen or presently serving (going to retire within one year)? /', {
                                text: 'நீவிர் முன்னாள் இராணுவத்தினரா அல்லது தற்போது பணியில் உள்ளீரா? (பணியிலிருந்து ஓராண்டிற்குள் விடுவிக்கப்படுபவர்)',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(dataObj.additionalDetailsBean.exServiceWoman), bold: true}
                        ],
                    ]
                ]
            }, layout: 'noBorders'
        });

        if (returnStringIfNull(dataObj.additionalDetailsBean.exServiceWoman) == "Yes") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Service Number / ', {
                                    text: 'சேவை எண்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.serviceNumber), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Date Of Enlistment / ', {
                                    text: 'பணியில் சேர்ந்த நாள்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfEnlistment), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Date of Discharge / to be discharged / ', {
                                    text: 'பணியிலிருந்து விடுவிக்கப்பட்ட / விடுவிக்கப்படும் நாள்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfDischarge), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Certificate Number / ', {
                                    text: 'சான்றிதழ் எண்',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.exCertificateNumber),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Designation Of Issuing Authority / ', {
                                    text: 'சான்றிதழ் வழங்கிய அதிகாரி',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.exCertIssuingAuthority),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }
    }

    if (dataObj.getAgeQuotaDetailsRadioChk != null && dataObj.getAgeQuotaDetailsRadioChk == "2") {
        contentCheck.push({
            margin: [0, 20, 0, 0],
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Are You A Destitute Widow ? /', {
                                text: 'நீங்கள் ஆதரவற்ற விதவையா?',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(dataObj.additionalDetailsBean.widow), bold: true}
                        ],
                    ]
                ]
            }, layout: 'noBorders'
        });

        if (returnStringIfNull(dataObj.additionalDetailsBean.widow) == "Yes") {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Name Of Late Husband / ', {
                                    text: 'கணவரின் பெயர்(காலமானவர்)',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.nameOfLateHusband), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Date Of Death / ', {
                                    text: 'இறந்த தேதி',
                                    font: 'latha',
                                }]
                            },
                            [
                                {text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfDeath), bold: true}
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Destitute Widow Certificate Number / ', {
                                    text: 'ஆதரவற்ற விதவைக்கான சான்றிதழ் எண்.',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.deathCertificateNumber),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Designation Of Issuing Authority / ', {
                                    text: 'சான்றிதழ் வழங்கிய அதிகாரி',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.deathCertIssuingAuthority),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            }, {
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ['Date Of Issue Of Certificate / ', {
                                    text: 'சான்றிதழ் வழங்கப்பட்ட தேதி',
                                    font: 'latha',
                                }]
                            },
                            [
                                {
                                    text: returnStringIfNull(dataObj.additionalDetailsBean.dateOfdeathCertificate),
                                    bold: true
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }
    }


    //Additional Qualification
    if (dataObj.additionalDetailsBean.extraQualification != null) {
        contentCheck.push({
            margin: [0, 20, 0, 0],
            table: {
                widths: [170, '*'],
                headerRows: 1,
                body: [
                    [
                        {
                            text: ['Would you like to avail additional marks for extra qualification. / ', {
                                text: 'மிகை கல்வித் தகுதிக்கான கூடுதல் மதிப்பெண்கள் பெற உங்களுக்கு விருப்பமா?',
                                font: 'latha',
                            }]
                        },
                        [
                            {text: returnStringIfNull(dataObj.additionalDetailsBean.extraQualification), bold: true}
                        ],
                    ]
                ]
            }, layout: 'noBorders'
        });

        if (dataObj.additionalDetailsBean.qualBEExtc) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {
                                    text: ['B.E. degree in Electronics and Communication Engineering - 4 years ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

        if (dataObj.additionalDetailsBean.qualBscCSBscIT) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {

                                    text: ['BCA/B.Sc. degree in Computer Science or B.Sc. IT - 3 years  ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

        if (dataObj.additionalDetailsBean.qualBEBTechCSIT) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {

                                    text: ['B.E or B.Tech degree in Computer Science or I.T - 4 years  ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

        if (dataObj.additionalDetailsBean.qualPGCA) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {

                                    text: ['Post Graduate Diploma in Computer application - 1 year  ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

        if (dataObj.additionalDetailsBean.qualMEMTechCommSys) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {

                                    text: ['M.E or M.Tech degree in Communication Systems - 2 years  ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

        if (dataObj.additionalDetailsBean.qualMEMTechCSIT) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {

                                    text: ['M.E. or M.Tech. degree in Computer Science or I.T. - 2 years  ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

        if (dataObj.additionalDetailsBean.qualMCA) {
            contentCheck.push({
                table: {
                    widths: [170, '*'],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: ''
                            },
                            [
                                {

                                    text: ['MCA - 3 years ']
                                }
                            ],
                        ]
                    ]
                }, layout: 'noBorders'
            })
        }

    }


    // declaration starts here
    contentCheck.push({
        margin: [0, 20, 0, 0],
        text: 'Declaration:',
        fontSize: '12',
        bold: true
    });
    contentCheck.push({
        table: {
            widths: ['*'],
            headerRows: 1,
            body: [
                [
                    {
                        text: ['I HEREBY DECLARE THAT ALL THE PARTICULARS FURNISHED BY ME IN THIS APPLICATION ARE TRUE, CORRECT AND COMPLETE TO THE BEST OF MY KNOWLEDGE AND BELIEF. IN THE EVENT OF ANY INFORMATION BEING FOUND FALSE OR INCORRECT OR INELIGIBILITY BEING DETECTED BEFORE OR AFTER THE EXAMINATION, MY CANDIDATURE WILL BE CANCELLED. / ', {
                            text: 'இவ்விண்ணப்பத்தில் நான் அளித்துள்ள அனைத்து விவரங்களும் உண்மையானது, சரியானது மற்றும் முழுமையானது என்று என் அறிவுக்கு தெரிந்த வகையில் நம்பகத் தன்மையுடன் தெரிவித்துக்கொள்கிறேன். மேலும் நான் அளித்துள்ள விவரங்கள் பொய்யானது அல்லது தவறானது அல்லது தகுதியற்றது என தேர்வுக்கு முன்னரோ, பின்னரோ கண்டறியப்பட்டால் என்னுடைய விண்ணப்பதாரர் நிலை ரத்து செய்யப்படும் என்பதையும் அறிவேன்.',
                            font: 'latha',
                        }]
                    }
                ]
            ]
        },
        layout: 'noBorders'
    });


    contentCheck.push({
        margin: [0, 20, 0, 0],
        table: {
            widths: ['40%', '*'],
            headerRows: 1,
            body: [
                [
                    ' ',
                    // {
                    //     alignment: 'right',
                    //     image: 'signature',
                    //     width: '90',
                    //     height: 40
                    // }
                ],
                [
                    {
                        text: 'Submitted Date : ' + (dataObj.regFormSubmitedDate != null ? dataObj.regFormSubmitedDate : ''),
                        bold: true
                    },
                    {
                        alignment: 'right',
                        text: [['(Signature of the Candidate / ', {
                            text: 'விண்ணப்பதாரரின் கையொப்பம்)',
                            font: 'latha'
                        }]]
                    }
                ]
            ]
        },
        layout: 'noBorders'
    })

    /*End of additional details*/


    /*start award quota*/

    //    contentCheck.push({
    //        fontSize: 20,
    //        margin: [0, 20, 0, 0],
    //        table: {
    //            widths: ['*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: [{
    //                            text: 'Quota / Special Marks Details',
    //                            bold: true
    //                        }, {
    //                            text: 'ஆவணங்களைள் ', font: 'latha',
    //                        }]
    //                    },
    //                ]
    //            ]
    //        },
    //        layout: 'noBorders'
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Specify The Ward Ministerial(only serving) / Executive / ', {
    //                            text: 'களப்பணியாளரின் வாரிசா / அமைச்சு பணியாளரின் வாரிசா என குறிப்பிடவும் ',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: dataObj.additionalDetailsBean.stageLevelName6}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Department Type  / ', {
    //                            text: 'துறையின் வகை',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Name Of The Parent  / ', {
    //                            text: 'பெற்றோரின் பெயர் ',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Present Rank(Or Last Rank If Retired Or Deceased)  / ', {
    //                            text: 'களப்பணியாளரின் வாரிசா / அமைச்சு பணியாளரின் வாரிசா என குறிப்பிடவும் ',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Unit  / ', {
    //                            text: 'பிரிவு',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Department Name  / ', {
    //                            text: 'துறையின் பெயர்',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['GPF or CPS Number Of The Parent  / ', {
    //                            text: 'தந்தை/தாயின் பொது வருங்கால வைப்புநிதிக் கணக்கு எண்/ பங்கீட்டு ஓய்வூதியக் கணக்கு எண்',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Certificate Number  / ', {
    //                            text: 'சான்றிதழ் எண்',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Designation Of Issuing Authority  / ', {
    //                            text: 'சான்றிதழ் வழங்கிய அதிகாரி',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        }
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Date Of Issue Of Certificate  / ', {
    //                            text: 'சான்றிதழ் வழங்கப்பட்ட தேதி ',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        },
    //        layout: 'noBorders'
    //    }, {
    //        table: {
    //            widths: [170, '*'],
    //            headerRows: 1,
    //            body: [
    //                [
    //                    {
    //                        text: ['Ward Certificate   / ', {
    //                            text: 'வாரிசுச் சான்றிதழ்',
    //                            font: 'latha',
    //                        }]
    //                    },
    //                    {text: 'abc'}
    //                ]
    //            ]
    //        },
    //        layout: 'noBorders'
    //    })

    /*end award quota*/


    //console.log(JSON.stringify(contentCheck));

    for (var i = 0; i < contentCheck.length; i++) {
        if (typeof contentCheck[i]['table'] != "undefined") {
            contentCheck[i]['table']['dontBreakRows'] = true;
        }
    }
    //console.log("CONTENT", contentCheck);


    var isArray = function (a) {
        return (!!a) && (a.constructor === Array);
    };

    var isObject = function (a) {
        return (!!a) && (a.constructor === Object);
    };

    function toUpperCaseData(content) {
        for (var i = 0; i < content.length; i++) {
            if (isObject(content[i])) {
                iterateObject(content[i])
            }
            if (isArray(content[i])) {
                iterateArray(content[i])
            } else {

            }
        }
        return content;
    }

    function iterateObject(data) {
        for (var key in data) {
            //console.log(data[key]);
            if (isObject(data[key])) {
                data[key] = iterateObject(data[key])
            }
            else if (isArray(data[key])) {
                data[key] = iterateArray(data[key])
            } else {
                if (key == "text") {
                    if (typeof data[key] == "string") {
                        data[key] = data[key].toUpperCase();
                    }
                }
            }
        }
        return data
    }

    function iterateArray(data) {
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i]);
            if (isObject(data[i])) {
                data[i] = iterateObject(data[i])
            }
            else if (isArray(data[i])) {
                data[i] = iterateArray(data[i])
            } else {
                //console.log(data[i]);
                if (typeof data[i] == "string") {
                    data[i] = data[i].toUpperCase();
                }
            }
        }
        return data;
    }

    contentCheck = toUpperCaseData(JSON.parse(JSON.stringify(contentCheck)));


    var docDefinition = {
        content: contentCheck,
        defaultStyle: {
            fontSize: fontSize
        },
        images: {
            logo: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAPAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyREU2MEJEMjYyRkYxMUU3QjREMzk1QTIwRDBFNjBDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyREU2MEJEMzYyRkYxMUU3QjREMzk1QTIwRDBFNjBDMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJERTYwQkQwNjJGRjExRTdCNEQzOTVBMjBEMEU2MEMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJERTYwQkQxNjJGRjExRTdCNEQzOTVBMjBEMEU2MEMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAEw8PFxEXJRYWJS8kHSQvLCQjIyQs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',
            // aadhaar: "",
            // signature: ""
        },
        footer: function (currentPage, pageCount) {
            return {
                margin: 10,
                columns: [
                    {
                        fontSize: 7,
                        text: [
                            {
                                text: dataObj.jsonDate,
                            }
                        ],
                        alignment: 'left'
                    }, {
                        fontSize: 9,
                        text: [
                            {
                                text: currentPage.toString(),
                            }
                        ],
                        alignment: 'left'
                    }
                ]
            };
        },
        header: function (currentPage, pageCount) {
            return {
                margin: 10,
                columns: [
                    {
                        fontSize: 7,
                        text: [
                            {
                                text: dataObj.jsonDate,
                            }
                        ],
                        alignment: 'right'
                    }
                ]
            };
        },
    };
    return new Promise(function (f, r) {
        f(docDefinition)
    });
    // var pdfname = "One-Time Registration Form.pdf";
    // if (dataObj.afterApplyVeiwPayment != null && dataObj.afterApplyVeiwPayment != "" && dataObj.afterApplyVeiwPayment == "true") {
    //     pdfname = "Application Form.pdf"
    // }

// setTimeout("create('Hello world!', 'myfile.txt', 'text/plain')");


    // pdfMake.createPdf(docDefinition).download(pdfname, function () {
    //     setTimeout(function () {
    //         if ((navigator.userAgent.indexOf("MSIE") != -1 ) || !(!!window.MSInputMethodContext && !!document.documentMode)) {
    //             window.close()
    //         }
    //     }, 5000);
    // });
};