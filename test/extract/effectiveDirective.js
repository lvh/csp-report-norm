'use strict';

var assert = require('chai').assert;
var getEffectiveDirective = require('../../lib/extract/effectiveDirective').getEffectiveDirective;
var generateEffectiveDirectiveFromViolatedDirective = require('../../lib/extract/effectiveDirective').generateEffectiveDirectiveFromViolatedDirective;
var getEffectiveDirectiveFromEffectiveDirective = require('../../lib/extract/effectiveDirective').getEffectiveDirectiveFromEffectiveDirective;
var getEffectiveDirectiveFromDocumentURL = require('../../lib/extract/effectiveDirective').getEffectiveDirectiveFromDocumentURL;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('getEffectiveDirective is a function', function() {
      assert.isFunction(getEffectiveDirective);
    });

    test('generateEffectiveDirectiveFromViolatedDirective is a function', function() {
      assert.isFunction(generateEffectiveDirectiveFromViolatedDirective);
    });

    test('getEffectiveDirectiveFromEffectiveDirective is a function', function() {
      assert.isFunction(getEffectiveDirectiveFromEffectiveDirective);
    });

    test('getEffectiveDirectiveFromDocumentURL is a function', function() {
      assert.isFunction(getEffectiveDirectiveFromDocumentURL);
    });

    test('return effective-directive when getting it and one exists', function() {
      var effectiveDirective = 'img-src';
      var payload = {
        'csp-report': {
          'effective-directive': effectiveDirective
        }
      };

      assert.equal(getEffectiveDirective(payload), effectiveDirective);
    });

    test('return empty string when getting effectiveDirective and one does not exist', function() {
      var payload = {
        'csp-report': {}
      };

      assert.equal(getEffectiveDirective(payload), '');
      assert.equal(getEffectiveDirective({}), '');
    });

    test('return empty string when getting effectiveDirective and one does not exist, but is not valid', function() {
      var payload = {
        'csp-report': {
          'effective-directive': 'blah'
        }
      };

      assert.equal(getEffectiveDirective(payload), '');
    });

    test('return effective-directive when one exists', function() {
      var effectiveDirective = 'img-src';
      var payload = {
        'csp-report': {
          'effective-directive': effectiveDirective
        }
      };

      assert.equal(getEffectiveDirective(payload), effectiveDirective);
    });

    test('return empty string when effective-directive is empty', function() {
      var effectiveDirective = '';
      var payload = {
        'csp-report': {
          'effective-directive': effectiveDirective
        }
      };

      assert.equal(getEffectiveDirective(payload), effectiveDirective);
    });

    test('return empty string when effective-directive is empty and violated-directive exists', function() {
      var effectiveDirective = '';
      var payload = {
        'csp-report': {
          'effective-directive': effectiveDirective,
          'violated-directive': 'img-src \'self\''
        }
      };

      assert.equal(getEffectiveDirective(payload), effectiveDirective);
    });

    test('return empty string when effective-directive and violated-directive are empty', function() {
      var effectiveDirective = violatedDirective = '';
      var payload = {
        'csp-report': {
          'effective-directive': effectiveDirective,
          'violated-directive': violatedDirective
        }
      };

      assert.equal(getEffectiveDirective(payload), effectiveDirective);
    });

    test('return empty string when effective-directive and violated-directive are not present', function() {
      assert.equal(getEffectiveDirective({}), '');
    });

    test('generate effective-directive when effective-directive is missing and violated-directive exists', function() {
      var effectiveDirective = 'img-src';
      var violatedDirective = effectiveDirective + ' \'self\'';
      var payload = {
        'csp-report': {
          'violated-directive': violatedDirective
        }
      };

      assert.equal(getEffectiveDirective(payload), effectiveDirective);
    });
  });
});
