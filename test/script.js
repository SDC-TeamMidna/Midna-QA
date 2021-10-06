import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  const domain = 'http://localhost:8000';
  const id = Math.floor(Math.random() + 1000 + 900000);

  // Question get test
  const questions = http.get(`${domain}/qa/questions`);
  check(questions, {
    'Questions Status 200': (response) => response.status === 200,
  });
  sleep(1);

  // Answer get test
  const answers = http.get(`${domain}/qa/questions/${id}/answers`);
  check(answers, {
    'Answers Status 200': (response) => response.status === 200,
  });
  sleep(1);

  // Question post test
  const payloadQ = JSON.stringify({
    "product_id": id,
    "body": "How I can use this Product",
    "name": "Van Nguyen",
    "email": "test.last@gmail.com"
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var questionPost = http.post(`${domain}/qa/questions`, payloadQ, params);
  check(questionPost, {
    'Question post Status 201': (response) => response.status === 201,
  });
  sleep(1);

  // Answer post test
  const payloadA = JSON.stringify({
    "body": "Its me",
    "name": "Van Nguyen",
    "email": "first.last@gmail.com",
    "photo": ["1", "2", "3"]
  });

  var answerPost = http.post(`${domain}/qa/questions/${id}/answers`, payloadA, params);
  check(answerPost, {
    'Answer post Status 201': (response) => response.status === 201,
  });
  sleep(1);

  // Mark Helpful Question put test
  const payloadHelp = JSON.stringify({
    "num": 50
  });

  var markQHelpful = http.put(`${domain}/qa/questions/${id}/helpful`, payloadHelp, params);
  check(markQHelpful, {
    'markQHelpful put Status 201': (response) => response.status === 201,
  });
  sleep(1);

  // Mark Helpful Answer put test
  var markAHelpful = http.put(`${domain}/qa/answers/${id}/helpful`, payloadHelp, params);
  check(markQHelpful, {
    'markAHelpful put Status 201': (response) => response.status === 201,
  });
  sleep(1);

  // Mark Report Question put test
  var markQReport = http.put(`${domain}/qa/questions/${id}/report`, payloadHelp, params);
  check(markQReport, {
    'markQHelpful put Status 201': (response) => response.status === 201,
  });
  sleep(1);

  // Mark Answer put test
  var markAReport = http.put(`${domain}/qa/answers/${id}/report`, payloadHelp, params);
  check(markAReport, {
    'markAHelpful put Status 201': (response) => response.status === 201,
  });
  sleep(1);

}



// k6 run --vus 15 --duration 15s script.js
//brew install k6
//https://k6.io/docs/getting-started/running-k6/