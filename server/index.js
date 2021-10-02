const express = require('express');
const db = require('../database/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES//
//Get all the questions
app.get('/qa/questions', (req, res) => {
  const params = {
    productID: Number(req.query.productID) || null,
    page: Number(req.query.page) || 0,
    count: Number(req.query.count) || 10
  }
  db.getQuestions(params.productID, params.page, params.count)
    .then(data => res.json(data.rows))
    .catch(err => res.send(err).status(500));
});

// Get the answer for the Question
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params['question_id'];
  const params = {
    page: Number(req.query.page) || 0,
    count: Number(req.query.count) || 5,
  }

  db.getAnswers(questionID, params.page, params.count)
    .then(data => res.json(data.rows))
    .catch(err => res.send(err).status(500));
});

//Create a Question
app.post('/qa/questions', (req, res) => {
  var params = req.body;
  db.addQuestion(params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack))
});

// Create a Answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params['question_id'];
  var params = req.body;
  console.log(params);
  db.addAnswer(questionID, params)
    .then((data) => {
     // res.sendStatus(201);
      var answerID = data.rows[0].id;
      db.AddPhoto(answerID, params.photo)
      .then(() => res.sendStatus(201))
      .catch(err => console.error(err.stack));
    })
    .catch(err => console.error(err.stack));
});

// Mark Question Helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const questionID = req.params['question_id'];
  var params = req.body;
  db.markQHelpful(questionID, params)
    // .then(() => res.sendStatus(201))
    // .catch(err => console.error(err.stack));
});

// Mark Answer Helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answersID = req.params['answer_id'];
  var params = req.body;
  db.markAHelpful(answersID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});

// Mark Question Reported
app.put('/qa/questions/:question_id/report', (req, res) => {
  const questionID = req.params['question_id'];
  var params = req.body;
  db.markQReport(questionID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});

// Mark Answer Reported
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const answersID = req.params['answer_id'];
  var params = req.body;
  console.log(params);
  db.markAReport(answersID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});



// app.get('/api/post/:id', (req, res) => {
//   const course = courses.find(c => c.id === parseInt(res.params.id));
//   if(!course) res.status(404).send('The course with the given Id was not found!');
//   res.send(course);
//  });
