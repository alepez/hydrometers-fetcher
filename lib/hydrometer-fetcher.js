var HydrometersFetcher = function () {
  var that = {};
  var sensors = {};

  var setupSensors = function (data) {
    sensors = data;
  };

  var getSensor = function (id) {
    return sensors[id];
  };

  that.setupSensors = setupSensors;
  that.getSensor = getSensor;

  return that;
};

module.exports = HydrometersFetcher;