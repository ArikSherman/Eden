$(document).ready(function() {
    $('.nav').nav();
    $('.modal').modal();
    $('.slider').slide({
        quantity: 3
    });

    fixedBanner();
    var bannerHeight = $('#banner .banner').height();
    $('.page-content').css('padding-top',bannerHeight+'px');
    $('.lightbox').lightbox();
});

$(window).scroll(function() {
    fixedBanner();
});

function fixedBanner(){
    var wScroll = $(window).scrollTop();
    if($(window).width() > 768){
        if(wScroll > 140){
            $('#banner .banner').addClass('is-fixed');
        } else {
            $('#banner .banner').removeClass('is-fixed');
        }
    }else{
        if(wScroll > 70){
            $('#banner .banner').addClass('is-fixed');
        } else {
            $('#banner .banner').removeClass('is-fixed');
        }
    }
}
