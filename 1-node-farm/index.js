const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////////
// File

/* Blocking, synchronous way */
// // readFileSync
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// // writeFileSync
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

/* Non-blocking, asynchronous way */
// fs.readFile('./txt/start.txt', 'utf-8', (error, data) => {
// 	if(error) return console.log('error');
// 	console.log(data);
// });

// console.log('will read this file');


/////////////////////////////////
// SERVER

// the code outhere is read only once

const replaceTemplateFunction = (passTemplate, passProductObj) => {
	let output = passTemplate.replace(/{%PRODUCTNAME%}/g,passProductObj.productName);
	output = output.replace(/{%IMAGE%}/g,passProductObj.image);
	output = output.replace(/{%PRICE%}/g,passProductObj.price);
	output = output.replace(/{%FROM%}/g,passProductObj.from);
	output = output.replace(/{%NUTRIENTS%}/g,passProductObj.nutrients);
	output = output.replace(/{%QUANTITY%}/g,passProductObj.quantity);
	output = output.replace(/{%DESCRIPTION%}/g,passProductObj.description);
	output = output.replace(/{%ID%}/g,passProductObj.id);

	if(!passProductObj.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
	return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const dataObj = JSON.parse(data);


// the code downhere is read everytime it gets a request
const server = http.createServer((req,res) =>{
	
	const { query, pathname } = url.parse(req.url, true);
	
	// Overview page
	if (pathname === '/overview') {
		res.writeHead(200, {'Content-type': 'text/html'});
		// map data from JSON object to Cards using a created function above, then join to make ist array result as one string
        const cardsHTML = dataObj.map(el => replaceTemplateFunction(tempCard, el)).join('');
        //  Then, replace generated cards to the placeholder in the html file
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
		res.end(output);

	// Api page
	} else if (pathname === '/api') {
		// fs.readFile('./dev-data/data.json');
		res.writeHead(200, {'Content-type': 'application/json'});	
		res.end(data);

	// Product page
	} else if (pathname === '/product') {
		res.writeHead(200, {'Content-type': 'text/html'});
		//retriving id from query
		const product = dataObj[query.id];
		const output = replaceTemplateFunction(tempProduct, product);
		res.end(output);
	
	// Not found
	} else {
		res.writeHead(404, {
			'Content-type' : 'text/html',
			'my-own-header' : 'anything we want'
		});
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8000, '127.0.0.1', ()=>{
	console.log('Listening to request on port 8000')
});
