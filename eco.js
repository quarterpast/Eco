(function(){
  var __replace = ''.replace;
  exports.Eco = new (function(){
    var open, close, prototype = constructor.prototype;
    open = "{{";
    close = "}}";
    constructor.chunk = function(tmpl){
      tmpl = __replace.call(tmpl, /\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\t]/g, '');
      return tmpl.split(open).join(close + "\x1b").split(close);
    };
    constructor.trans = function(chunk){
      if (chunk[0] === "\x1b") {
        return "do -> [].concat do\n" + chunk.substr(0).replace(/^(\s*)/gm, "\t$1") + "\n.join ''";
      } else {
        return '"""' + chunk + '"""';
      }
    };
    prototype.compile = function(tmpl){
      var chunk;
      return "Q.all [" + (function(){
        var _i, _ref, _len, _results = [];
        for (_i = 0, _len = (_ref = constructor.chunk(tmpl)).length; _i < _len; ++_i) {
          chunk = _ref[_i];
          _results.push(constructor.trans(chunk));
        }
        return _results;
      }()).join(", ") + "]";
    };
    function constructor(){}
    return constructor;
  }());
}).call(this);
