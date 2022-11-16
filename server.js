const path = require('path'); 
const express = require('express'); 
 
const app = express(); 
const DIST_DIR = path.join(__dirname, 'build'); 
const HTML_FILE = path.join(DIST_DIR, 'index.html'); 
const DEFAULT_PORT = 3000; 
 
app.set('port', DEFAULT_PORT); 
app.use(express.static(DIST_DIR)); 
app.get('*', (_, res) => res.sendFile(HTML_FILE)); 
app.listen(app.get('port'));
