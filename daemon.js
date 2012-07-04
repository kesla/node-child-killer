var posix = require('posix');
var pids = [];

process.on('message', function(pid) {
  pids.push(pid);
});

setInterval(function() {
  if (posix.getppid() === 1) {
    pids.forEach(function(pid) {
      try {
        process.kill(pid);
      } catch (e) {}
    });
    process.exit();
  }
}, 100);

process.on('SIGINT', function() {});