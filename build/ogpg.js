"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//コマンドライン用
const process_1 = require("process");
const ogpGenerator_1 = require("./ogpGenerator");
function read_padding_x(start) {
    return Number.parseInt(process.argv[start]);
}
function read_line_space(start) {
    return Number.parseInt(process.argv[start]);
}
function ok_align(op) {
    const align = ["left", "right", "center", "l", "r", "c"];
    if (align.includes(op)) {
        return true;
    }
    return false;
}
const argument = [];
const options = {};
let i = 2;
while (i < process.argv.length) {
    if (process.argv[i] === "-f") {
        i++;
        options.font = process.argv[i];
        i++;
        continue;
    }
    if (process.argv[i] === "-p") {
        i++;
        options.padding_x = read_padding_x(i);
        i++;
        continue;
    }
    if (process.argv[i] === "-l") {
        i++;
        options.line_space = read_line_space(i);
        i++;
        continue;
    }
    if (process.argv[i] === "-j") {
        options.jpg = true;
        i++;
        continue;
    }
    if (process.argv[i] === "-a") {
        i++;
        if (ok_align(process.argv[i])) {
            switch (process.argv[i][0]) {
                case 'l':
                    options.text_align = "left";
                    break;
                case 'c':
                    options.text_align = "center";
                    break;
                case 'r':
                    options.text_align = "right";
                    break;
            }
            i++;
            continue;
        }
        console.log("Error align");
        (0, process_1.exit)(1);
    }
    if (argument.length === 3) {
        console.error("Argument Error");
        (0, process_1.exit)(1);
    }
    argument.push(process.argv[i]);
    i++;
}
(0, ogpGenerator_1.ogp_generator)(argument[0], argument[1], argument[2], options);
