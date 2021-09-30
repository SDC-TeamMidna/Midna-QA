const express = require('express');
const db = require('../database/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES//
//Get all the questions
app.get('/questions', (reg, res) => {
  db.getQuestions()
    .then(data => res.json(data))
    .catch( err => res.send(err).status(500));
})


// Get the answer for the Question

//Create a Question
// app.post()

// Create a Answer

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

app.get('/api/transactions', (req, res) => {
  // var queryString = `SELECT * FROM transactions`;
  var queryString = `SELECT transactions.id, transactions.date, transactions.amount,transactions.description, category.name
    FROM transactions
    LEFT JOIN category
    ON transactions.category_id = category.id `;

  db.query(queryString, (err, data, fields) => {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.send({ results: data });
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