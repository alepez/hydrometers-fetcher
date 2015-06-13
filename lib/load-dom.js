var Q = require('q');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var loadDOM = function (url) {
  var deferred = Q.defer();

  if (url.substr(0, 7) === 'file://') {
    /* load from filesysten */
    var filename = url.substr(7);
    fs.readFile(filename, 'utf8', function (err, html) {
      if (err) {
        // FIXME handle errors
        return;
      }
      deferred.resolve(cheerio.load(html));
    });
  } else {
    /* load from web */
    request(url, function (error, response, html) {
      if (error) {
        // FIXME handle errors
        return;
      }
      deferred.resolve(cheerio.load(html));
    });
  }

  return deferred.promise;
};

module.exports = loadDOM;