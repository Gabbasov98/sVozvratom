function reasonSlider() {
    var swiper = new Swiper('.reason .swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 0,
        pagination: {
            el: '.reason .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    })
}

reasonSlider()

