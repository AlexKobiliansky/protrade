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

    $('.filter-item input[type=checkbox]').styler();

    $('.filter-item-top').on('click', function(){
        var th = $(this),
            parent = th.parents('.filter-item'),
            list = parent.find('.filter-item-bottom');

        parent.toggleClass('opened');
        list.slideToggle();
    });

    $('.preloader').fadeOut();

    <!-- maps -->
    // ymaps.ready(function(){
    //     var mapId = $('#map'),
    //         attitude = mapId.data("att"),
    //         longtitude = mapId.data("long"),
    //         zoom = mapId.data("zoom"),
    //         // marker = mapId.data("marker"),
    //         map = new ymaps.Map("map", {
    //             center: [attitude, longtitude],
    //             controls: ['zoomControl'],
    //             zoom: zoom
    //         });
    //
    //         myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
    //             // Опции.
    //             // Необходимо указать данный тип макета.
    //             preset: 'islands#redDotIcon',
    //         });
    //
    //     map.geoObjects.add(myPlacemark);
    //     map.behaviors.disable('scrollZoom');
    //
    //     if ($(window).width() <= 480) {
    //         map.behaviors.disable('drag');
    //     }
    // });




    /**
     * YA-MAPS
     */
        //Переменная для включения/отключения индикатора загрузки
    var spinner = $('.loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    //var myMapTemp, myPlacemarkTemp;


    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init () {
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            // marker = mapId.data("marker"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['zoomControl'],
                zoom: zoom
            }),

            myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                preset: 'islands#redDotIcon',
            });

        map.geoObjects.add(myPlacemark);
        map.behaviors.disable('scrollZoom');


        //Если нужно сместить центр карты на странице:
        //var position = map.getGlobalPixelCenter();
        //map.setGlobalPixelCenter([ position[0] - 350, position[1] ]);

        //if ($(window).width() <= 1500) {
        //map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
        //}

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = map.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.removeClass('is-active');
        });
    }


    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }


    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    var ymap = function() {
        $('.map-wrap').on( "mouseenter", function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                });
            }
        });
    };

    ymap();


});
