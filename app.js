const fs = require('fs');
const express = require('express');
const mustache = require('mustache');
const app = express();
const port = 3000;

var demoData = [{ // dummy data to display
"name":"Steve Balmer",
"company": "Microsoft",
"systems": [{
"os":"Windows XP"
},{
"os":"Vista"
},{
"os":"Windows 7"
},{
"os":"Windows 8"
}]
},{
"name":"Steve Jobs",
"company": "Apple",
"systems": [{
"os":"OSX Lion"
},{
"os":"OSX Leopard"
},{
"os":"IOS"
}]
},{
"name":"Mark Z.",
"company": "Facebook"
}];

app.use('/public', express.static('public'))
app.get('/index.html', (req, res) => {
    var rData = {records:demoData}; // wrap the data in a global object... (mustache starts from an object then parses)
var page = fs.readFileSync('template/layout.mst', "utf8"); // bring in the HTML file
var html = mustache.to_html(page, rData); // replace all of the data
res.send(html);
  // res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
