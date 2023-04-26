const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const usersJSONPath = path.resolve(__dirname, './db/users.json');

const writeJsonDb = (res, allUsers, userIdx) => {
  fs.writeFile(usersJSONPath, JSON.stringify(allUsers, null, 2), (err) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      // res.send(JSON.stringify(allUsers[userIdx].cartContents));
      res.send(JSON.stringify(
        {
          auth: true,
          firstName: allUsers[userIdx].firstName, 
          login: allUsers[userIdx].login, 
          cartContents: allUsers[userIdx].cartContents
        }
      ));
    }
  })
}

router.post('/:login', (req, res) => {
  fs.readFile(usersJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      const allUsers = JSON.parse(data);
      const userIdx = allUsers.findIndex((item) => item.login === req.params.login);
      if(userIdx !== -1) {
        allUsers[userIdx].cartContents.push(req.body);
        writeJsonDb(res, allUsers, userIdx);
      } else {
        res.sendStatus(404).end();
      }
    }
  });
});

router.put('/:login', (req, res) => {
  fs.readFile(usersJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      const allUsers = JSON.parse(data);
      const userIdx = allUsers.findIndex((item) => item.login === req.params.login);
      const productCartIdx = allUsers[userIdx].cartContents.findIndex((item) => item.id === req.body.id);
      if(userIdx !== -1 && productCartIdx !== -1) {
        allUsers[userIdx].cartContents[productCartIdx].quantity = req.body.quantity;
        writeJsonDb(res, allUsers, userIdx);
      } else {
        res.sendStatus(404).end();
      }
    }
  });
});

router.patch('/:login', (req, res) => {
  fs.readFile(usersJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      const allUsers = JSON.parse(data);
      const userIdx = allUsers.findIndex((item) => item.login === req.params.login);
      const productCartIdx = allUsers[userIdx].cartContents.findIndex((item) => item.id === req.body.id);
      if(userIdx !== -1 && productCartIdx !== -1) {
        allUsers[userIdx].cartContents.splice(productCartIdx, 1);
        writeJsonDb(res, allUsers, userIdx);
      } else {
        res.sendStatus(404).end();
      }
    }
  });
});

router.delete('/:login', (req, res) => {
  fs.readFile(usersJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      const allUsers = JSON.parse(data);
      const userIdx = allUsers.findIndex((item) => item.login === req.params.login);
      if(userIdx !== -1) {
        allUsers[userIdx].cartContents = [];
        writeJsonDb(res, allUsers, userIdx);
      } else {
        res.sendStatus(404).end();
      }
    }
  });
});

module.exports = router;
