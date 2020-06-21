var config = {
    apiKey: "AIzaSyDJ7rOiPlwb4_mnEQNtTrLayQygm4nfi5U",
    authDomain: "mind-spark-international.firebaseapp.com",
    databaseURL: "https://mind-spark-international.firebaseio.com",
    projectId: "mind-spark-international",
    storageBucket: "mind-spark-international.appspot.com",
    messagingSenderId: "1060405607431",
    appId: "1:1060405607431:web:c610ae7ab24dc8f8bffea2",
    measurementId: "G-T8RLS665XZ"
  };
firebase.initializeApp(config); 

var database = firebase.firestore();
var collection = database.collection('psubmissions');
var fileURL;

var fileNameArr = []; // remember to clear on submit 
var fileArr = [];
var totalFileSize = 0;
$("#files").on("change", "input", function(event){
    var file = $('#s-file').get(0).files[0];
    var fileName = file.name;
    // don't show duplicates 
    if (!fileNameArr.includes(fileName)) {
      fileNameArr.push(fileName);
      fileArr.push(file);
      console.log(isVideo(fileNameArr));
      var fileList = '';
      for (let i = 0; i < fileNameArr.length; i++) {
        fileList += '<div class="fileItem">' + fileNameArr[i] + '<span>&times;</span></div>';
        totalFileSize =+ fileArr[i].size;
      }
      $('#fileNames').html(fileList);
    }
    // remove files
    var remove = document.getElementById('fileNames').getElementsByTagName('span');
    for (let i = 0; i < remove.length; i++) {
      remove[i].onclick = () => {
        var removeItem = document.getElementsByClassName('fileItem')[i];
        removeItem.style.display = 'none'; // visually remove
        // remove from arrays  
        fileNameArr.splice($.inArray(fileNameArr[i], fileNameArr), 1);
        fileArr.splice($.inArray(fileArr[i], fileArr), 1);
        $('#s-file').val(''); // clear from input 
        //console.log(fileNameArr);
      }
     }
     //console.log(fileNameArr);
});

// input for "other" type
$('input[type=radio]').on("change", function() {
  if (selectedRadio('.radio-group') == 'other') {
    $('#other-input').css('opacity', '1');
    $('#other-input').css('z-index', '1');
    $('#other-input').css('width', '106px');
    $('#other-input').focus();
  } else {
    $('#other-input').css('opacity', '0');
    $('#other-input').css('z-index', '-1');
    $('#other-input').css('width', '0');
  }
});

// get selected radio button
function selectedRadio (radioGroup) {
  var options = $(radioGroup + ' input[type=radio]');
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      return options[i].value;
    }
  }
  return false;
}

// get selected checkboxes for subject(s)
function selectedCheckboxes (radioGroup) {
  var options = $(radioGroup + ' input[type=checkbox]');
  var selected = [];
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selected.push(options[i].value);
    }
  }
  if (selected.length == 0) {
    return false;
  } else {
    return selected;
  }
}

// check if article was attached as file
function attachedArticle (fileArr) {
  var extensions =  /(\.pdf|\.doc|\.docx)$/i;
  for (let i = 0; i < fileArr.length; i++) {
    if (extensions.exec(fileArr[i])) {
      return true;
    } 
  }
  return false;
}

// check if there is at least one image for article
function attachedImg (fileArr) {
  var extensions =  /(\.png|\.jpg|\.jpeg|\.gif|\.heic)$/i;
  for (let i = 0; i < fileArr.length; i++) {
    if (extensions.exec(fileArr[i])) {
      return true;
    }
  }
  return false;
}

// check if video is uploaded
function isVideo (fileArr) {
  var extensions =  /(\.mp4|\.mov|\.wmv|\.avi)$/i;
  for (let i = 0; i < fileArr.length; i++) {
    if (extensions.exec(fileArr[i])) {
      return true;
    } 
  }
  return false;
}

// check if only allowed file types are uploaded
function allowedFiles (fileArr) {
  var extensions =  /(\.mp4|\.mov|\.wmv|\.avi|\.png|\.jpg|\.jpeg|\.gif|\.heic|\.pdf|\.doc|\.docx)$/i;
  for (let i = 0; i < fileArr.length; i++) {
    if (!extensions.exec(fileArr[i])) {
      return false;
    }
  }
  return true;
}

// check if any errors with form 
function errors (formData) {
  // no type chosen
  if (!selectedRadio('.radio-group')) {
    console.log('no type chosen');
    return true;
  }
  // "other" type not specified
  if (formData.type == '') {
    console.log('other is not specified');
    return true;
  } 
  // no subject chosen
  if (!selectedCheckboxes('.radio-group')) {
    console.log('no selected subject');
    return true;
  }
  // no files attached
  if (formData.files.length == 0) {
    console.log('no files');
    return true;
  }
  // article must be attached or written, at least one photo
  if (formData.type == 'article') {
    if (!attachedArticle(formData.files) && (formData.text.replace(/<(.|\n)*?>/g, '').trim() == '')) {
      console.log('no article typed');
      return true;
    }
    if (!attachedImg(formData.files)) {
      console.log('no img attached');
      return true;
    }
  }
  // nothing in text field 
  if ((formData.text.replace(/<(.|\n)*?>/g, '').trim() == '') && (formData.type !== 'article')) {
    console.log('nothing in text field');
    return true;
  }
  // file type restriction
  if (!allowedFiles(formData.files)) {
    return true;
  }
  // file size restriction 
  if (totalFileSize > (5 * Math.pow(10, 6))) {
    if (isVideo(formData.files)) {
      if (totalFileSize > (400 * Math.pow(10, 6))) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  console.log('no errors');
  return false;
}


$('#submission').submit(function(event) {
  event.preventDefault();
  var errorMsgs = document.getElementsByClassName('form-cap');
  for (let i = 0; i < errorMsgs.length; i++) {
    errorMsgs[i].style.display = 'none';
  }
  // get user inputs 
  var quillText = quill.getText().replace(/\n$/, '');
  var formData = {
    name: $('#s-name').val(),
    email: $('#s-email').val(),
    country: $('#s-country').val(),
    age: $('#s-age').val(),
    type: selectedRadio('.radio-group'),
    subject: selectedCheckboxes('.radio-group'),
    title: $('#s-title').val(),
    files: fileNameArr,
    text: document.querySelector(".ql-editor").innerHTML
  };
  if (formData.type == 'other') {
    formData.type = $('#other-input').val();
  }
  if (!errors(formData)) {
  // send data to firestore
  uploadPromise();
  collection.doc().set({
    name: formData.name,
    email: formData.email,
    country: formData.country,
    age: formData.age,
    type: formData.type,
    subject: formData.subject,
    title: formData.title,
    files: formData.files,
    text: formData.text
  })
  // check if successful 
  .then(function() {
    $('#submission').trigger('reset');
    $('#fileNames').empty();
    totalFileSize = 0;
    document.querySelector(".ql-editor").innerHTML = '';
    $('#error-text').css('display', 'none');
    $('#error-submit').css('display', 'none');
    $('#error-files').css('display', 'none');
    $('#other-input').css('opacity', '0');
    $('#other-input').css('z-index', '-1');
    $('#other-input').css('width', '0');
    // show success msg
    $("#success-msg").css('opacity', '1');
    $("#success-msg").css("z-index", "99");
    console.log("Doc successful");
    // reset arrays
    fileNameArr = []; 
    fileArr = [];
  })
  .catch(function(error) {
    // test this out 
    $('#error-msg').css('display', 'block');
    console.error("Error writing doc", error);
  });
  } 
  if (!allowedFiles(formData.files)) {
    $('#error-files').css('display', 'block');
    $('#error-files').html('You may allow upload files with the following extensions:  .pdf, .doc, .docx, .png, .jpg, .jpeg, .gif, .heic, .mp4, .mov, .avi, .wmv');
  }
  if (totalFileSize > (5 * Math.pow(10, 6))) {
    if ((isVideo(formData.files)) && (totalFileSize > (400 * Math.pow(10, 6)))) {
      $('#error-files').css('display', 'block');
      $('#error-files').html('Your video size is too large! Please keep it under 400 MB.');
    } else if (!isVideo(formData.files)) {
      $('#error-files').css('display', 'block');
      $('#error-files').html('You total file size is too large! Please keep it under 5MB, unless it\'s a video.');
    }
  }
  if (!selectedRadio('.radio-group')) {
    $('#error-type').css('display', 'block');
    $('#error-files').html('What are you submitting?');
  }
  if (formData.type == '') {
    $('#error-type').css('display', 'block');
    $('#error-type').html('We\'re not too sure what \'other\' means...');
    $('#other-input').focus();
  }
  if (!selectedCheckboxes('.radio-group')) {
    $('#error-subjects').css('display', 'block');
  }
  if (formData.files.length == 0) {
    $('#error-files').css('display', 'block');
    $('#error-files').html('You haven\'t uploaded any files yet :(');
  } else if ((formData.type == 'article') && !attachedImg(formData.files)) {
    $('#error-files').css('display', 'block');
    $('#error-files').html('For articles, you need to include at least one image.');
  } 
  if ((formData.type == 'article') && (!attachedArticle(formData.files) && (formData.text.replace(/<(.|\n)*?>/g, '').trim() == ''))) {
    $('#error-text').css('display', 'block');
    $('#error-text').html('Hey, you forgot to type your article here! You can also upload a file as a PDF or Word document, or link your Google Docs document here.');
  }
  if ((formData.type !== 'article') && (formData.text.replace(/<(.|\n)*?>/g, '').trim() == '')) {
    if (formData.type == '') {
      $('#error-text').css('display', 'block');
      $('#error-text').html('Hey, you forgot to describe your ___ here!');
    } else {
      $('#error-text').css('display', 'block');
      $('#error-text').html(`Hey, you forgot to describe your ${formData.type} here!`);
    }
  }
});

// hide msg
var successMsg = document.getElementById('success-msg');
var closeMsg = successMsg.getElementsByTagName('span')[0];
closeMsg.onclick = () => {
  successMsg.style.opacity = '0';
  successMsg.style.zIndex = '-1';
}

function uploadFile () {
  var storageRef = firebase.storage().ref();
  var file = $('#s-file').get(0).files[0];
  var fileName = Number(new Date()) + '-' + file.name;
  var metadata = { contentType: file.type };
  var task = storageRef.child('submissions/' + fileName).put(file, metadata);
  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then((url => {
    console.log(url);
  }))
  .catch(console.error);
}

function uploadPromise (name) {
  firebase.storage().ref().constructor.prototype.putFiles = function(fileArr) { 
    var ref = this;
    return Promise.all(Array.from(fileArr).map(function(file) {
      return ref.child('submissions/' + file.name).put(file);
    }));
  }
  firebase.storage().ref().putFiles(fileArr).then(function(metadatas) {
  // Get an array of file metadata
  }).catch(function(error) {
  // If any task fails, handle this
});
}
/*
$('#submission').submit(function(event) {
  event.preventDefault();
  // get user inputs 
  var quillText = quill.getText().replace(/\n$/, '');
  var formData = {
    name: $('#s-name').val(),
    email: $('#s-email').val(),
    files: $('#s-file').val(),
    text: quillText
  };
  // send data to firestore
  collection.doc('test2').set({
    name: formData.name,
    email: formData.email,
    files: formData.files,
    text: formData.text
  })
  .then(function() {
    console.log("Doc successful");
  })
  .catch(function(error) {
    console.error("Error writing doc", error);
  });
});
*/
