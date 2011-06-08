var fs = require('fs'),
    exec = require('child_process').exec,
    convert,
    extract,
    filename,
    newFile,
    outFile,
    tesseract,
    mv;

mv = function (callback) {
  console.log("go: mv");
  exec("mv " + filename + " processed/", function (err,stdout,stderr) {
    console.log("err: "+err);
    console.log("stdout: "+stdout);
    console.log("stderr: "+stderr);
    
    exec("rm -f " + newFile, function (err,stdout,stderr) {
      console.log("RM -f");
      console.log("err: "+err);
      console.log("stdout: "+stdout);
      console.log("stderr: "+stderr);      
    });
    
  });
  
  if (callback) callback();  
};

extract = function (callback) {
  console.log("go:extract");
  var lines = fs.readFileSync(outFile).split('\n');
  console.log(util.inspect());
  
  callback();
}

tesseract = function (callback) {
  console.log("go: tesseract");
  outFile = "/home/dstevens84/webapp/dmvanalysis/outputs/" + newFile;
  exec("tesseract " + newFile + " outputs/", function (err,stdout,stderr) {
    callback(mv)
  });
};

convert = function (callback) {
  console.log("go: convert");
  newFile = filename.replace('jpg','bmp');
  exec("convert " + filename + " -colorspace Gray -resize 200% " + newFile, function(err,stdout,stderr) {
    console.log("err: "+err);
    console.log("stdout: "+stdout);
    console.log("stderr: "+stderr);
    
    if (!err) { callback(extract); }
  });  
};
    
module.exports = function (file) {
  filename = file;
  convert(tesseract);        
};