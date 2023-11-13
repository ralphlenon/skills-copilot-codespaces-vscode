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
