const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', (req, res, next) => {
  const access_token = req.session.access_token;
  const url = `https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${access_token}`
  console.log(url);
  request(url, (err, res, body) => {
    const data = JSON.parse(body);
    req.session.user = data;
    console.log(data.data);
  })
  res.render('profile', {data: }, (err, html) => {
    res.send(html);
})

});

module.exports = router;
