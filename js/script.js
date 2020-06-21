// loading page 
$(window).on("load", function() {
  preloaderFadeOutTime = 500;
  function hidePreloader() {
    var preloader = $('#loader');
    preloader.fadeOut(preloaderFadeOutTime);
  }
  $(document.body).css({'overflow-y':'scroll'});
  hidePreloader();
  // Fading Out Loadbar on Finised
});

// progress bar
function onLoad() { 
  var now = new Date().getTime();
  var page_load_time = now - performance.timing.navigationStart;
  console.log("User-perceived page loading time: " + page_load_time);
}

var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

// Loadbar Animation
$(".loadbar").animate({
  width: width + "%"
}, time);

// Loadbar Glow Animation
$(".glow").animate({
  width: width + "%"
}, time);

// Fading Out Loadbar on Finised
setTimeout(function(){
  $('.loadbarwrap').fadeOut(300);
}, time);


// Percentage Increment Animation
var PercentageID = $("#percent"),
        start = 0,
        end = 100,
        duration = time;
        animateValue(PercentageID, start, end, duration);
        
function animateValue(id, start, end, duration) {
  
    var range = end - start,
      current = start,
      increment = end > start? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);
    
    var timer = setInterval(function() {
        current += increment;
        $(obj).text(current + "%");
      //obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// emailjs script
        (function(){
           emailjs.init('user_GFUXFoPep7B7yT7NUy58Q');
        })();
        window.onload = function() {
            document.getElementById('contact-form').addEventListener('submit', function(event) {
                event.preventDefault();
                // generate the contact number value
                this.contact_number.value = Math.random() * 100000 | 0;
                emailjs.sendForm('gmail', 'template_vfRvjbGT', this)
                .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
            });
        }

// mobile menu 
var menu = document.getElementById('mobilemenu');
var open = document.getElementById('micon');

var line1 = open.getElementsByClassName('one')[0];
var line2 = open.getElementsByClassName('two')[0];
var line3 = open.getElementsByClassName('three')[0];

open.onclick = () => {
  if (open.classList.contains('close')) {
    open.classList.remove('close');
    menu.style.width = '0';
    // animate button
    line1.style.transform = 'rotate(0deg)';
    line2.style.opacity = '1';
    line3.style.transform = 'rotate(0deg)';
  } else {
    menu.style.width = '100%';
    menu.style.width = '100vw';
    open.classList.add('close');
    // animate button
    line1.style.transform = 'rotate(45deg)';
    line2.style.opacity = '0';
    line3.style.transform = 'rotate(-45deg)';
  }
}

// email form popup
var popup = document.getElementById('eform');
var overlay = document.getElementsByClassName('overlay')[0];
var close = popup.getElementsByClassName('close')[0];
var submit = popup.getElementsByClassName('submit')[0];
var btn = document.getElementsByClassName('contact');
var form = document.getElementById('contact-form');

for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = () => {
    popup.style.opacity = '1';
    overlay.style.opacity = '1';
    popup.style.zIndex = '9';
    overlay.style.zIndex = '99999999999999';
    // close mobile menu
    open.classList.remove('close');
    menu.style.width = '0';
    // animate button
    line1.style.transform = 'rotate(0deg)';
    line2.style.opacity = '1';
    line3.style.transform = 'rotate(0deg)';
    
  }
}

close.onclick = () => {
  popup.style.opacity = '0';
  overlay.style.opacity = '0';
  popup.style.zIndex = '-1';
  overlay.style.zIndex = '-1'; 
}

submit.onclick = () => {
  form.reset();
}


