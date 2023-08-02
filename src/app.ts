// convert README.md to index.html
// call the function on each sub-folder
var showdown  = require('showdown'),
	converter = new showdown.Converter(),
	text      = '# hello, markdown!',
	html      = converter.makeHtml(text);

console.log('Node.js TypeScript', html);

