var fs = require('fs'),
    fetchImg = require('./fetchImg');

APP = {};

(function () {
  var config = fs.readFileSync(__dirname + '/config/conf.json');
  APP.config = JSON.parse(config.toString());

  config = null;
  
  fetchImg();
  
}());


