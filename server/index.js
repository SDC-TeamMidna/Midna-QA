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

// // Create a Answer
// app.post('/qa/questions/:question_id/answers', (req, res) => {
//   const questionID = req.params['question_id'];
//   var params = req.body;
//   db.addAnswer(questionID, params);
// });

// Update a Question

// Update a answer



app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});



/**
 *
router.get('/questions', (req, res) => {
  AtelierAPI('GET', '/qa/questions', req.query)
    .then(response => {
      var finalQ = response.data.results.sort((a, b) => (b.question_helpfulness - a.question_helpfulness));
      res.send(finalQ).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});


app.get('/questions', (req, res) => {
  res.send('Hello World');
});

// app.get('/api/post/:id', (req, res) => {
//   const course = courses.find(c => c.id === parseInt(res.params.id));
//   if(!course) res.status(404).send('The course with the given Id was not found!');
//   res.send(course);
//  });
 */