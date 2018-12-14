var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

function genMatrix(w, h) {
    for(var y = 0; y < h; y++) {
        matrix[y] = [];
        for(var x = 0; x < w; x++) {
            var r = Math.round(Math.random() * 100);
            if     (r < 20) r = 0;
            else if(r < 65) r = 1;
            else if(r < 90) r = 2;
            else if(r < 100)r = 3;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = [];
var w = 30;
var h = 30;
grassArr = [], xotakerArr = [], gishatichArr = [];

matrix = genMatrix(w, h);

var Grass = require("./classes/grass.js");

var Xotaker = require("./classes/xotaker.js");
var Gishatich = require("./classes/gishatich.js");

for(var y in matrix) {
    for(var x in matrix[y]) {
        if(matrix[y][x] == 1) {
            grassArr.push(new Grass(x*1, y*1, 1));
        }
        else if(matrix[y][x] == 2) {
            xotakerArr.push(new Xotaker(x*1, y*1, 2));
        }
        else if(matrix[y][x] == 3) {
            gishatichArr.push(new Gishatich(x*1, y*1, 3))
        }
    }
}


function drawInServer() {
    for(var i in grassArr) {
       grassArr[i].mul();
    }

    for(var i in xotakerArr) {
       xotakerArr[i].utel();
       xotakerArr[i].mahanal();
    }

    for(var i in gishatichArr) {
       gishatichArr[i].bazmanal();
       gishatichArr[i].utel();
       gishatichArr[i].mahanal();
    }

}


setInterval(drawInServer, 1000);
