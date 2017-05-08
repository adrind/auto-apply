(function () {
  'use strict';
  const data = require('../../app/scripts/lib/data');
  const assert = require('assert');
  const chrome = require('../../node_modules/chrome-mock');

  describe('Testing data module', function () {
    describe('#init()', function () {
      it('should init with chrome set', function () {
        const dm = new data.default(chrome);
        assert(dm.chrome);
      });
    });
    describe('#get()', function () {
      it('should call chrome storage get with empty data', function (done) {
        const dm = new data.default(chrome);
        dm.get().then(data => {
          assert.ok(chrome.storage.sync.get.calledOnce, 'Chrome storage get was not called');
          assert.equal(data, null, 'Data is not equal to null');
          done();
        });
      });
      it('should call chrome get with the previously set data', function (done) {
        const dm = new data.default(chrome);
        const importantPersonalData = {
          favoriteDog: 'Rocky'
        };

        chrome.storage.sync.set({data: importantPersonalData}, function () {
          dm.get().then(data => {
            assert.deepEqual(data, importantPersonalData, 'Data equals previously set data');
            done();
          });
        });
      });
    });
    describe('#logout()', function () {
      it('should clear all the data when a user logs out', function (done) {
        const dm = new data.default(chrome);

        const importantPersonalData = {
          socialSecurityNumber: '123456banana'
        };

        chrome.storage.sync.set({data: importantPersonalData}, function () {
          dm.logout().then(_ => {
            return dm.get();
          }).then(data => {
            assert.equal(data, undefined);
            done();
          });
        });
      });
    });
    describe('#getProfileKey()', function () {
      it('should fetch the correct value from profile when passed a key', function (done) {
        const dm = new data.default(chrome);

        const importantPersonalData = {
          biggestFearInLife: 'pigeons'
        };

        const unrelatedData = {
          canPigsFly: false
        };

        chrome.storage.sync.set({data: {profile: importantPersonalData, other: unrelatedData}}, function () {
          dm.getProfile('biggestFearInLife').then(biggestFearInLife => {
            assert.equal(biggestFearInLife, 'pigeons');
            done();
          });
        });
      });
    });
  });
})();
