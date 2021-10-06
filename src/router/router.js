var router = require('express').Router();
const db = require('../database/index.js');

//Get all the questions
router.get('/qa/questions', (req, res) => {
  const params = {
    productID: Number(req.query.productID) || null,
    page: Number(req.query.page) || 0,
    count: Number(req.query.count) || 10
  }
  db.getQuestions(params.productID, params.page, params.count)
    .then(data => res.json(data.rows))
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
});

// Get the answer for the Question
router.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params['question_id'];
  const params = {
    page: Number(req.query.page) || 0,
    count: Number(req.query.count) || 5,
  }

  db.getAnswers(questionID, params.page, params.count)
    .then(data => res.json(data.rows))
    .catch(err => res.status(500).send(err));
});

//Create a Question
router.post('/qa/questions', (req, res) => {
  var params = req.body;
  db.addQuestion(params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack))
});

// Create a Answer
router.post('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params['question_id'];
  var params = req.body;
  db.addAnswer(questionID, params)
    .then((data) => {
      var answerID = data.rows[0].id;
      db.addPhoto(answerID, params.photo)
      .then(() => res.sendStatus(201))
      .catch(err => console.error(err.stack));
    })
    .catch(err => console.error(err.stack));
});

// Mark Question Helpful
router.put('/qa/questions/:question_id/helpful', (req, res) => {
  const questionID = req.params['question_id'];
  var params = req.body;
  db.markQHelpful(questionID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});

// Mark Answer Helpful
router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answersID = req.params['answer_id'];
  var params = req.body;
  db.markAHelpful(answersID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});

// Mark Question Reported
router.put('/qa/questions/:question_id/report', (req, res) => {
  const questionID = req.params['question_id'];
  var params = req.body;
  db.markQReport(questionID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});

// Mark Answer Reported
router.put('/qa/answers/:answer_id/report', (req, res) => {
  const answersID = req.params['answer_id'];
  var params = req.body;
  db.markAReport(answersID, params)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err.stack));
});


module.exports = router;