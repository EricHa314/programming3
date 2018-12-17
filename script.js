var side = 24;
var socket = io();
var w=30, h=30;
socket.on("season", sezon);

var backgroundcolor = "#acacac";

function sezon(season){
    console.log(season);
     if(season=="spring")
        backgroundcolor = "red";
    else if(season=="summer")
        backgroundcolor="blue";
    else if(season=="autumn")
        backgroundcolor="#acacac";
    else if(season=="winter")
        backgroundcolor="white";
}

function setup() {
    createCanvas(side * w, side * h);
    background(backgroundcolor);
}

function drawMatrix(matrix) {
    for (var y in matrix) {
        for (var x in matrix[y]) {
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
           rect(x * side, y * side, side, side);
          
        }
    }
}


socket.on('matrix', drawMatrix);