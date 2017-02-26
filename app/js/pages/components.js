$(document).ready(function() {
    $('.nav').nav();
    $('.modal').modal();
    $('.slider').slide({
        quantity: 3
    });
    $('.lightbox').lightbox();
    $('.animation').animation();
    $('.tab').tab();
    $('.video').video();
    $('.collapsible').collapsible();

    $('#container-component .wrapper .container').hover(function(event){
        event.stopPropagation();
    });

    smoothScrolling();


});

$(window).scroll(function() {
    $('.animation').animation();
});
