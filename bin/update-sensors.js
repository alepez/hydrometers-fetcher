var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');

var sensorsFilename = '../lib/sensors/sensors.json';

var sensors = require(sensorsFilename);

var plugins = _.map(['si-gov-arso'], function (pluginName) {
  return require('../lib/plugins/' + pluginName)();
});

var sensorsFetchers = _.map(plugins, function (plugin) {
  return function (done) {
    plugin.getAvailableSensors().then(function (newSensors) {
      _.merge(sensors, newSensors);
      done(null);
    });
  };
});

async.series(sensorsFetchers, function () {
  var sensorsOutputFilename = path.join(__dirname, sensorsFilename);
  fs.writeFile(sensorsOutputFilename, JSON.stringify(sensors, null, 2), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("See " + sensorsOutputFilename);
  });
});