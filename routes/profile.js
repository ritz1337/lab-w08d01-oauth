const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', (req, res, next) => {
  const access_token = req.session.access_token;
  const url = `https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${access_token}`
  console.log(url);
  request(url, (err, res, body) => {
    // const user = JSON.parse(body);
    console.log(body);
    console.log(res);
  })
  res.render('profile');
});

module.exports = router;
