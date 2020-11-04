const path = require('path');
const express = require('express');
const root = path.join(__dirname, "../");
const morgan = require('morgan');
const numCPUs = require('os').cpus().length;
const fs = require("fs");
const bodyparser = require("body-parser");
const frameguard = require('frameguard');
const helmet = require('helmet');
const session = require('express-session');
const _ = require("lodash");
let log4js = require('log4js');
var moment = require('moment');
var QRCode = require('qrcode')
log4js.configure({
    appenders: {
        out: {type: 'stdout'},
        app: {type: 'file', filename: path.join(root, "logs", 'application.log')}
    },
    categories: {
        default: {appenders: ['out', 'app'], level: 'debug'}
    }
});
let logger = log4js.getLogger();
//
console.log = function () {
    logger.debug(...arguments);
};
console.error = function () {
    logger.error(...arguments);
};
console.warn = function () {
    logger.warn(...arguments);
};
console.info = function () {
    logger.info(...arguments);
};
console.trace = function () {
    logger.trace(...arguments);
};

module.exports = function (app) {
    // declaring root path
    app.root = root;

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.use(helmet());
    app.use(frameguard({
        action: 'sameorigin'
    }));
    //declaring static path starts

    app.use('/assets', express.static(path.join(app.root, 'assets')));
    app.use('/bower_components', express.static(path.join(app.root, 'bower_components')));
    app.use('/build', express.static(path.join(app.root, 'build')));

    // this methods looks for all html file in views directory and assigns static path to it.
    function dynamicStaticPath() {
        fs.readdirSync(path.join(app.root, "packages")).forEach((rootPath) => {
            if (fs.existsSync((path.join(app.root, "packages", rootPath, "public", "view")))) {
                app.use("/" + rootPath + '/view', express.static(path.join(app.root, "packages", rootPath, "public", "view")));
            }
        });
    }

    dynamicStaticPath();

    //declaring static path ends

    // to log requests
    app.use(morgan({
        "format": 'tiny',
        "stream": {
            write: function (str) {
                // logger.debug(str);
            }
        }
    }));

    fs.readdirSync(path.join(app.root, "packages")).forEach((rootPath) => {
        if (fs.existsSync((path.join(app.root, "packages", rootPath, "server", "routes")))) {
            fs.readdirSync(path.join(app.root, "packages", rootPath, "server", "routes")).forEach((js) => {
                require(path.join(app.root, "packages", rootPath, "server", "routes", js))(app)
            });
        }
    });
    app.post('/qr_code', function (req, res) {
        let code = req.body.candidate_id
        let name = req.body.name
        let dob = req.body.dob
        QRCode.toDataURL(code+' '+name+' '+dob, function (err, url) {
            console.log(err)
            res.send({
                code: 1,
                message: 'success',
                obj: url
            })
          })
    })

    app.post("/save", function (req, res) {
        //console.log(req.body);
        let dir = "/home/senpai/work/argus/" + moment().format('ddd YYYY-MM-DD')
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var data = req.body.image.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(dir + "/" + req.body.candidate_id+"_"+ req.body.type+"_"+moment().format('hh:mm:ss A')+ ".png", data, 'base64', function(err) {
            console.log('err',err);
        });
        res.send({
            code: 1,
            message: 'success'
        })
    });
    // this should be at the end
    app.all("*", function (req, res) {
        res.sendFile(path.join(app.root + 'index.html'));
    });

    // dynamic routing ends
    app.listen(process.env.PORT || 3009, function () {
        console.log('Application started on PORT', process.env.PORT || 3009);
    });
    console.log(`Worker ${process.pid} started`);
};


process.on('uncaughtException', function (err) {
    console.error("Uncaught Exception:", err);
});
