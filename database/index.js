const { Pool } = require('pg');
const pool = new Pool ({
  user: 'vannguyen',
  host: 'localhost',
  database: 'SDC',
  password: '',
  max: 20,
  idleTimeoutMillis: 0,
  port: 5432
});

pool.connect()
  .then(() => console.log('Connected to PostgresSQL server'))
  .catch((err) => console.log('Error connecting to server', err));

// GET Questions
const getQuestions = () => {
  var queryString = 'SELECT * FROM question ORDER BY id ASC LIMIT 100';
  return pool.query(queryString)
};

// GET Answers from The Question
const getAnswers = ((question_id) => {
  const queryString = 'SELECT * FROM answer WHERE question_id=' + question_id + 'ORDER BY id ASC LIMIT 3';
  return pool.query(queryString)
});

module.exports = {
  getQuestions,
  getAnswers,
  pool,
};



//   pool.query('SELECT * FROM public.answer ORDER BY id ASC LIMIT 1', (err, res) => {
//   console.log(err, res);
//   pool.end;
// });

// CAllback
// const getQuestions = (callback) => {
//   var queryString = 'SELECT * FROM question ORDER BY id ASC LIMIT 3';
//   pool.query(queryString, (err, res) => {
//     console.log('question', res);
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, res.rows);
//     }
//   })};
