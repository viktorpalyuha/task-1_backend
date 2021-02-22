const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = 8080 || process.env.PORT;

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.json('works');
});

app.listen(port, () => {
  console.log(`Sever works at ${port}`);
});
