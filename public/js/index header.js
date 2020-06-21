var header = $('#header');
var cover = $('#cover');
var animated = false;

/*
$(document).ready(function () {
  header.css({'top':'-7.5em'});
})
*/

$(document).ready(function(){
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $(window).scrollTop(0);
  }
});


$(window).on('unload', function() {
  cover.css({'display':'block'});
  $(window).scrollTop(0);
  header.css({'top':'-7.5em'});
});


$(".down").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#content").offset().top
    }, 1000);
    setTimeout( () => {
      cover.css({'display':'none'});
    }, 1500)
    animated = true;
});

/*
$(window).scroll(function() {
  var scroll = $(window).scrollTop(),
      cover = $(window).height();
  if (scroll == cover) header.hide(1000);
  if (scroll >= cover) header.show(1000);
}); 
*/


let offsetContent = $('#cover').offset().top;
let winheight = $(window).height();
var lastY = 0;

$(window).scroll(function() {
  var y = $(this).scrollTop(),
      cHeight = $(window).height();
  if (y >= cHeight) {
    console.log('hide!');
    cover.css({'display':'none'});
  }
  if (!animated) {
    console.log('not animated');
    if (y > lastY) {
        console.log('hide');
        header.css({'top':'-7.5em'});
    } /*else if (y > winHeight) {
        header.css({'top':'-7em'});
      }*/ else if (y < lastY) {
        header.css({'top':'0'});
      }
    
  } else {
    console.log('animated');
    /*
    if (y > winheight) {
      header.css({'top':'0'});
      //header.show(1000);
    } else {
      //header.hide(1000);
      header.css({'top':'-7.5em'});
    } 
    */
    setTimeout( () => {
      header.css({'top':'0'});
        animated = false;
      }, 1000);
    
  }
  lastY = y;
});

/*
$(window).scroll(function () {
  // if manual scroll 
  $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
    var y = $(this).scrollTop();
    if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
      if (y > lastY) {
        console.log('hide');
        header.css({'top':'-7em'});
      } else if (y < lastY) {
        header.css({'top':'0'});
      }
    }
    lastY = y;
  })
})
*/
 





