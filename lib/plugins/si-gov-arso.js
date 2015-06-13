var Q = require('q');
var loadDOM = require('../load-dom');
var _ = require('lodash');

var defaultUrl = 'http://www.arso.gov.si/en/water/data/stanje_voda.html';
// var defaultUrl = 'file://test-data/si-gov-arso.html';
var pluginName = 'si-gov-arso';

var SiGovArso = function (options) {
  var that = {};
  var url = (options && options.url) || defaultUrl;

  var parseSensorData = function (sensor, $) {
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

  var parseAllSensors = function ($) {
    var $rows = $('table.online').eq(0).find('tr');
    var data = {};
    $rows.each(function (index, row) {
      var $row = $(row);
      var $cells = $row.find('td');
      var river = $cells.eq(0).text();
      var station = $cells.eq(1).text();
      if (river && station) {
        data[river + ' / ' + station] = {
          'river': river,
          'station': station,
          'plugin': pluginName
        };
      }
    });
    return data;
  };

  var getAvailableSensors = function () {
    var deferred = Q.defer();

    loadDOM(url).then(function ($) {
      deferred.resolve(parseAllSensors($));
    });

    return deferred.promise;
  };

  var getSensor = function (sensor, time) {
    var deferred = Q.defer();
    if (time === undefined) {
      time = 'now';
    }

    loadDOM(url).then(function ($) {
      deferred.resolve(_.extend({}, sensor, parseSensorData(sensor, $)));
    });

    return deferred.promise;
  };

  that.name = pluginName;
  that.getSensor = getSensor;
  that.getAvailableSensors = getAvailableSensors;

  return that;
};

module.exports = SiGovArso;