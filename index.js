const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const classes = require('./classes');

const app = express();

const port = 8080 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/', classes.getData);

app.listen(port, () => {
  console.log(`Sever works at ${port}`);
});
