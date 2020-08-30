// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const nodemailer = require('nodemailer');
// const cors = require('cors')({origin: true});
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// admin.initializeApp();

// app.use(express.static('src'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// // SEND EMAIL WHEN NEW DOCUMENT ADDED TO FIRESTORE COLLECTION
// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'mindsparkinternational@gmail.com',
//         pass: 'mindsparkintl234'
//     }
// });


// exports.sendEmail = functions.firestore
//     .document('psubmissions/{submissionId}')
//     .onCreate((snap, context) => {

//         // get subject(s)
//         var subject = '';
//         const subjectArr = snap.data().subject;
//         if (subjectArr.length > 2) {
//             for (let i = 0; i < subjectArr.length; i++) {
//                 if (i == (subjectArr.length - 1)) {
//                     subject += ` and <b>${subjectArr[i]}</b>`;
//                 } else {
//                     subject += ` <b>${subjectArr[i]}</b>,`;
//                 }
//             }
//         } else if (subjectArr.length == 2) {
//             subject += ` <b>${subjectArr[0]}</b> and <b>${subjectArr[1]}</b>`
//         }
//         else {
//             subject = ` <b>${subjectArr[0]}</b>`;
//         }

//         // get file name(s)
//         var files = '';
//         const fileArr = snap.data().files;
//         if (fileArr.length > 1) {
//             for (let i = 0; i < fileArr.length; i++) {
//                 if (i == (fileArr.length - 1)) {
//                     files += `${fileArr[i]}`;
//                 } else {
//                     files += `${fileArr[i]}, `;
//                 }
//             }
//         } else {
//             files = `${fileArr[0]} `;
//         }

//         // get text
//         var text = snap.data().text;
//         if (text.length > 500) {
//             text = text.substr(0, 500);
//             text += '...';
//         }

//         const mailOptions = {
//             from: `Mind Spark International <contact@mindsparkintl.co>`,
//             to: snap.data().email,
//             subject: 'Submission Confirmation',
//             html: 
//             `
//             <p>Hey there, ${snap.data().name}. This is just to let you know that we’ve received your <b>${snap.data().type}</b> about${subject}. Below is a copy of the other information you’ve provided us with:</p>

//             <p style=”padding:40px; background:#f6f6f6; border-radius:20px;”>
//                 <b>age:</b> ${snap.data().age} <br>
//                 <b>country:</b> ${snap.data().country} <br>
//                 <b>title:</b> ${snap.data().title} <br>
//                 <b>files:</b> ${files} <br>
//                 <b>text:</b> ${text}
//             </p>

//             <p>Thanks for submitting and being part of our mission to connect the students of the STEM world! Your work will be processed through our two-stage editing protocol to ensure superb quality and scientific accuracy. We are in the process of building our online platform, and it will be ready by the end of July, so that is when you will hear back from us about the status of your submission. We look forward to seeing your creation!</p>
//             <p>If you have any questions, feel free to contact us at <a href="mailto:contact@mindsparkintl.co">contact@mindsparkintl.co</a>.</p>

//             <p>
//             Warm regards, <br>
//             Mind Spark Team
//             </p>

//             `
//         };


//         return transporter.sendMail(mailOptions, (error, data) => {
//             if (error) {
//                 console.log(error);
//                 return true;
//             }
//             console.log("Sent!");
//             return true;
//         });
//     });


// /* POST REQUEST ON FORM SUBMISSION
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'rachlin232@gmail.com',
//         pass: 'pastelepix4'
//     }
// });

// app.post('/sendMail/',  (req, res) => {
//     cors(req, res, () => {

//         const mailOptions = {
//             from: 'Fake Mind Spark <rachlin232@gmail.com>', 
//             to: req.body.email,
//             subject: 'Submission Confirmation',
//             html: `Hey there, ${req.body.name}. This is just to let you know that we've received your ${req.body.type}!`
//         };
  
//         // returning result
//         return transporter.sendMail(mailOptions, (erro, info) => {
//             if(erro){
//                 return res.send(erro.toString());
//             }
//             return res.send('Sent');
//         });
//     });    
// });

// exports.app = functions.https.onRequest(app);
// */