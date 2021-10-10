const express = require('express');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config/.env')});
var router = require('./router/router.js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.get('/loaderio-859c315145409426de48e3b81388657c/', (req, res) => {
  res.json('loaderio-859c315145409426de48e3b81388657c');
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
/**
 // npm run star
 //ssh -i "Zuko7.cer" ubuntu@ec2-3-142-84-29.us-east-2.compute.amazonaws.com
// sudo service postgresql restart
 */