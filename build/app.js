"use strict";
// function that recieves a path
//   convert README.md to index.html
//   call itself on each sub-folder
const showdown = require('showdown');
showdown.setFlavor('github');
showdown.setOption('ghCompatibleHeaderId', true);
showdown.setOption('tablesHeaderId', true);
const converter = new showdown.Converter();
const fs = require("fs");
const path = require('node:path');
const Mustache = require('mustache');
Mustache.escape = function (text) { return text; };
const template = fs.readFileSync(path.resolve(__dirname, "template.html"), "utf-8");
const convert = (dir) => {
    if (dir === '.git' || dir === 'node_modules')
        return;
    // convert README.md to index.html
    convertToHTML(dir);
    let directories = getDirectories(dir);
    directories.forEach(directory => {
        convert(directory);
    });
};
// convert README.md to index.html
const convertToHTML = (dir) => {
    const readmeFile = path.join(dir, "README.md");
    const indexFile = path.join(dir, "index.html");
    if (fs.existsSync(readmeFile)) {
        let text = fs.readFileSync(readmeFile, "utf-8");
        let main_content = converter.makeHtml(text);
        let sideBar = "";
        let navBar = "";
        const view = {
            main_content,
            sideBar,
            navBar
        };
        const output = Mustache.render(template, view);
        fs.writeFileSync(indexFile, output);
    }
};
const getDirectories = (dir) => fs.readdirSync(dir, { withFileTypes: true })
    .filter(direct => direct.isDirectory())
    .map(direct => path.join(dir, direct.name));
convert('/tmp/test-website');
