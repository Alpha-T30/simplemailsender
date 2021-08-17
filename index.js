require('dotenv').config()
const express = require('express')  ; 

const app = express() ; 
const path = require('path');

const nodemailer= require("nodemailer") ; 
const cors =require("cors") ; 
var hbs = require('nodemailer-express-handlebars');


app.use(express.json()); 
app.use(cors())  ; 

// app.use(express.static(__dirname+'/public'));

 
//to do 



// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'portfolio/build')));

// //end 
 var pass = process.env.REACT_PASSWORD ; 

app.get('/pass',(req,res)=>{
  res.send(pass)
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'extrat30@gmail.com',

      pass:  process.env.REACT_PASSWORD ,
    }
  });


//   transporter.use("compile",hbs({
//     viewEngine:{
//        partialsDir:"./views/",
//        defaultLayout:""
//    },
//   viewPath:"./views/",
//  extName:".html"
// })) 

  

app.post("/api/mail/",(req,res)=>{
     
    var mailOptions = {
        from: req.body.senderEmail,
        to:   "mrhaquet20@gmail.com",
        subject: 'Email from Client/Tester',
        replyTo:req.body.senderEmail,
        text:req.body.clientmessage,
//         template:"shop",
//         context: {                  // <=
//          clientEmail:req.body.senderEmail ,
//          userName:req.body.userName
//        }
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Successfull")
        }
      });
      
}) ; 

 




const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
 
