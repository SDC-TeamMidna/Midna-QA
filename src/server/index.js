const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './config/.env')});
var router = require('./router.js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
