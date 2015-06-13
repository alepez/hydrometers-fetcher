var Q = require('q');
var loadDOM = require('../load-dom');
var _ = require('lodash');

var defaultUrl = 'http://www.arso.gov.si/en/water/data/stanje_voda.html';

var SiGovArso = function (options) {
  var that = {};
  var url = (options && options.url) || defaultUrl;

  var getData = function (sensor, $) {
    var $rows = $('table.online').eq(0).find('tr');
    var data;
    $rows.each(function (index, row) {
      var $row = $(row);
      var $cells = $row.find('td');
      var river = $cells.eq(0).text();
      var station = $cells.eq(1).text();
      if (river === sensor.river && station === sensor.station) {
        data = {
          'level': parseFloat($cells.eq(2).text()),
          'discharge': parseFloat($cells.eq(3).text()),
          'temperature': parseFloat($cells.eq(5).text())
        };
        return false;
      }
    });
    return data;
  };

  var fetch = function (sensor, time) {
    var deferred = Q.defer();
    if (time === undefined) {
      time = 'now';
    }

    loadDOM(url).then(function ($) {
      deferred.resolve(_.extend({}, sensor, getData(sensor, $)));
    });

    return deferred.promise;
  };

  that.fetch = fetch;

  return that;
};

module.exports = SiGovArso;