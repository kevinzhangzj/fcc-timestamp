// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});
app.get('/api/:date?', (req, res) => {
  const _date = req.params.date;
  if (!_date) {
    const d = new Date();
    res.json({
      unix: d.valueOf(),
      utc: d.toUTCString()
    })
  } else if ((new Date(_date)).valueOf()) {
    const d = new Date(_date);
    res.json({
      unix: d.valueOf(),
      utc: d.toUTCString()
    })
  } else if ((new Date(parseInt(_date))).valueOf()) {
    const d = new Date(parseInt(_date));
    res.json({
      unix: d.valueOf(),
      utc: d.toUTCString()
    })
  } else {
    res.json({
      error: "Invalid Date"
    })
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 8888, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
