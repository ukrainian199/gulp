// Anchor link.
$(document).ready(function () {
    if (window.location.hash) {
        var id = window.location.hash,
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 100
        }, 200);
    }

    $(document).on('click', '.anchor', function (e) {
        e.preventDefault();

        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 100
        }, 1000);
    });
});

//Hamburger.
function mobileMenu($this) {
    var $thisJQ = $($this),
        $nav = $('.right'),
        $body = $('body'),
        $html = $('html');
    if ($thisJQ.hasClass('active')) {
        $thisJQ.removeClass('active');
        $nav.removeClass('active');
        $body.removeClass('hidden');
        $html.removeClass('hidden');
    } else {
        $thisJQ.addClass('active');
        $nav.addClass('active');
        $body.addClass('hidden');
        $html.addClass('hidden');

    }
}
$('#toggle').on('click', function () {
    mobileMenu(this);
});

$(document).on('click', '.menu-list > .menu-item > a.anchor', function (e) {
    e.preventDefault();
    var buttonTogle = document.getElementById('toggle');
    mobileMenu(buttonTogle);
});

// Video.
if ($('.bg-video').attr('data-name')) {
    var videoPlayer;
    jQuery(function () {
        var video_url = $('div.bg-video').attr('data-name');
        var video_img = $('div.bg-video').attr('data-img');
        var options = {
            videoURL: video_url,
            mute: true,
            showControls: false,
            coverImage: video_img,
            containment: '#videoPlayer',
            autoPlay: true,
            showYTLogo: false,
            stopMovieOnBlur: false,
            playOnlyIfVisible: false,
            showAnnotations: false,
            startAt: 0,
            anchor: 'center,center'
        };
        videoPlayer = jQuery(".bg-video").YTPlayer(options);
    });
}

if ($('.video-player-main')) {
    var playerMain;
    jQuery(function () {
        playerMain = jQuery("#playerMain").YTPlayer();
    });
}