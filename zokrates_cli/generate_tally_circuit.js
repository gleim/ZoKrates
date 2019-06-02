var fs = require('fs');
var n=process.argv[2];
var filename = 'examples/tally_'+n+'.code';
var fileStream = fs.createWriteStream(filename, {'flags': 'a+'});

fileStream.on('open', function(fd) {
  fileStream.write('def main(');

  for(var i = 0; i < n; i++) {
    (function(j){
      fileStream.write('private field vote'+j);
      if (j != n-1) {
        fileStream.write(', ');
      } else {
        fileStream.write(') -> (field, field) :\n');
        fileStream.write('  field nays = 0\n');
        fileStream.write('  field yays = 0\n');
        for(var k = 0; k < n; k++) {
          (function(l){
            fileStream.write('  nays = if vote'+l+' == 0 then nays+1 else nays fi\n');
            fileStream.write('  yays = if vote'+l+' == 1 then yays+1 else yays fi\n');
          })(k);
        }
        fileStream.write('  return nays, yays');
      }
    })(i);
  }

  fileStream.end();
});

