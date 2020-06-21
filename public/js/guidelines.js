$('#guidecont').masonry({
  itemSelector: '.guidewrap',
  isfitWidth:true,
  gutter: 40
});

$("#to-guidelines").click(function() {
  var top = $("#guidelines").offset().top;
  $([document.documentElement, document.body]).animate({
    scrollTop: top - 100
  }, 1000);
});