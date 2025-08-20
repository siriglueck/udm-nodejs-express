const fs = require('fs');
const http = require('http');

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
// Server

const server = http.createServer((req,res) =>{
	res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', ()=>{
	console.log('Listening to request on port 8000')
});
