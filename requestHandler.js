const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const order_list_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
  console.log('main');

  mariadb.query('SELECT * FROM product', function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(main_view);
  response.end();
}

function favicon(response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('favicon.ico');
  response.end();
}

function redRacket(response) {
  fs.readFile('./img/redRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(data);
    response.end();
  });
}
function blueRacket(response) {
  fs.readFile('./img/blueRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(data);
    response.end();
  });
}
function blackRacket(response) {
  fs.readFile('./img/blackRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  mariadb.query(
    `insert into orderlist values (${productId}, ${new Date().toLocaleString()})`,
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write('order page');
  response.end();
}

function orderlist(response) {
  console.log('orderlist');
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  mariadb.query(`select * from orderlist`, function (err, rows) {
    response.write(order_list_view);
    rows.forEach((element) => {
      console.log(element);
      response.write(`<tr>
                      <td>${element.id}</td>
                      <td>${element.order_date}</td>
                      </tr>`);
    });
    response.write(`</table>`);
    response.end();
  });
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle['/favicon.ico'] = favicon;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;
