import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  const domain = 'http://localhost:5000/qa/questions';
  const id = Math.floor(Math.random() + 1000 + 900000);

  const questions = http.get(domain);
  check(questions, {
    'Questions Status 200': (response) => response.status === 200,
  });
  sleep(1);

  const answers = http.get(`${domain}/${id}/answers`);
  check(answers, {
    'Answers Status 200': (response) => response.status === 200,
  });
  sleep(1);

  const payload = JSON.stringify({
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

  var QuestionPost = http.post(domain, payload, params);
  check(QuestionPost, {
    'Question post Status 201': (response) => response.status === 201,
  });
  sleep(1);

}