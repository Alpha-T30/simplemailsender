require('dotenv').config()
const express = require('express')  ; 

const app = express() ; 

const path = require('path');

const nodemailer= require("nodemailer") ; 
const cors =require("cors") ; 
var hbs = require('nodemailer-express-handlebars');


app.use(express.json()); 
app.use(cors())  ; 


const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
 process.env.CLIENT_ID, // ClientID
   process.env.CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()


const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  tls: {
    rejectUnauthorized: false
  },
  auth: {
       type: "OAuth2",
       user: "extrat30@gmail.com", 
       clientId: "634851174411-vdu8fcol6ktbgrhov6rhitt0jucknpj7.apps.googleusercontent.com",
       clientSecret: "x0eu1-zZBRxEfVyVn7Ot6vHM",
       refreshToken:"1//040456upBKMyPCgYIARAAGAQSNwF-L9Ir0J67dwOMsl59IOO9aVHs-R2csCLCyDRKhPodERXif-sAd7pSIluFgOIDlB9dlSIf2qA",
       accessToken: accessToken
  }
});



 

app.post("/api/mail/",(req,res)=>{

  var message = `<h2 style='font-weight:bold;'>${req.body.text}</h2>`;

const mailOptions = {
  from:  req.body.senderEmail,
  to: req.body.receiverEmail ,
  subject: 'Email from Client/Tester',
  replyTo:req.body.senderEmail,
  generateTextFromHTML: true,
  html:  message 
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  if (error) {
          console.log(error);
        } else {
          console.log(response);
          res.send("Successfull")
        }
  smtpTransport.close();
});



}) ; 
 
 




const port = process.env.PORT || 5000;
app.listen(port);

console.log(` Server Started at port ${port}`);
 
