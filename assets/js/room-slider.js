/**
 * Initialize Swiper
 **/

const roomSlider = new Swiper(".roomSlider", {
  slidesPerView: 1,
  spaceBetween: 20,
  rewind: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    480: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
