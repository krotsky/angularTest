'use strict';
(function(){
  app.dir = function(dirName, func) {
    var result = func(),
        template = httpGet(result.template),
        attr;
    for (var key in result.scope) {
      attr = key;
    }
    var doTemplate = function(html, options) {
        var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }
    var dir = document.getElementsByTagName(dirName);
    console.log(dir);
    for (var i = 0; i < dir.length; i++) {
      var attrVal = dir[i].getAttribute(attr);
      var obj = {};
      obj[attr] = attrVal;
      dir[i].innerHTML = doTemplate(template, obj);
    };
    function httpGet(theUrl) {
      var xmlHttp = null;

      xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false );
      xmlHttp.send( null );
      return xmlHttp.responseText;
    }
  }
})();
app.dir('star', function() {
  return {
    scope: {
      rait: '='
    },
    template: '/js/search/directives/star.html'
  }
});