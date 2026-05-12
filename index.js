require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

//## MY CODE

const urlDatabase = {};

// Middleware to parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));
// Middleware to parse JSON (if needed)
app.use(express.json());


app.post('/api/shorturl', function(req, res) {
    const originalUrl = req.body.url;
    const shortUrl = Object.keys(urlDatabase).length + 1; // generate id
    const parsed = new URL(originalUrl);

    if ( parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        
        //Save into Object
        urlDatabase[shortUrl] = originalUrl;
      
        res.json({ original_url: originalUrl, short_url: shortUrl });

    } else {
         res.json({ error: 'invalid url' })
    }
});

app.get('/api/shorturl/:id', (req, res) => {

    const idNumber = req.params.id;
    const realUrl = urlDatabase[idNumber];

    res.redirect(realUrl);


  
})
