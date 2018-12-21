'use strict';
module.exports = class Man {

    constructor(x, y, num) {
        this.x = x;
        this.y = y;
        this.number = num;
        this.power = 20;
        this.isalive = true;
    }

    change_power(x) {
        this.power += x;
    }

    mahanal() {
        if (this.power <= 0) {
            matrix[this.y][this.x] = 0;
            this.isalive = false;
        }
    }
}