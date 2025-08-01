const mongoose = require('mongoose');
require('dotenv').config();
const link = process.env.DB_link;
console.log(link)

mongoose.connect(DB_link).then(() => console.log('connected  To Your Db')).catch((err) => console.error(err));