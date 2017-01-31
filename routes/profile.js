const express = require('express');
const request = require('request');
const base64 = require('base-64');
const router = express.Router();

router.get('/', (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect('/');
  res.render('profile', {user});
});

router.get('/me', (req, res, next) => {
  const url = 'https://api.spotify.com/v1/me';
  const access_token = req.session.access_token;
  if (!access_token) return res.redirect('/');
  console.log(access_token);
  const options = {
    method: 'GET',
    url,
    headers: { 'Authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    return res.redirect('/profile');
  })
});

module.exports = router;
