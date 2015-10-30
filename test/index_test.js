'use strict';

var path = require('path');
var assert = require('power-assert');
var del = require('del');
var glob = require('glob');
var typhen = require('typhen');
var validator = require('tv4').freshApi();
var tv4Formats = require('tv4-formats');
validator.addFormat(tv4Formats);


describe('swipe-json-schema', function() {
  var destPath = './schema';

  before(function(done) {
    del(destPath).then(function() {
      return require('../typhenfile')(typhen);
    }).then(function() {
      var schemaFiles = glob.sync(destPath + '/**/*.json');
      schemaFiles.forEach(function(filename) {
        var schema = require(path.resolve(filename));
        var schemaUrl = filename.replace('./', 'http://www.swipe.net/');
        validator.addSchema(schemaUrl, schema);
      });
      done();
    }).catch(function(err) {
      throw err;
    });
  });

  it('should be valid the document example JSON1', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "pages": [
        {
          "elements": [
            { "text":"Hello World!" }
          ]
        },
        {
          "elements": [
            { "text":"Good Bye!" }
          ]
        }
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON2', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "pages": [
        {
          "elements": [
            { "x":50, "y":100, "w":100, "h":100, "bc":"red" },
            { "x":100, "y":150, "w":100, "h":100, "bc":"blue" },
          ]
        },
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON3', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "scenes": {
        "*": { "bc":"blue" },
        "alternative": { "bc":"green" },
      },
      "pages": [
        {
          "elements": [
            { "text":"Hello World!" }
          ]
        },
        {
          "scene":"alternative",
          "elements": [
            { "text":"Good Bye!" }
          ]
        }
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON4', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "scenes": {
        "*": {
          "elements": [
            { "id":"hello", "text":"Hello World" },
          ]
        },
      },
      "pages": [
        {
          "elements": [
            { "id":"hello", "textColor":"red" }
          ]
        },
        {
          "elements": [
            { "id":"hello", "textColor":"green" }
          ]
        },
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON5', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "elements": {
        "smile": {
          "lineWidth":3,
          "path":"M0,0 C10,50 90,50 100,0",
          "strokeColor":"red",
        },
      },
      "pages": [
        {
          "elements": [
            { "smile":"stroke", "pos":["50%", 100] },
            { "smile":"stroke", "pos":["50%", 200], "rotate":30 },
            { "smile":"stroke", "pos":["50%", 300], "lineWidth":10 },
            { "smile":"stroke", "pos":["50%", 400], "strokeColor":"#37F" },
            { "smile":"stroke", "pos":["50%", 500], "scale":[2,1] },
          ],
        },
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON6', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "elements": {
        "helloWorld": {
          "w":160, "h":100,
          "elements":[
            { "id":"hello", "text":"Hello", "textAlign":"left" },
            { "id":"world", "text":"World", "textAlign":"left", "x":80 },
          ],
        },
      },
      "pages": [
        {
          "elements": [
            { "element":"helloWorld", "pos":[160, 100] },
            { "element":"helloWorld", "pos":[160, 200],
              "elements":[
                { "id":"hello", "textColor":"red", },
                { "id":"world", "textColor":"blue", },
              ]},
            { "element":"helloWorld", "pos":[160, 300],
              "elements":[
                { "id":"world", "text":"Swipe!" },
              ]},
          ],
        },
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON7', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "pages": [
        {
          "elements": [
            { "text":"Hello World!" }
          ]
        },
        {
          "elements": [
            { "text":"I'm animatable!", "to":{ "translate":[0, 200] } }
          ]
        }
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON8', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "pages": [
        {
          "elements": [
            { "text":"Hello World!" }
          ]
        },
        {
          "animation":"scroll",
          "elements": [
            { "text":"Hello World!", "to":{ "translate":[0, 200] } }
          ]
        }
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });
  it('should be valid the document example JSON9', function() {
    var schema = 'http://www.swipe.net/schema/swipe/document.json';
    var example = {
      "pages": [
        {
          "elements": [
            { "text":"Hello World!" }
          ]
        },
        {
          "elements": [
            { "text":"I'm wiggling!", "loop":{ "style":"wiggle", "repeat":3 } }
          ]
        }
      ]
    };
    var valid = validator.validateResult(example, schema);
    assert(valid.error === null, JSON.stringify(valid.error, null, 2));
    assert(valid.valid);
    assert(valid.missing.length === 0);
  });

});

