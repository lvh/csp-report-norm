'use strict';

/**
 * List of allowed globally unique identifiers.
 *
 * @return {Array}    Allowed globally unique identifiers.
 */
function getGloballyUniqueIdentifiers() {
  return [
    'data',
    'filesystem',
    'blob'
  ];
}

/**
 * Determines if the value uses a globally unique identifier.
 *
 * @param  {String}    value    A string to test.
 * @return {String}             Boolean representing whether or not the value is
 *                              a globally unique identifier.
 */
function isGloballyUniqueIdentifier(value) {
  var globallyUniqueIdentifiers = getGloballyUniqueIdentifiers();
  var result = false;

  globallyUniqueIdentifiers.forEach(function(globallyUniqueIdentifier) {
    if (0 === value.indexOf(globallyUniqueIdentifier)) {
      result = true;
    }
  });

  return result;
}

/**
 * Sanitizes a globally unique identifier `blocked-uri` value.
 *
 * @param  {String}    value    The URI to sanitize.
 * @return {String}             Sanitized globally unique identifier.
 */
function sanitizeGloballyUniqueIdentifier(value) {
  var globallyUniqueIdentifiers = getGloballyUniqueIdentifiers();
  var cleanValue = '';

  globallyUniqueIdentifiers.forEach(function(globallyUniqueIdentifier) {
    if (0 === value.indexOf(globallyUniqueIdentifier)) {
      cleanValue = globallyUniqueIdentifier;
    }
  });

  return cleanValue;
}

module.exports = {
  getGloballyUniqueIdentifiers: getGloballyUniqueIdentifiers,
  isGloballyUniqueIdentifier: isGloballyUniqueIdentifier,
  sanitizeGloballyUniqueIdentifier: sanitizeGloballyUniqueIdentifier
};