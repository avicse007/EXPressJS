var fs = require('fs');
var data = { name: "Avinash" };

fs.writeFile('data.json', JSON.stringify(data), (error) => {
    console.log("Writing finished", error);
});
