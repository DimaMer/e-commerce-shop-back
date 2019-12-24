const express    = require('express');
const user      = require('./user');
const category    = require('./category');
const subCategory = require('./subCategory');
const item      = require('./item');
const gallery      = require('./gallery');
const reviewItem      = require('./reviewItem');
const mainInfo   = require('./mainInfo');
const app = express();

app.use('/api', user);
app.use('/api', mainInfo);
app.use('/api', item);
app.use('/api', gallery);
app.use('/api', reviewItem);
app.use('/api', category);
app.use('/api', subCategory);
app.use('/', (req, res) =>{
  res.send("starts...")
});

module.exports = app;
