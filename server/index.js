const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const courses = [{
  id: 1, name: 'course 1',
  id: 2, name: 'course 2',
  id: 3, name: 'course 3'

}];

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/api/course', (req, res) => {
//   res.send([1,2,3]);
// });

// app.get('/api/post/:year/:month', (req, res) => {
//   res.send(res.params);
// });

app.get('/api/post/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(res.params.id));
  if(!course) res.status(404).send('The course with the given Id was not found!');
  res.send(course);
 });


// app.post()
// app.put()

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
