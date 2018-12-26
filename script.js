var side = 24;
var socket = io();
var w = 30, h = 30;
socket.on("season", sezon);
var backgroundcolor = "#acacac";
var x, y;
var clicked = false;
var pers;
socket.on("persNum", function (x) { pers = x; });
socket.on("no-pers", function () { clicked = false; document.getElementById('p').innerText = "No pers"; });
socket.on("p-power", function (x) {
    console.log(x);
    document.getElementById('p').innerText = "power:" + x;
});

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
    if (clicked == true) {
        var cordinates = [];
        cordinates[0] = pers;
        cordinates[1] = keyCode;
        socket.emit("keyPress", cordinates);
    }

}

function mousePressed() {
    if (clicked == false) {
        var cordinates = [];
        if (mouseX % side != 0 && mouseY % side != 0) {
            x = Math.floor(mouseX / side);
            y = Math.floor(mouseY / side);
            if(x<=30 && y<=30)
            {
                cordinates[0] = x;
                cordinates[1] = y;
                socket.emit("clickCordinat", cordinates);
                clicked = true;
            }     
        }
    }
}

function drawMatrix(matrix) {
    socket.emit("p-n", pers);
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