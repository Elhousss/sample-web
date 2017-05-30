(function() {
  'use strict';

  describe('Index e2e', function() {
    it('should have a title', function() {
      browser.get('http://localhost:3000/');

      expect(browser.getTitle()).toEqual('sample');
    });
  });
})();