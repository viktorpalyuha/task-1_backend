const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sortController = require('./controllers/sort');
const searchController = require('./controllers/search');

const app = express();

const port = 8080 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/sort', sortController.sortData);
app.use('/search', searchController.searchData);

app.listen(port, () => {
  console.log(`Sever works at ${port}`);
});
