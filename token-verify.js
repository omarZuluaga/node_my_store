const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NzQzNDkwMn0.m9J1k7hQ_xnlaSBJm5s9EwdLkFrw5wASRuXu3OK_Cas';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
