var assert = require('assert');

var HydrometersFetcher = require('../lib/hydrometer-fetcher');


describe('HydrometersFetcher', function () {
  it('can initialize sensors from object', function () {
    var hf = HydrometersFetcher({
      sensors: {
        'Soča/Log Čezsoški': {
          river: 'Soča',
          station: 'Log Čezsoški',
          lat: 46.314959,
          lon: 13.494578
        }
      }
    });
    assert.equal('Log Čezsoški', hf.getSensor('Soča/Log Čezsoški').station);
  });

  it('can initialize sensors from json', function () {
    var hf = HydrometersFetcher({
      sensors: require('../lib/sensors/sensors.json')
    });
    assert.equal('Log Čezsoški', hf.getSensor('Soča/Log Čezsoški').station);
  });

  it('can initialize sensors from default', function () {
    var hf = HydrometersFetcher();
    assert.equal('Log Čezsoški', hf.getSensor('Soča/Log Čezsoški').station);
  });
});