var assert = require('assert');

var SiGovArso = require('../../lib/plugins/si-gov-arso')({
  url: 'file://test-data/si-gov-arso.html'
});

var sensor = {
  river: 'Soča',
  station: 'Log Čezsoški'
};

describe('SiGovArso', function () {
  describe('getSensor', function () {
    it('can fetch data', function (done) {
      SiGovArso.getSensor(sensor).then(function (data) {
        assert.equal('Soča', data.river);
        assert.equal('Log Čezsoški', data.station);
        assert.equal(138, data.level);
        assert.equal(12.5, data.discharge);
        assert.equal(9.4, data.temperature);
        done();
      });
    });
  });
  describe('getAvailableSensors', function () {
    it('can fetch available sensors', function (done) {
      SiGovArso.getAvailableSensors().then(function (sensors) {
        assert.equal('Soča', sensors['Soča / Log Čezsoški'].river);
        assert.equal('Log Čezsoški', sensors['Soča / Log Čezsoški'].station);
        done();
      });
    });
  });
});