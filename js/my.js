$(document).ready(function () {

  $("#owl-demo").owlCarousel({

    navigation : true, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true,

    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    loop:true,

    items : 1,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false

  });

  // send();

  async function send() {
    try {
      let carabi = new Carabi('https://veneta-api.cara.bi/', 'veneta');
      await carabi.query( "LK_CREATE_LEAD_FROM_SITE", {
        phone_number: 123,
        name: 'asd',
        comment: 'qwe',
      }, 1);
      alert('Успешно отпралено')
    } catch(e) {
      alert('Ошибка: '+e.message)
    }
  }

  $(document).on('submit', 'form', function (e) {
    e.preventDefault();

    // send();
  })
});
