function main(response) {
  console.log('main');

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write('4기-a 장성우');
  response.end();
}

function login(response) {
  console.log('login');

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('Login page');
  response.end();
}

function favicon(response) {
  console.log('favicon.ico');

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('favicon.ico');
  response.end();
}

let handle = {};
handle['/'] = main;
handle['/login'] = login;
handle['/favicon.ico'] = favicon;

exports.handle = handle;
