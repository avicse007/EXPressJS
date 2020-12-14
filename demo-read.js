var fs = require('fs');
fs.readFile('./dem-module.js', 'utf-8', (error, data) => {
    console.log(data);
});


fs.readdir('./', (error, data) => { 
    console.log("Dir==>",data);
})


