var cp = require('child_process');

var daemon = cp.fork(__dirname + '/daemon.js');

['exec', 'execFile', 'fork', 'spawn'].forEach(function(id) {
  exports[id] = function() {
    var child = cp[id].apply(cp, arguments);
    daemon.send(child.pid);
    return child;
  }
});