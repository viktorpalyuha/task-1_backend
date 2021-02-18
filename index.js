const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

const port = 8080 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/', (_, res) => {
  fs.readFile(path.join(__dirname, 'cars.json'), (err, cars) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }

    res.status(200).json({
      cars: JSON.parse(cars)
    });
  });
});

app.listen(port, () => {
  console.log(`Sever works at ${port}`);
});
