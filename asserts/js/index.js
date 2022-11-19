let homeAncher = document.getElementById('menu-home');
let homeMenu = document.getElementById('mega-menu-home');

homeAncher.addEventListener('mouseover', function() {
    homeMenu.style.display = "flex";
})

homeAncher.addEventListener('mouseleave', function() {
    homeMenu.style.display = "none";
})


$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        dots: false,
        nav: true,
        loop: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });

});

$('.owl-carousel-products').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});