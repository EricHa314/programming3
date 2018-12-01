function genMatrix(w, h) {
    var matrix = [];
    for(var y = 0; y < h; y++) {
        matrix[y] = [];
        for(var x = 0; x < w; x++) {
            var r = random(100);
            if     (r < 20) r = 0;
            else if(r < 65) r = 1;
            else if(r < 90) r = 2;
            else if(r < 100)r = 3;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

var matrix;
var w = 30;
var h = 30;
var side = 24;
var grassArr = [], xotakerArr = [], gishatichArr = [];

function setup() {
    matrix = genMatrix(w, h);
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
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
}

function draw() {
    background("#acacac");
    for(var y in matrix) {
        for(var x in matrix[y]) {
            if(matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if(matrix[y][x] == 1) {
                fill("green");
            }
            else if(matrix[y][x] == 2) {
                fill("yellow");
            }
            else if(matrix[y][x] == 3) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for(var i in grassArr) {
        grassArr[i].mul();
    }

    for(var i in xotakerArr) {
        xotakerArr[i].bazmanal();
        xotakerArr[i].utel();
        xotakerArr[i].mahanal();
    }

    for(var i in gishatichArr) {
        gishatichArr[i].bazmanal();
        gishatichArr[i].utel();
        gishatichArr[i].mahanal();
    }

}