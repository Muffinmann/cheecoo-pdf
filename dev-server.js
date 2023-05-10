const fs = require('fs');
const express = require('express');
const { exec } = require('child_process');

let clients = [];
const startServer = () => {
  const app = express();

  app.use(express.static("public"));

  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });

  app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client
    clients.push(res);

    req.on('close', () => { // When client closes connection, update clients list
      console.log('req closed')
      clients = clients.filter(client => client !== res);
    });
  });

  const server = app.listen(3000, () => {
    console.log('server running on port 3000...');
  });

  return server;
};

startServer();

// fs.watch('./public/app.js', (eventType, filename) => {
//   if (filename) {
//     console.log(`filename provided: ${filename}`);
//     server.close(() => {
//       console.log('Server stopped');
//       server = startServer();
//       clients.forEach(client =>
//         client.write(`data: ${new Date().toISOString()}\n\n`)
//       );
//     });
//     process.exit(0);
//   } else {
//     console.log('filename not provided');
//   }
// });
