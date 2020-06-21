$(document).ready(function(){
  $('.carousel').slick({
    variableWidth:true,
    nextArrow: '<i class="fas fa-chevron-right fa-fw"></i>',
    prevArrow: '<i class="fas fa-chevron-left fa-fw"></i>',
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    infinite:false,
    initialSlide: 4,
    /*
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ] */
  });			
});

