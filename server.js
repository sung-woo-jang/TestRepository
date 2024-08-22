let http = require('http');

function start() {
  function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('Hello Node.js');
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  //   localhost:8888
}

exports.start = start;
