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
// Mustache.escape = function(text) {return text;};.
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
    const sideBarFile = path.join(dir, "_sidebar.md");
    const navBarFile = path.join(dir, "..", "_navbar.md");
    if (fs.existsSync(readmeFile)) {
        let text = fs.readFileSync(readmeFile, "utf-8");
        let mainContent = converter.makeHtml(text);
        let sideBar = "";
        let navBar = "";
        if (fs.existsSync(sideBarFile)) {
            let text = fs.readFileSync(sideBarFile, "utf-8");
            sideBar = converter.makeHtml(text);
        }
        if (fs.existsSync(navBarFile)) {
            let text = fs.readFileSync(navBarFile, "utf-8");
            navBar = converter.makeHtml(text);
        }
        const view = {
            mainContent,
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
convert('/tmp/test-website/swim');
