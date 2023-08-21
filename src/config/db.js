const mongoose = require('mongoose');
const DB_URI = process.env.DATABASE;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
})
module.exports = db;
