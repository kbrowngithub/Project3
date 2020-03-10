require("dotenv").config();

const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {
  invite: function (req, res) {
    console.log(`recipesController:invite(): from=${process.env.TWILIO_PHONE_NUMBER}, to=${req.body.to}, body=${req.body.body}`);
    const msgText = req.body.body + " Respond with YES to accept or NO to decline."
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: msgText
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  },
  inviteResponse: function (req, res) {
    const twiml = new MessagingResponse();

    if (req.body.Body == 'YES') {
      twiml.message('Great! Go to this url: https://bachelor-helper-recipes.herokuapp.com/');
    } else if (req.body.Body == 'NO') {
      twiml.message('Okay. Maybe some other time.');
    } else {
      twiml.message(
        'No Body param match, Twilio sends this in the request to your server.'
      );
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }
}