const mongoose = require("mongoose");


const db = (DB_URI) => {
  mongoose.connect(DB_URI);
};


module.exports = db;
