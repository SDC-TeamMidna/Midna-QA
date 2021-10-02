const { Pool } = require('pg');
const pool = new Pool({
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
const getQuestions = ((productID, page, count) => {
  console.log(productID);
  var queryString = `SELECT * FROM question  WHERE question.product_id = ${productID} ORDER BY id ASC LIMIT ${count}`;
  return pool.query(queryString)
});

// GET Answers from The Question
const getAnswers = ((question_id, page, count) => {
  var queryAnwser = `answer.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful`;
  var queryPhoto = `JSON_AGG(json_build_object('id', photo.id, 'url', photo.url))`;

  var queryString = `SELECT ${queryAnwser}, ${queryPhoto} FROM answer LEFT JOIN photo ON answer.id = photo.answer_id WHERE question_id = ${question_id} GROUP BY answer.id ORDER BY answer.id ASC LIMIT ${count}`;
  return pool.query(queryString)
});

//POST a question
const addQuestion = ((data) => {
  var date_written = new Date();
  const queryString = {
    text: `INSERT INTO question(product_id, body, date_written, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)`,
    values: [data.product_id, data.body, date_written, data.name, data.email],
  }
  return pool.query(queryString.text, queryString.values)
});

//POST an Anwser
const addAnswer = ((questionID, data) => {
  var date_written = new Date();
  const queryString = {
    text: 'INSERT INTO answer(question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5)',
    values: [questionID, data.body, date_written, data.name, data.email],
  }
  return pool.query(queryString.text, queryString.values)
});

//Mark Question Helpful
const markQHelpful = ((questionID, params) => {
  const queryString = `UPDATE question SET helpful = ${params.num} WHERE question.id = ${questionID}`;
  return pool.query(queryString)
});

//Mark Answer Helpful
const markAHelpful = ((answerID, params) => {
  const queryString = `UPDATE answer SET helpful = ${params.num} WHERE answer.id = ${answerID}`;
  return pool.query(queryString)
});

module.exports = {
  markAHelpful,
  markQHelpful,
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
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

//https://stackoverflow.com/questions/4448340/postgresql-duplicate-key-violates-unique-constraint