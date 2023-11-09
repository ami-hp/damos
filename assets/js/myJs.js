//------------------------statics----------------------------//
$(document).ready(function () {
    var urls = location.origin;
    var pageHeight = $(window).height();
    var pageWidth = $(window).width();
    var ajax;
    var interval;
    ////////////////////////////////////Functions//////////////////////////////////
    function playPause(myVideo) {
        if (myVideo.paused)
            myVideo.play();
        else
            myVideo.pause();
    }
    function countdown() {
        clearInterval(interval);
        interval = setInterval( function() {
            var timer = $('.js-timeout').html();
            timer = timer.split(':');
            var minutes = timer[0];
            var seconds = timer[1];
            seconds -= 1;
            if (minutes < 0) return;
            else if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

            $('.js-timeout').html(minutes + ':' + seconds);

            if (minutes == 0 && seconds == 0){
                clearInterval(interval);
                // alert("2 min over");
                $('#try').css('display' , 'none');
                $('#try_verify').css('display' , 'unset');
                // $('.kh_btn').attr('id' , 'try_verify');
            }
        }, 1000);
    }
    function getMaxHeight(selector, height) {
        $(selector).css({"max-height": pageHeight - height + "px"});
    }
    function getMinHeight(selector, height) {
        $(selector).css({"min-height": pageHeight - height + "px"});
    }
    function getMaxWidth(selector, width) {
        $(selector).css({"max-width": pageWidth - width + "px"});
    }
    function getMinWidth(selector, width) {
        $(selector).css({"min-width": pageWidth - width + "px"});
    }
    function replaceClass(selector , currentClass , newClass) {
        $(selector).toggleClass(currentClass).toggleClass(newClass);
    }

    function slideRight(value) {
        $('[data-target="' + value + '"]').click(function () {
            $('[data-toggle="' + value + '"]').toggle('slide', {
                direction : 'right'
            });
        });
        $('[data-toggle="' + value + '"] [data-prevent]').click(function (event) {
            event.stopPropagation();//close-prevent
        });
    }
    function slideleft(value) {
        $('[data-target="' + value + '"]').click(function () {
            $('[data-toggle="' + value + '"]').toggle('slide', {
                direction : 'left'
            });
        });
        $('[data-toggle="' + value + '"] [data-prevent]').click(function (event) {
            event.stopPropagation();//close-prevent
        });
    }
    function toggleFade(value) {
        $('[data-target="' + value + '"]').click(function () {
            $('[data-toggle="' + value + '"]').fadeToggle();
        });
        $('[data-toggle="' + value + '"] [data-prevent]').click(function (event) {
            event.stopPropagation();//close-prevent
        });
    }
function isset(selector) {
    return !!$(selector)[0];
}

    (function () {
        $('body').on("click",'[data-next]',function () {
            var page = $(this).closest("[data-page]").attr("data-page");

            $('[data-page="'+ page +'"]').fadeToggle();
            page++;
            setTimeout(function () {
                $('[data-page="'+ page +'"]').fadeToggle();
            },500);
        }).on("click",'[data-prev]',function () {
            var page = $(this).closest("[data-page]").attr("data-page");

            $('[data-page="'+ page +'"]').fadeToggle();
            page--;
            setTimeout(function () {
                $('[data-page="'+ page +'"]').fadeToggle();
            },500);
        });
    })()


    if(pageWidth > 992){
        function tabFade() {
            var prevent = 0;
            $('[data-target="tab"]').click(function () {
                if(prevent === 0){
                    prevent = 1;
                    $(".active-cp").toggleClass("active-cp",false,'500','linear');
                    //$(".left-side").toggle("slide");

                    $("[data-toggle='tab']").removeClass('showSlide');

                    var tab = $(this).attr("data-tab");
                    $('.right-side').find('[data-tab="' + tab + '"]').toggleClass("active-cp",true,'500','swing');
                    $('.left-side').find('[data-tab="' + tab + '"]').toggleClass("showSlide");

                    setTimeout(function () {
                        prevent = 0;
                    },500);
                }
            });
        }
    }else{
        function tabFade() {
            var prevent = 0;
            $('[data-target="tab"]').click(function () {
                if(prevent === 0){
                    prevent = 1;
                    $(".active-cp").toggleClass("active-cp",false,'500','linear');
                    //$(".left-side").toggle("slide");
                    $('.left-side').toggleClass('showSlide');
                    $("[data-toggle='tab']").removeClass('showSlide');

                    var tab = $(this).attr("data-tab");
                    $('.right-side').find('[data-tab="' + tab + '"]').toggleClass("active-cp",true,'500','swing');
                    $('.left-side').find('[data-tab="' + tab + '"]').toggleClass("showSlide");

                    setTimeout(function () {
                        prevent = 0;
                    },500);
                }
            });
        }

    }
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    function trimWords(selector){//change number of words depending on width in the category blog page
        var maxLength;
        if(pageWidth > 1000 || pageWidth >= 400 && pageWidth < 768){
            maxLength = 90 // maximum number of characters to extract
        }
        else if (pageWidth >= 768 && pageWidth < 1000){
            maxLength = 50
        }
        else if (pageWidth < 400){
            maxLength = 30
        }
        /*else if (pageWidth >= 1279){
            maxLength = 400
        }*/
        $(selector).each(function () {
            var trimmedStringOriginal = $(this).html().trim();

            //trim the string to the maximum length
            var trimmedString = trimmedStringOriginal.substr(0, maxLength);
            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

            $(this).html(trimmedString + "...");
        });
    }

    ////////////////////////////////////Events////////////////////////////////////////

    $(".window").height($(window).height());

    $(window).resize(function (){
        pageHeight = $(window).height();
        pageWidth = $(window).width();

        $(".window").height($(window).height());
        $("span[data-abort='spinner']").click(function () {
            ajax.abort();
            $("#loader").toggleClass("invisible");
        });
    });
    ////////////////////////////////////AJAX////////////////////////////////////////

//------------------------dynamics---------------------------//

    /////////////////////actives
    toggleFade("search");
    toggleFade("addadd");
    slideleft("sign");
    slideleft("upanel");
    tabFade();

    $('[data-target="menu-side"]').click(function (){
        //var stat = $(this).attr("data-menu");

        $('[data-toggle="menu-side"]').toggleClass("out");
        $('[data-toggle="menu-side-line"]').toggleClass("out");
    });

    (function () {
        $('[data-target]').click(function () {

            var value = $(this).attr("data-target");
            if(value == "employer" || value == "expert"){
                $('[data-page="2"]').fadeToggle();
                setTimeout(function () {
                    $('[data-toggle="' + value + '"]').fadeToggle();
                },500);
            }
        });
        $("[data-target]").click(function () {
            var value = $(this).attr("data-target");
            if(value == "employerback" || value == "expertback") {
                value = value.slice(0, -4);
                $('[data-toggle="' + value + '"]').fadeToggle();
                setTimeout(function () {
                    $('[data-page="2"]').fadeToggle();
                }, 500);
            }
        });
    })();

    $('[data-back="tab"]').click(function () {
        var tab = $(this).closest("[data-tab]").attr("[data-tab]");
        $('.right-side').find('.active-cp').toggleClass("active-cp");
        $('.left-side').toggleClass("showSlide")
        $('.left-side').find('.showSlide').toggleClass("showSlide");
    });

    (function () {
        $('[data-tab-target]').click(function () {
            var tab = $(this).attr("data-tab-target");

            $(this).closest(".swiper-tabs").find(".text-mos").toggleClass("text-mos");
            $(".js-tab-contents").find(".tab-active").toggleClass("tab-active").fadeToggle();

            $(this).toggleClass("text-mos");

            setTimeout(function () {
                $('[data-tab-toggle="' + tab + '"]').toggleClass("tab-active").fadeToggle();
            },500);
        });
    })();

    $('#accordion [data-toggle="collapse"]').click(function () {
        var has = $(this).closest(".card").find(".card-body").parent().hasClass("show");
        if(has){
            $("#accordion").find('.active-col').removeClass("active-col");
        }else{
            $("#accordion").find('.active-col').removeClass("active-col");
            $(this).closest(".card").toggleClass("active-col");
        }
    });

    $('#faq [data-toggle="collapse"]').click(function () {
        var has = $(this).closest(".card").find(".card-body").parent().hasClass("show");
        if(has){
            $("#faq").find('.active-col').removeClass("active-col");
        }else{
            $("#faq").find('.active-col').removeClass("active-col");
            $(this).closest(".card").toggleClass("active-col");
        }
    });

    $('[data-target="inbox"]').click(function () {
        var inbox = $(this).attr("data-inbox");
        var select = $(this).closest('[data-toggle="inbox"]');
        if(inbox !== "close"){
            select.fadeToggle();
            /*html ajax*/
            setTimeout(function () {
                select.next().fadeToggle();
            },1000);
        }else{
            select.fadeToggle();
            setTimeout(function () {
                select.prev().fadeToggle();
            },1000);
        }
    });
    $('[data-target="rand"]').click(function () {
        $('[data-toggle="mobile"]').toggle('1000','swing');
        setTimeout(function () {
            $('[data-toggle="rand"]').toggle('1000','linear');
        },1000);
    });

    $('[data-target="mobile"]').click(function () {
        $('[data-toggle="rand"]').toggle('1000','swing');
        setTimeout(function () {
            $('[data-toggle="mobile"]').toggle('1000','linear');
        },1000);
    });
    //PROFILE START

    var step = 0;
    $('.editAllow').click(function () {
        if (step === 0) {
            $(this).prev().removeAttr('readonly');
            $(this).html('ثبت');
            $(this).css('background', '#6fc989');
            step++
        } else if (step === 1) {
            $(this).prev().attr('readonly', 'readonly');
            $(this).html('ویرایش');
            $(this).css('background', 'var(--color-mos)');
            step--
        }

    });

    //PROFILE END
    ///////////////////////css
    getMaxHeight(".swiper-port-box",280);
    $(".portfolio-oddeven:odd").css("background-image", "linear-gradient(0deg, rgba(255,120,107,1) 0%, rgba(122,134,221,1) 100%)");
    $(".portfolio-oddeven:even").css("background-image", "linear-gradient(180deg, rgba(255,120,107,1) 0%, rgba(122,134,221,1) 100%)");
    $(".portfolio-box-content:odd").css("background-color", "#7A86DD");
    $(".portfolio-box-content:even").css("background-color", "rgb(255, 120, 107,0.8)");

    /*var xmin = window.matchMedia("(min-width: 992x)");
    if (xmin.matches) { // If media query matches
        $(".portfolio-box-content:odd").css("box-shadow", "0 10px 40px 0 #7A86DD");
        $(".portfolio-box-content:even").css("box-shadow", "0 10px 40px 0 #ff786b");
    }*/

    /////////trim
    trimWords(".trimCard");
    trimWords(".trimmed-words");
    //////////////////video
    $('img[id="play-vid1"]').click(function () {
        var vid = $("#video-slide1");
        playPause(vid);
    });
});
