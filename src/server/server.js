const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const userRouter = require('./user');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));
app.use('/cart', cartRouter);
app.use('/user', userRouter);

const catalogJSONPath = path.resolve(__dirname, './db/products.json');

app.get('/goods', (req, res) => {
  fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});