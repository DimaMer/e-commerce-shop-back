const mongoose = require('mongoose');
const keys = require("./keys");
const options = {
    //reconnectTries: Number.MAX_VALUE,
    //reconnectInterval: 1000,
    useNewUrlParser: true
};

const db = keys.mongoURI;
mongoose.connect(
    db,
    options
);

console.log(`We are connected to ${db}`);

module.exports = mongoose.connection;