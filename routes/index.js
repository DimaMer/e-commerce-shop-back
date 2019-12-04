const express    = require('express');
const user      = require('./user');
const item      = require('./item');
const gallery      = require('./gallery');
const reviewItem      = require('./reviewItem');
const app = express();

app.use('/api', user);
app.use('/api', item);
app.use('/api', gallery);
app.use('/api', reviewItem);
app.use('/', (req, res) =>{
  res.send("starts...")
});

module.exports = app;
