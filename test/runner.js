var assert = require('assert');
var cp = require('child_process');

cp.fork(__dirname + '/test.js').on('message', function(childPid) {
  var self = this;
  function onTimeout2() {
    cp.exec('ps -p ' + childPid, function(err, stdout) {
      assert.strictEqual(stdout.split('\n')[1], '');
      console.log('Passed ordinary use');
    });
  }

  function onTimeout() {
    process.kill(self.pid, 'SIGKILL');
    setTimeout(onTimeout2, 200);
  }

  setTimeout(onTimeout, 100);
});
