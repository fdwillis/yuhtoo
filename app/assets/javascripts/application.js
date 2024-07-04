// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require swiper
//= require jquery
//= require_tree .

(function (jQuery) {
    "use strict";

    callGeneralSwiper();

})(jQuery);

function callGeneralSwiper() {
    jQuery(document).find('.swiper.swiper-general').each(function () {
        let slider = jQuery(this);

        var sliderAutoplay = slider.data('autoplay');

        var breakpoint = {
            // when window width is >= 0px
            0: {
                slidesPerView: slider.data('mobile-sm')
            },
            576: {
                slidesPerView: slider.data('mobile')
            },
            // when window width is >= 768px
            768: {
                slidesPerView: slider.data('tab')
            },
            // when window width is >= 1025px
            1025: {
                slidesPerView: slider.data('laptop')
            },
            // when window width is >= 1500px
            1500: {
                slidesPerView: slider.data('slide')
            },
        }

        if (slider.data('navigation')) {
            var navigationVal = {
                nextEl: slider.find('.swiper-button-next')[0],
                prevEl: slider.find('.swiper-button-prev')[0],
            };
        } else {
            var navigationVal = false;
        }

        if (slider.data('pagination')) {
            var paginationVal = {
                el: slider.find(".swiper-pagination")[0],
                dynamicBullets: true,
                clickable: true,
            };
        } else {
            var paginationVal = false;
        }
        var sw_config = {
            loop: slider.data('loop'),
            speed: 5000,
            spaceBetween: slider.data('space'),
            slidesPerView: slider.data('slide'),
            centeredSlides: slider.data('center'),
            mousewheel: slider.data('mousewheel'),
            autoplay: sliderAutoplay,
            effect: slider.data('effect'),
            navigation: navigationVal,
            pagination: paginationVal,
            breakpoints: breakpoint,
        };
        var swiper = new Swiper(slider[0], sw_config);

        document.addEventListener("theme_scheme_direction", (e) => {
            swiper.destroy(true, true);
            setTimeout(() => {
                swiper = new Swiper(slider[0], sw_config);
            }, 500);
        });
    });
}

