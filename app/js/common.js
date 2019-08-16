$(document).ready(function(){

    function heightses() {
        if ($(window).width()>=768) {
            $('.servlists').height('auto').matchHeight({byRow: true});
            $('.servlist-item-title').height('auto').matchHeight({byRow: true});
        }
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();


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
});
