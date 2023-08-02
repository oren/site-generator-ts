"use strict";
// convert README.md to index.html
// call the function on each sub-folder
const showdown = require('showdown');
const converter = new showdown.Converter();
const fs = require("fs");
showdown.setOption('ghCompatibleHeaderId', true);
const getDirectories = source => fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
// convert README.md to index.html
const convertFile = () => {
    if (fs.existsSync("README.md")) {
        let text = fs.readFileSync("./README.md", "utf-8");
        let html = converter.makeHtml(text);
        fs.writeFileSync('index.html', html);
    }
};
convertFile();
let dirs = getDirectories(".");
dirs.forEach(dir => console.log(dir));
