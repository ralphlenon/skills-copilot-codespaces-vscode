
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
}
// Path: comments.json
[
    "First comment",
    "Second comment"
]
// Path: index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</
const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/comments' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const comment = JSON.parse(body);
      fs.appendFile('comments.txt', `${comment.name}: ${comment.message}\n`, err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Error saving comment');
        } else {
          res.statusCode = 201;
          res.end('Comment saved successfully');
        }
      });
    });
  } else if (pathname === '/comments' && req.method === 'GET') {
    fs.readFile('comments.txt', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Error reading comments');
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
