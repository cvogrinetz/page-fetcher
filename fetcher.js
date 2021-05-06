const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let URL = args[0];
let path = args[1];

const fetcher = (URL, path) => {
  
  request(URL, (error, response, body) => {
    if (error) {
      console.log('Invalid URL');
      console.log(error);
      process.exit();
    }
    
    ('error:', error);
    ('body:', body);
    (('statusCode:', response && response.statusCode));
    
    let options = {
      encoding: 'utf8',
      withFileTypes: false
    };
    fs.readdir('.', options, (err, files) => {
      if (err) {
        console.log(err);
      }

      if (!files.includes(`${path.slice(2)}`) && !files.includes(path)) {
        fs.writeFile(path, body, (err) => {
          if (err) {
            console.log('Invalid path entry');
            throw err;
          }
          console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
        });
      } else {

        rl.question('Please press Y followed by the enter key to overwrite the file ', (answer) => {
          if (answer === 'y' || answer === 'Y') {
            fs.writeFile(path, body, (err) => {
              console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
              if (err) throw err;
              process.exit();
            });
          } else {
            console.log('FILE NOT SAVED TRY AGAIN');
            process.exit();
          }
        });
      }
    });
  });
};

fetcher(URL, path);