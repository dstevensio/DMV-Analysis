var exec = require('child_process').exec,
    extractData = require('./extractData'),
    d = new Date(),
    filename = APP.config.path + (d.toDateString() + "-" + d.toTimeString()).replace(/\s/gi,"-") + ".jpg";

module.exports = function () {
  console.log('tracker running');
  exec("curl -L " + APP.config.img + " -o " + filename.replace(/[\(\)]/gi,""), function(err, stdout, stderr) {
    console.log('err: ' + err);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);  

    extractData(filename);

  });  
};