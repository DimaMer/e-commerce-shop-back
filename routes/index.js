const express    = require('express');
const user      = require('./user');
const item      = require('./item');
const categoryItem      = require('./categoryItem');
const gallery      = require('./gallery');
const app = express();

app.use('/api', user);
app.use('/api', item);
app.use('/api', categoryItem);
app.use('/api', gallery);
app.use('/', (req, res) =>{
  res.send("starts...")
});

module.exports = app;
