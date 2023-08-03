"use strict";
// function that recieves a path
//   convert README.md to index.html
//   call itself on each sub-folder
const showdown = require('showdown');
const converter = new showdown.Converter();
const fs = require("fs");
const path = require('node:path');
showdown.setOption('ghCompatibleHeaderId', true);
const convert = directory => {
    if (directory === '.git')
        return;
    if (directory === 'node_modules')
        return;
    // convert README.md to index.html
    convertToHTML(directory);
    let dirs = getDirectories(directory);
    dirs.forEach(dir => {
        convert(dir);
    });
};
// convert README.md to index.html
const convertToHTML = (dir) => {
    const readmeFile = path.join(dir, "README.md");
    const indexFile = path.join(dir, "index.html");
    if (fs.existsSync(readmeFile)) {
        let text = fs.readFileSync(readmeFile, "utf-8");
        let html = converter.makeHtml(text);
        fs.writeFileSync(indexFile, html);
    }
};
const getDirectories = dir => fs.readdirSync(dir, { withFileTypes: true })
    .filter(direct => direct.isDirectory())
    .map(direct => path.join(dir, direct.name));
convert('/tmp/test-website');
