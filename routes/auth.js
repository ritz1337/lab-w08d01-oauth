const express = require('express');
const request = require('request');
const base64 = require('base-64');
const router = express.Router();

const client_id = process.env.SLACK_CLIENT_ID;
const client_secret = process.env.SLACK_CLIENT_SECRET;
const redirect_uri = 'http://127.0.0.1:3000/auth/callback';

// redirect to oauth provider
router.get('/login', (req, res, next) => {
  const url = 'https://slack.com/oauth/authorize';
  const queryParams = `client_id=${client_id}&scope=identity.basic&redirect_uri=${redirect_uri}`
  res.redirect(url + '?' + queryParams);
});

router.get('/callback', (req, res, next) => {
  const {code} = req.query;
  const url = 'https://slack.com/api/oauth.access';
  const options = {
    method: 'GET',
    url,
    qs: {
      client_id,
      client_secret,
      code,
      redirect_uri
    }
  };
  request(options, (err, response, body) => {
    const data = JSON.parse(body);
    req.session.access_token = data.access_token;
    res.redirect('/profile/me');
  })
});

router.get('/logout', (req, res, next) => {
  req.session.destroy( () => {
    res.redirect('/');
  });
});

module.exports = router;

