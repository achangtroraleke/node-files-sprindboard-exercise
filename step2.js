const fs = require('fs');
const axios = require('axios');

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

async function webCat(url){
    try{
        const resp = await axios.get(url);
        console.log(resp.data)
    }catch(err){
        console.error(`Error fetching ${url}: ${err}`)
    }
}


if(path.slice(0,4) === 'http'){
    webCat(path)
}else{
    cat(path)
}

