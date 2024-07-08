const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

// Create a service (the app object is just a callback).
const app = express();
const port = 443;

app.use(express.static(path.join(__dirname, 'build')));

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'C:/Users/Lauren/certs/client-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'C:/Users/Lauren/certs/client-cert.pem'))
}


// Start the HTTPS server
try {
    console.log('Gonna serve');
    https.createServer(options, app).listen(port, () => {
        console.log(`PWA served securely at https://localhost:${port}`);
    });
} catch (err) {
    console.error(err);
}