function route(pathname, handle) {
  console.log('pathname: ' + pathname);
  handle[pathname]();
}

exports.route = route;
