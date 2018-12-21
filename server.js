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
var Man = require("./classes/man.js");
var tact = 0;
var season;
manArr = [];
var men_num = 0;
var clients = [];

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
    clients.push(socket.id);
    socket.on("keyPress", function (c) {
        if (manArr[c[0]].isalive == true) {
            if (c[1] == 37 || c[1] == 38 || c[1] == 39 || c[1] == 40) {
                x = manArr[c[0]].x;
                y = manArr[c[0]].y;
                matrix[y][x] = 0;
                if (c[1] == 38) {
                    if (y > 0 && matrix[y - 1][x] != 4) {
                        y--;
                    }
                }
                else if (c[1] == 40) {
                    if (y < h - 1 && matrix[y + 1][x] != 4) {
                        y++;
                    }
                }
                else if (c[1] == 39) {
                    if (x < w - 1 && matrix[y][x + 1] != 4) {
                        x++;
                    }
                }
                else if (c[1] == 37) {
                    if (x > 0 && matrix[y][x - 1] != 4) {
                        x--;
                    }
                }

                if (matrix[y][x] == 2) {
                    for (var i in xotakerArr) {
                        if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                            xotakerArr.splice(i, 1);
                            manArr[c[0]].change_power(6);
                        }
                    }
                }
                else if (matrix[y][x] == 1) {
                    for (var i in grassArr) {
                        if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                            grassArr.splice(i, 1);
                            manArr[c[0]].change_power(1);
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (var i in gishatichArr) {
                        if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                            gishatichArr.splice(i, 1);
                            manArr[c[0]].change_power(11);
                        }
                    }
                }

                matrix[y][x] = 4;
                manArr[c[0]].x = x;
                manArr[c[0]].y = y;
            }
        }
    });
    socket.on("clickCordinat", function (c) {
        x = c[0];
        y = c[1];
        if (matrix[y][x] != 4) {
            manArr.push(new Man(x * 1, y * 1, men_num));
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
            socket.emit("persNum", men_num);
            manArr[men_num].x = x;
            manArr[men_num].y = y;
            men_num++;
        }

        else {
            socket.emit("no-pers");
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
    for (var i in manArr) {
        manArr[i].change_power(-1);
        manArr[i].mahanal();
    }
    io.sockets.emit("season", season);
    io.sockets.emit("matrix", matrix);
    tact++;
}

setInterval(drawInServer, 1000);
