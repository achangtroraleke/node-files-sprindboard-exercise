const fs = require('fs');
const axios = require('axios');


const argv = process.argv;

function handleOutput(data, out){
    if(out){
        fs.writeFile(out, data, 'utf8', function(err){
            if (err){
                console.log(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
  
        });
        console.log(`no output, but ${out} contains ${data}`)
    }
    else{
        console.log(data)
    }
}


function cat(path, out){
    fs.readFile(path, 'utf-8', function(err, data){
        if(err){
            console.log(`Error reading ${path}`, `${err}`);
            process.kill(1);
        }
        handleOutput(data, out)
    });
}

async function webCat(url, out){
    try{
        const resp = await axios.get(url);
        handleOutput(resp.data, out)
    }catch(err){
        console.error(`Error fetching ${url}: ${err}`)
    }
}

let path;
let out;

if(process.argv[2]==='--out'){
    out = process.argv[3];
    path = process.argv[4];
}else{
    path = process.argv[2];
}

if(path.slice(0,4) === 'http'){
    webCat(path, out)
}else{
    cat(path, out)
}

