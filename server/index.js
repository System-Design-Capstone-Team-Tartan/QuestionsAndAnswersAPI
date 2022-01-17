const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// need cors middleware?

const router = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, PUT, POST',
  optionsSuccessStatus: '200',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use('/qa', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`); // eslint-disable-line no-console
});
