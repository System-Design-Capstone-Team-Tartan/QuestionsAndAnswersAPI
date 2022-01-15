const express = require('express');
const router = require('./routes');

const app = express();
const port = 3000;

app.use('/qa', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`); // eslint-disable-line no-console
});
