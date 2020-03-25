var nodemailer = require('nodemailer');
require("dotenv").config();

const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {
  invite: function (req, res) {
    console.log(`smsController:invite(): from=${process.env.TWILIO_PHONE_NUMBER}, to=+1${req.body.to}, body=${req.body.body}`);
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
        if(err.message === 'The number  is unverified. Trial accounts cannot send messages to unverified numbers; verify  at twilio.com/user/account/phone-numbers/verified, or purchase a Twilio number to send messages to unverified numbers.')
        // res.send(JSON.stringify({ success: false }));
        res.send(JSON.stringify({ success: false, errMsg: 'The number  is unverified. Trial accounts cannot send messages to unverified numbers' }));
      });
  },
  inviteResponse: function (req, res) {
    const twiml = new MessagingResponse();

    if (req.body.Body == 'YES') {
      twiml.message('Great! Go to this url: https://chuck-wagon.herokuapp.com/');
    } else if (req.body.Body == 'NO') {
      twiml.message('Okay. Maybe some other time.');
    } else {
      twiml.message(
        'No Body param match, Twilio sends this in the request to your server.'
      );
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  },
  emailInvite: function (req, res) {
    const msgText = `Dinner invite from ${sessionStorage.getItem("UserName")}\n" + req.body.body + "\nTo accept go to: https://chuck-wagon.herokuapp.com/`
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.chuckwagonEmailAddr,
        pass: process.env.chuckwagonEmailPW
      }
    });
    transporter.sendMail({
      from: 'Chuck Wagon',
      to: req.body.to,
      subject: `Dinner invite from <session-uid-here>`,
      text: msgText
    }, function(error, info) {
      if (error) {
        console.log(error);
        // res.send(`Email error: ${error}`);
        res.send(JSON.stringify({ success: false }));
      } else {
        console.log(`Email sent: ${info.response}`);
        // res.send(info.response);
        res.send(JSON.stringify({ success: true }));
      }
    });
  }
}