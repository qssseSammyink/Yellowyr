const http = require('http');

http.createServer((req, res) => {
    res.write('OK');
    res.end();
}).listen(process.env.PORT || 3000);

const { Sigma } = require('./src/structures/bot.js');
const client = new Sigma();

client.connect();
module.exports = client;


















/**
 * 
 * This template is made by autodevsigma
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */