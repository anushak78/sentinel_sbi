(function () {
    let request = require("request");
    let pdfContent = require("./generate_pdf");
    let path = require("path");
    let pdfMake = require("pdfmake");
    let Promise = require("bluebird");
    let PdfPrinter = require('pdfmake/src/printer');
    let fonts = {
        Roboto: {
            normal: path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'),
            bold: path.join(__dirname, 'fonts', 'Roboto-Medium.ttf'),
            italics: path.join(__dirname, 'fonts', 'Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, 'fonts', 'Roboto-MediumItalic.ttf')
        },
        latha: {
            normal: path.join(__dirname, 'fonts', 'latha.ttf')
        },
    };
    let pdfFonts = require('./vfs_fonts');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let printer = new PdfPrinter(fonts);
    let fs = require('fs');
    let fontSize = 10;

    module.exports = function (app) {
        class Pdf {
            savePdf(req, res) {
                let that = this;
                let user_id = req.query.user_id
                let request = require('request');
                request('http://localhost:6544/ui/get-json-string/' + user_id, function (error, response, body) {
                    console.log(response);
                    if (!error && response.statusCode == 200) {
                        let b = JSON.parse(body)
                        if (b.code == 1) {
                            let find = "'";
                            let re = new RegExp(find, 'g');
                            let dataset = b.data.json.ocpj_json_string
                            dataset = dataset.replace(re, '"');
                            dataset = JSON.parse(dataset);
                            console.log(user_id);
                            return pdfContent(dataset).then(function (docDefinition) {
                                return that.pdfDOC(docDefinition, dataset, user_id).then(function () {
                                    // fulfill(true);
                                    setTimeout(function () {
                                        res.send({
                                            code: 1,
                                            message: "done",
                                            data: {}
                                        })
                                    }, 2000)
                                });
                            }).catch(function () {
                                res.send({
                                    code: 0,
                                    message: "something went wrong",
                                    data: {}
                                })
                            });
                        } else {
                            res.send({
                                code: 0,
                                message: "No pdf found",
                                data: {}
                            })
                        }
                    }
                })
            }

            pdfDOC(docDefinition, dataset, user_id) {
                let that = this;
                return new Promise(function (fulfill, reject) {
                    try {
                        let pdfDoc = printer.createPdfKitDocument(docDefinition);
                        that.createPath(user_id);
                        let pdfPath = path.join(app.root, 'assets', 'uploads', user_id, user_id + '.pdf');
                        let writeStream = fs.createWriteStream(pdfPath, {highWaterMark: Math.pow(2, 16)});
                        pdfDoc.pipe(writeStream);
                        pdfDoc.end();
                        writeStream.on("finish", function () {
                            fulfill(true);
                        });
                    } catch (e) {
                        console.log("FAILED FOR", user_id);
                        console.log(e);
                        fulfill(true);
                    }
                });
            }


            createPath(string) {
                if (!fs.existsSync(path.join(app.root, "assets", "uploads", string))) {
                    fs.mkdirSync(path.join(app.root, "assets", "uploads", string));
                }
            }

        }
        return Pdf
    };
})();
