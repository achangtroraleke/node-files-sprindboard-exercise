const fs = require('fs');
const argv = process.argv;

const path = argv[2];
function cat(path){
    fs.readFile(path, 'utf-8', function(err, data){
        if(err){
            console.log(`Error reading ${path}`, `${err}`);
            process.kill(1);
        }
        console.log(data)
    });
}

cat(argv[2])