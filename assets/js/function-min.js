function animatedScroll(){$('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var n=$(this.hash);if(n=n.length?n:$("[name="+this.hash.slice(1)+"]"),n.length)return $("html, body").animate({scrollTop:n.offset().top},1e3),!1}})}function fixedBanner(){var n=$(window).scrollTop();n>140?$("#banner .banner").addClass("is-fixed"):$("#banner .banner").removeClass("is-fixed")}$(document).ready(function(){animatedScroll(),fixedBanner();var n=$("#banner .banner").height();$(".page-content").css("padding-top",n+"px")}),$(window).scroll(function(){fixedBanner()});