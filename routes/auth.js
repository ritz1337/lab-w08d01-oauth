const express = require('express');
const request = require('request');
const base64 = require('base-64');
const router = express.Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://127.0.0.1:3000/auth/callback';

// redirect to oauth provider
router.get('/login', (req, res, next) => {
  const url = 'https://accounts.spotify.com/authorize';
  const queryParams = `client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-private`
  res.redirect(url + '?' + queryParams);
});

router.get('/callback', (req, res, next) => {
  const {code} = req.query;
  const url = 'https://accounts.spotify.com/api/token';
  const encodedToken = base64.encode(client_id + ':' + client_secret);
  const options = {
    method: 'POST',
    url,
    headers: {
      'Authorization': `Basic ${encodedToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'authorization_code',
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

