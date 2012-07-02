var assert = require('assert');
var cp = require('child_process');

var m = cp.fork(__dirname + '/master.js');

m.on('message', function(childPid) {
  function onTimeout2() {
    cp.exec('ps -p ' + childPid, function(err, stdout) {
      assert.strictEqual(stdout.split('\n')[1], '');
    });
  }

  function onTimeout() {
    process.kill(m.pid, 'SIGKILL');
    setTimeout(onTimeout2, 200);
  }

  setTimeout(onTimeout, 100);
});
