# Static site generator in TypeScript

## Setup
```
npm install
npm start
```

* Make change to app.ts and it will be compiled automatically
* The program can be run anywhere using `website-ts`.

## Notes

### Run as linux script
In order to run this program as a linux script, with ./app.js I added the first line: #!/usr/bin/env node.

### Nicer name for the script
* In order to call the script with `website-ts` instead of ./app.js I have an entry in package.json called bin.
This only worked after I also run the command `npm link` which allow me to call my program anywhere on my laptop.
* In order to unlink, run `npm unlink website-ts`.

## Automatic build on file change
I use nodemon and concurrently locally. They can also installed with globally (with -g).

### Other ways to run ts files
* `npx ts-node ~/scripts/site-generator.ts`. npx is a shortcut for npm exec, which runs scripts from packages, and ts-node is a wrapper for node that compiles and runs ts as a single step; it's essentially tsc and node in a single command

## TODO

If you are unfamiliar with project setup, it's going to take some time to get it all figured out and going, here's what I would do:
*	Set up a basic hello world project.
*	Set up compiling with TS. Goal is to have source code in src/**/*.ts, and a script in package.json such that when you run it, it uses tsc to compile to dist/**/*.js.
*	Set up a quicker iteration loop, for example I personally like tsx. Goal is to have a script that will use tsx to watch and rerun your project whenever changes happen, so you can change your code and immediately see how it executes without having to compile everything.
*	Now you can start writing your actual CLI code and enjoy a fast iteration loop.
*	Set up the bin field of your package.json so your package can be used as a CLI tool. You also need a hashbang in your entry file.
*	Run the compile script.
*	npm link your package so now it's globally installed on your local computer.
*	Run and test your CLI.

## References

* https://www.typescripttutorial.net/typescript-tutorial/nodejs-typescript/
* https://github.com/showdownjs/showdown
* https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
* https://github.com/SteveRidout/flashdown/tree/master
