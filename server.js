var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function genMatrix(w, h) {
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.round(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = [];
var w = 30;
var h = 30;
io.sockets.emit('cellw', w);
io.sockets.emit('cellh', h);
grassArr = [], xotakerArr = [], gishatichArr = [];
matrix = genMatrix(w, h);
var Grass = require("./classes/grass.js");
var Xotaker = require("./classes/xotaker.js");
var Gishatich = require("./classes/gishatich.js");
var tact = 0;
var season;
var man = false;
// var man_x, man_y;

for (var y in matrix) {
    for (var x in matrix[y]) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x * 1, y * 1, 1));
        }
        else if (matrix[y][x] == 2) {
            xotakerArr.push(new Xotaker(x * 1, y * 1, 2));
        }
        else if (matrix[y][x] == 3) {
            gishatichArr.push(new Gishatich(x * 1, y * 1, 3));
        }
    }
}

io.on('connection', function (socket) {
    socket.on("eventCordinat", function (c) {
        x = c[0];
        y = c[1];
        if (c[4] == "keypress") {
            if (c[2] == "G" || c[2] == "X" || c[2] == "A" || c[2] == "D") {
                if (matrix[y][x] == 2) {
                    for (var i in xotakerArr) {
                        if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                            xotakerArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 1) {
                    for (var i in grassArr) {
                        if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                            grassArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (var i in gishatichArr) {
                        if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                            gishatichArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 4) {
                    man = false;
                }

                if (c[2] == "X") {
                    matrix[y][x] = 2;
                    xotakerArr.push(new Xotaker(x * 1, y * 1, 2));
                }
                else if (c[2] == "G") {
                    matrix[y][x] = 3;
                    gishatichArr.push(new Gishatich(x * 1, y * 1, 3));
                }
                else if (c[2] == "A") {
                    matrix[y][x] = 1;
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                }
                else if (c[2] = "D") {
                    matrix[y][x] = 0;
                }
            }

            // if (man == "true") {
            //     x = man_x;
            //     y = man_y;
            //     matrix[y][x] = 0;
            //     if (c[3] == 38) {
            //         x--;
            //     }
            //     else if (c[3] == 40) {
            //         x++;
            //     }
            //     else if (c[3] == 39) {
            //         y++
            //     }
            //     else if (c[3] == 37) {
            //         y--;
            //     }
            //     matrix[y][x] = 4;
            // }
        }
        else if (c[4] == "click") {
            if (man == false) {
                x = c[0];
                y = c[1];

                if (matrix[y][x] == 2) {
                    for (var i in xotakerArr) {
                        if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                            xotakerArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 1) {
                    for (var i in grassArr) {
                        if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                            grassArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (var i in gishatichArr) {
                        if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                            gishatichArr.splice(i, 1);
                        }
                    }
                }

                matrix[y][x] = 4;
                man = true;
                // man_x = x;
                // man_y = y;
            }
        }
    });
});



function spring() {
    season = "spring";
}

function summer() {
    season = "summer";
}

function autumn() {
    season = "autumn";
}

function winter() {
    season = "winter";
}

function drawInServer() {
    console.log(tact);
    if (tact % 40 >= 0 && tact % 40 < 10)
        spring();
    else if (tact % 40 >= 10 && tact % 40 < 20)
        summer();
    else if (tact % 40 >= 20 && tact % 40 < 30)
        autumn();
    else
        winter();

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in xotakerArr) {
        xotakerArr[i].bazmanal();
        xotakerArr[i].utel();
        xotakerArr[i].mahanal();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].bazmanal();
        gishatichArr[i].utel();
        gishatichArr[i].mahanal();
    }

    io.sockets.emit("season", season);
    io.sockets.emit("matrix", matrix);
    tact++;
}

setInterval(drawInServer, 1000);
