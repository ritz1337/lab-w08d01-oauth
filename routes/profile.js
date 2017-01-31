const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', (req, res, next) => {
  const access_token = req.session.access_token;
  const url = `https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${access_token}`
  // console.log(url);
  request(url, (err, res, body) => {

    // const user = JSON.parse(body);
    // console.log(body);
    console.log(JSON.parse(body))
    var data = JSON.parse(body)
    console.log(data.data.user_id);
    var user = data.data.user_id;
    console.log(user);
    var graphURL = `https://graph.facebook.com/v2.5/me?access_token=${access_token}`
    request(graphURL, (err, res, body) => {
      console.log(graphURL)
      console.log(body);
    })
  })
  res.render('profile', {user:user} (err, html) => {
    res.send(html);
})

});

module.exports = router;
