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

// SEND EMAIL WHEN NEW DOCUMENT ADDED TO FIRESTORE COLLECTION
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mindsparkinternational@gmail.com',
        pass: 'mindsparkintl234'
    }
});


exports.sendEmail = functions.firestore
    .document('psubmissions/{submissionId}')
    .onCreate((snap, context) => {

        var subject = '';
        const subjectArr = snap.data().subject;
        if (snap.data().subject.length > 1) {
            for (let i = 0; i < subjectArr.length; i++) {
                if (i == (subjectArr.length - 1)) {
                    subject += ` and ${subjectArr[i]}`;
                } else {
                    subject += ` ${subjectArr[i]},`;
                }
            }
        } else {
            subject = ` ${subjectArr[0]}`;
        }

        const mailOptions = {
            from: `Mind Spark International <mindsparkinternational@gmail.com>`,
            to: snap.data().email,
            subject: 'Submission Confirmation',
            html: 
            `
            <p>Hey there, ${snap.data().name}. This is just to let you know that we’ve received your <b>${snap.data().type}</b> about<b> ${subject}</b>. Below is a copy of the other information you’ve provided us with:</p>

            <p style=”padding:40px; background:#f6f6f6; border-radius:20px;”>
                <b>age:</b> ${snap.data().age} <br>
                <b>country:</b> ${snap.data().country} <br>
                <b>title:</b> ${snap.data().title} 
            </p>

            <p>Thanks for submitting and being part of our mission to connect the students of the STEM world! We look forward to seeing your work!</p>

            <p>
            Warm regards, <br>
            Mind Spark Team
            </p>

            `
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error);
                return true;
            }
            console.log("Sent!");
            return true;
        });
    });


/* POST REQUEST ON FORM SUBMISSION
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
*/