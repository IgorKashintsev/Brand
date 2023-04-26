const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

const usersJSONPath = path.resolve(__dirname, './db/users.json');

router.search('/', (req, res) => {
  fs.readFile(usersJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      const user = JSON.parse(data).find((item) => item.login === req.body.login);
      if(user && user.password === req.body.password) {
        res.send(JSON.stringify(
          {
            auth: true,
            firstName: user.firstName, 
            login: user.login, 
            cartContents: user.cartContents
          }
        ));
      } else {
        res.sendStatus(404).end();
      }
    }
  });
});

router.post('/', (req, res) => {
  fs.readFile(usersJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      const usersList = JSON.parse(data);
      const user = usersList.find((item) => item.login === req.body.login);
      if(!user) {
        usersList.push(req.body);
        fs.writeFile(usersJSONPath, JSON.stringify(usersList, null, 2), (err) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(
              {
                auth: true,
                firstName: req.body.firstName, 
                login: req.body.login, 
                cartContents: req.body.cartContents
              }
            ));
          }
        })
      } else {
        res.sendStatus(404).end();
      }
    }
  });
});

module.exports = router;