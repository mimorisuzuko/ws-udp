const fs = require('fs');
const libpath = require('path');
const app = require('http').createServer((req, res) => {
	fs.readFile(libpath.join(__dirname, '/index.html'), (err, data) => {
		if (err) { return res.send(500); }

		res.writeHead(200);
		res.end(data);
	});
});
const io = require('socket.io').listen(app);
const client = require('dgram').createSocket('udp4');
const cppPort = 8000;
const cppAddress = 'localhost';

app.listen(8080);

io.on('connection', (socket) => {
	socket.on('pos', (data) => {
		console.log(data);

		// Send ${data} -> the udp server
		client.send(data, 0, data.length, cppPort, cppAddress);
	});
});