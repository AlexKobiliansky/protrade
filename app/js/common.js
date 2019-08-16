$(document).ready(function(){

    function heightses() {
        if ($(window).width()>=768) {
            $('.servlists').height('auto').matchHeight({byRow: true});
            $('.servlist-item-title').height('auto').matchHeight({byRow: true});
        }

        if ($(window).width()>=768) {
            $('.brand-slide').height('auto').matchHeight({byRow: true});
        }
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();


    $('.brands-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: ['', ''],
        dots: false,
        navSpeed: 800,
        dragEndSpeed: 800,
        dotsSpeed: 800,
        autoHeight: false,
        responsive : {
            0 : {
                items: 1,
                autoHeight: true,
            },
            480 : {
                items: 2
            },
            768 : {
                items: 3
            },
            992 : {
                items: 4
            }
        }
    });


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });


    <!-- javascript -->
    ymaps.ready(function(){
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            // marker = mapId.data("marker"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['zoomControl'],
                zoom: zoom
            });

            myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                // Опции.
                // Необходимо указать данный тип макета.
                preset: 'islands#redDotIcon',
            });

        map.geoObjects.add(myPlacemark);
        map.behaviors.disable('scrollZoom');

        if ($(window).width() <= 480) {
            map.behaviors.disable('drag');
        }
    });


});
