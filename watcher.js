const fs = require('fs');
const { exec } = require('child_process');

let serverProcess;

const startServer = () => {
  serverProcess = exec('node dev-server.js');
  console.log('server started.')
};

fs.watch('./public/app.js', (eventType, filename) => {
  if (filename) {
    console.log(`filename provided: ${filename}`);
    if (serverProcess) {
      serverProcess.kill();
      console.log('Server stopped');
    }
    startServer();
  } else {
    console.log('filename not provided');
  }
});

startServer();
