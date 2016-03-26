const Rx = require('rx');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const $requests = new Rx.Subject();

function sendHello(e) {
    console.log('sending hello'); // eslint-disable-line no-console
    e.res.writeHead(200, { 'Content-Type': 'text/plain' });
    e.res.end('Hello World\n');
}

$requests
    .tap(e => console.log('request to', e.req.url)) // eslint-disable-line no-console
    .subscribe(sendHello);

http.createServer((req, res) => {
    $requests.onNext({ req, res });
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`); // eslint-disable-line no-console
});
