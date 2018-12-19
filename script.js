var side = 24;
var socket = io();
var w = 30, h = 30;
socket.on("season", sezon);
var backgroundcolor = "#acacac";
var x, y;

function sezon(season) {
    console.log(season);
    if (season == "spring")
        backgroundcolor = "#99ff66";
    else if (season == "summer")
        backgroundcolor = "#ffff99";
    else if (season == "autumn")
        backgroundcolor = "#ffb366";
    else if (season == "winter")
        backgroundcolor = "white";
}

function setup() {
    createCanvas(side * w, side * h);
    background(backgroundcolor);
}

function keyPressed() {
    var cordinates = [];
    if (mouseX % side != 0 && mouseY % side != 0) {
        x = Math.floor(mouseX / side);
        y = Math.floor(mouseY / side);
    }
    cordinates[0] = x;
    cordinates[1] = y;
    cordinates[2] = key;
    cordinates[3] = key.code;
    cordinates[4] = "keypress";
    socket.emit("eventCordinat", cordinates);
}


function mousePressed() {
    var cordinates = [];
    if (mouseX % side != 0 && mouseY % side != 0) {
        x = Math.floor(mouseX / side);
        y = Math.floor(mouseY / side);
    }
    cordinates[0] = x;
    cordinates[1] = y;
    cordinates[4] = "click";
    socket.emit("eventCordinat", cordinates);
}

function drawMatrix(matrix) {
    for (y in matrix) {
        for (x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill(backgroundcolor);
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
}


socket.on('matrix', drawMatrix);