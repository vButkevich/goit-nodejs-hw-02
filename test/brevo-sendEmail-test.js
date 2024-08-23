// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import { SMTP } from '../src/constants/smtp.js';

// Create transporter with Brevo (Sendinblue) SMTP settings
let transporter = nodemailer.createTransport({
  host: SMTP.HOST, //'smtp-relay.sendinblue.com', // SMTP server
  port: SMTP.PORT, // 587, // For TLS
  secure: false, // Set true for port 465, false for other ports
  auth: {
    user: SMTP.USER, //'7ab7a7001@smtp-brevo.com', // Your Brevo account email
    pass: SMTP.PASSWORD, //'your_smtp_password', // Your Brevo SMTP password
    //pass: 'gAZrvTPn0fkmSxcJ',
  },
});

// Set up email data
let mailOptions = {
  from: SMTP.FROM, //'"Your Name" <your_email@example.com>', // Sender address
  //   to: 'buBoot.online@gmail.com', // List of recipients
  to: 'buBoot.online@ukr.net', // List of recipients
  subject: 'Hello from Brevo', // Subject line
  text: 'This is a test email sent using Brevo SMTP and Node.js', // Plain text body
  html: '<b>This is a test email sent using Brevo SMTP and Node.js</b>', // HTML body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred: ', error);
  }
  console.log('Email sent: %s', info.messageId);
  console.log({ info });
});
