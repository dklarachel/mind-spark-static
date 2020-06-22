const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
admin.initializeApp();

app.use(express.static('src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rachlin232@gmail.com',
        pass: 'pastelepix4'
    }
});

app.post('/sendMail/',  (req, res) => {
    cors(req, res, () => {

        const mailOptions = {
            from: 'Fake Mind Spark <rachlin232@gmail.com>', 
            to: req.body.email,
            subject: 'Submission Confirmation',
            html: `Hey there, ${req.body.name}. This is just to let you know that we've received your ${req.body.type}!`
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sent');
        });
    });    
});

exports.app = functions.https.onRequest(app);