var i = require('../index');
var cp = require('child_process');

var f = i.spawn(process.execPath, [__dirname + '/child.js']);
f.stderr.pipe(process.stderr);
process.send(f.pid);
