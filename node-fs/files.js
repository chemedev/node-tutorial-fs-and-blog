const fs = require('fs');

//
// Read files
//
fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) return console.error(err.message);
  data = data.toString();
  console.log(data);
});

//
// Write files
//
fs.writeFile('./docs/blog2.txt', 'hello, world', (err, data) => {
  if (err) return console.error(err.message);
  console.log('File was written');
});

//
// MKDir & RMDir
//
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (err) => {
    if (err) return console.error(err.message);
    console.log('Folder created');
  });
} else {
  fs.rmdir('./assets', (err) => {
    if (err) return console.error(err.message);
    console.log('Folder deleted');
  });
}

if (!fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) return console.error(err.message);
    console.log('File deleted');
  });
}