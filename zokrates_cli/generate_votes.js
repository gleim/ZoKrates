var Math = require('mathjs');
var fs = require('fs');
var n=process.argv[2];
var filename = 'examples/'+n+'.votes';
var fileStream = fs.createWriteStream(filename, {'flags': 'a+'});

fileStream.on('open', function(fd) {
  for(var i = 0; i < n; i++) {
    (function(j){
      fileStream.write(' ' + Math.floor(Math.random() * Math.floor(2)));
    })(i);
  }

  fileStream.end();
});

