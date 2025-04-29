const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { code } = JSON.parse(event.body || '{}');

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing code' }),
    };
  }

  const clientId = '878254782770621';
  const clientSecret = process.env.FB_APP_SECRET;
  const redirectUri = 'https://ctwacapi.netlify.app/onboarding';

  const url = `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}; 