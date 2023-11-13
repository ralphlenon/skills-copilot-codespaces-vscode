
// Dependencies
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 3000;
// Create a server
var server = http.createServer(handleRequest);
// Start the server
server.listen(port, function() {
    console.log('Server is listening on http://localhost:%s', port);
});
// Request handler
function handleRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><head><title>Comments</title></head><body><h1>Welcome to the comments page!</h1></body></html>');
  res.end();
}
    var urlData = url.parse(req.url, true);
    if (urlData.pathname === '/') {
        fs.readFile('index.html', 'utf8', function(err, data) {
            if (err) {
                res.writeHead(404);
                res.end('404 File Not Found');
            }
            else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    }
    else if (urlData.pathname === '/comments') {
        if (req.method === 'GET') {
            fs.readFile('comments.json', 'utf8', function(err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end('404 File Not Found');
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(data);
                }
            });
        }
        else if (req.method === 'POST') {
            var comment = '';
            req.on('data', function(chunk) {
                comment += chunk.toString();
            });
            req.on('end', function() {
                fs.readFile('comments.json', 'utf8', function(err, data) {
                    if (err) {
                        res.writeHead(404);
                        res.end('404 File Not Found');
                    }
                    else {
                        var comments = JSON.parse(data);
                        comments.push(comment);
                        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                            if (err) {
                                res.writeHead(500);
                                res.end('500 Internal Server Error');
                            }
                            else {
                                res.writeHead(201);
                                res.end('201 Created');
                            }
                        });
                    }
                });
            });
        }
    }
    else {
        res.writeHead(404);
        res.end('404 File Not Found');
    }
// Path: comments.json
[
    "This is the first comment",
    "This is the second comment",
    "This is the third comment"
]
Path: index.html
Path: server.js