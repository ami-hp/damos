var urls = location.origin;
$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    // search engine
    $('#gsearchsimple').keyup(function () {
        var query = $('#gsearchsimple').val();
        $('#detail').html('');
        $('.list-group').css('display', 'block');
        if (query.length == 2) {
            $.ajax({
                url: urls + 'shop/addBasket.php',
                method: 'POST',
                data: {query: query},
                success: function (data) {
                    $('.list-group').html(data);
                }
            });
        }
        if (query.length == 0) {
            $('.list-group').css('display','none');
        }
    });

    $('#localSearchSimple').jsLocalSearch({
        "mark_text": "si"
    });

    var swiper,swiperNews,swiperPort;

    var width = $(window).width();
    swiper = new Swiper('.swiper-container', {
        speed: 2500,
        direction: 'vertical',
        mousewheel: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
    });
    var swiperTab = new Swiper('.swiper-tabs', {
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 8,
    });


    swiperPort = new Swiper('.swiper-port', {
        effect: 'coverflow',
        //freeMode: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        direction: 'vertical',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 250,
            //modifier: 2,
            modifier: 3,
            slideShadows: false,
        },
    });

    if(width >= 992){
        swiperNews = new Swiper('.swiper-news', {
            slidesPerView: 3,
            loop: true,
            centeredSlides: true,
            spaceBetween: 10,
        });

    }else{
        swiperNews = new Swiper('.swiper-news', {
            effect: 'coverflow',
            //freeMode: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                //modifier: 2,
                modifier: 2,
                slideShadows: false,
            },
        });

    }
/*---------video.js----------*/
    if(document.getElementById('video-js')){
        let player = videojs('my-video', {
            controls: true,
            autoplay: false,
            preload: 'auto',
            userActions: {
                hotkeys: function(event) {
                    // `this` is the player in this context

                    // `x` key = pause
                    if (event.which === 88) {
                        this.pause();
                    }
                    // `y` key = play
                    if (event.which === 89) {
                        this.play();
                    }
                }
            }
        });
    }

    //videojs(document.querySelector('.video-js'));

   /* $(function(){
        var $refreshButton = $('#refresh');
        var $results = $('#css_result');

        function refresh(){
            var css = $('style.cp-pen-styles').text();
            $results.html(css);
        }

        refresh();
        $refreshButton.click(refresh);

        // Select all the contents when clicked
        $results.click(function(){
            $(this).select();
        });
    });*/

    /*$('.drag-y').draggable({
        axis: "x"
    }).filter('#drag_Y').draggable("option", "axis", "y");*/
    var dragItem = document.querySelector(".drag-y");
    var container = document.querySelector(".left-line");

    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX;
            initialY = e.clientY - yOffset;
        }

        if (e.target === dragItem) {
            active = true;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        active = false;
    }

    function drag(e) {
        if (active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - e.touches[0].clientX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, dragItem);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
    /*drag menu end*/




    function fitElementToParent(el, padding) {

        var timeout = null;
        function resize() {
            if (timeout) clearTimeout(timeout);
            anime.set(el, {scale: 1});
            var pad = padding || 0;
            var parentEl = el.parentNode;
            var elOffsetWidth = el.offsetWidth - pad;
            var parentOffsetWidth = parentEl.offsetWidth;
            var ratio = parentOffsetWidth / elOffsetWidth;
            timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
        }
        resize();
        window.addEventListener('resize', resize);
    }

    var sphereAnimation = (function() {

        var sphereEl = document.querySelector('.sphere-animation');
        var spherePathEls = sphereEl.querySelectorAll('.sphere path');
        var pathLength = spherePathEls.length;
        var hasStarted = false;
        var aimations = [];

        fitElementToParent(sphereEl);

        var breathAnimation = anime({
            begin: function() {
                for (var i = 0; i < pathLength; i++) {
                    aimations.push(anime({
                        targets: spherePathEls[i],
                        stroke: {value: ['rgba(255,75,75,1)', 'rgba(255,255,255,.5)'], duration: 500},
                        translateX: [2, -4],
                        translateY: [2, -4],
                        easing: 'easeOutQuad',
                        autoplay: false
                    }));
                }
            },
            update: function(ins) {
                aimations.forEach(function(animation, i) {
                    var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                    animation.seek(animation.duration * percent);
                });
            },
            duration: Infinity,
            autoplay: false
        });

        var introAnimation = anime.timeline({
            autoplay: false
        })
            .add({
                targets: spherePathEls,
                strokeDashoffset: {
                    value: [anime.setDashoffset, 0],
                    duration: 3900,
                    easing: 'easeInOutCirc',
                    delay: anime.stagger(190, {direction: 'reverse'})
                },
                duration: 2000,
                delay: anime.stagger(60, {direction: 'reverse'}),
                easing: 'linear'
            }, 0);

        var shadowAnimation = anime({
            targets: '#sphereGradient',
            x1: '25%',
            x2: '25%',
            y1: '0%',
            y2: '75%',
            duration: 30000,
            easing: 'easeOutQuint',
            autoplay: false
        }, 0);

        function init() {
            introAnimation.play();
            breathAnimation.play();
            shadowAnimation.play();
        }

        init();

    })();


});
