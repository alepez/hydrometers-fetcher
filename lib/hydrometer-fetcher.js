var Q = require('q');

var HydrometersFetcher = function (options) {
  var that = {};
  var sensors = (options && options.sensors) || require('./sensors');

  var getSensor = function (id) {
    var deferred = Q.defer();
    var sensor = sensors[id];
    if (sensor.plugin) {
      console.log(sensor);
      require('./plugins/' + sensor.plugin)()
        .getSensor(sensor)
        .then(function (data) {
          deferred.resolve(data);
        });
    }
    return deferred.promise;
  };

  var listSensors = function () {
    return sensors;
  };

  that.getSensor = getSensor;
  that.listSensors = listSensors;

  return that;
};

module.exports = HydrometersFetcher;