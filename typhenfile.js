module.exports = function(typhen) {
  var plugin = typhen.loadPlugin('typhen-json-schema', {
    baseUri: 'http://www.swipe.net/schema',
    enumType: 'string'
  });

  return typhen.run({
    plugin: plugin,
    src: 'typings/swipe/swipe.d.ts',
    dest: 'schema'
  });
};

