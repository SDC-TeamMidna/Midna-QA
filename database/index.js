const { Client } = require('pg');

const client = new Client({
  user: 'vannguyen',
  host: 'localhost',
  database: 'SDC',
  password: '',
  port: 5432
});

client.connect()
  .then(() => console.log('Connected to PostgresSQL server'))
  .catch((err) => console.log('Error connecting to server', err));


  client.query('SELECT * FROM public.answer ORDER BY id ASC LIMIT 1', (err, res) => {
  console.log(err, res);
  client.end;
});

module.exports = client;