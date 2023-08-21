const mongoose = require("mongoose");


const db = (DB_URI) => {
  mongoose.connect(DB_URI);
};
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Database connection error:'));
// db.once('open', () => {
//   console.log('Connected to the database');
// })

module.exports = db;
