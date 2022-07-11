let http = require('http');
let fs = require('fs');
let server = http.createServer(function (req, res) {
    fs.readFile('./views/register.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});