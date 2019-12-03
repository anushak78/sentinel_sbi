(function () {
    module.exports = function (app) {
        let Pdf = require("../controller/pdf")(app);
        let p = new Pdf();
        app.get("/api/get-pdf", function (req, res) {
            p.savePdf(req, res);
        })
    };
})();