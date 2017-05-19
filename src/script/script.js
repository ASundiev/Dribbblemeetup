'use strict';

var consoleFix = {
  init: function() {
    if (!(window.console && console.log)) {
      (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
          console[methods[length]] = noop;
        }
      }());
    }
  }
}

//map
var mapObj = {
    init: function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.797244, lng: 37.537806},
        zoom: 16,
        scrollwheel: false
      });

    //добавление маркеров

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(55.797044, 37.537606),
          icon: '../images/pin.png',
          map: map
      });
    }
}


var parallax = {
  init: function() {
    var $parallaxPart1 = $('.js-side-parallax-1'),
        $parallaxPart2 = $('.js-side-parallax-2'),
        $parallaxPart3 = $('.js-side-parallax-3'),
        $parallaxPart4 = $('.js-side-parallax-4'),
        $parallaxPart5 = $('.js-side-parallax-5'),
        $parallaxPart6 = $('.js-side-parallax-6');

    function setPar() {
      $parallaxPart1.css({'transform': 'translateY(-'+ $(window).scrollTop()*0.05 +'px)'});
      $parallaxPart2.css({'transform': 'translateY(-'+ $(window).scrollTop()*0.25 +'px)'});
      $parallaxPart3.css({'transform': 'translateY(-'+ $(window).scrollTop()*0.3 +'px)'});
      $parallaxPart4.css({'transform': 'translateY(-'+ $(window).scrollTop()*0.2 +'px)'});
      $parallaxPart5.css({'transform': 'translateY(-'+ $(window).scrollTop()*0.15 +'px)'});
      $parallaxPart6.css({'transform': 'translateY(-'+ $(window).scrollTop()*0.1 +'px)'});
    }
    setPar();
    $(window).scroll(setPar);
  }
}

var navigation = {
  init: function() {
    var $scrollBlock = $('.js-scroll-block'),
        $anc = $('.js-scroll-anc'),
        panelH = $('.js-pane').height();

    function navigation(wTop) {
      $scrollBlock.each(function () {

        var oTop = Math.round($(this).offset().top),
            oH = Math.round($(this).height()),
            lastSc = $('.js-page').height() - $(window).height();
        
        if (((oTop + oH) >= wTop + panelH) && (oTop <= wTop + panelH)) {
          $anc.removeClass('pane__anc--active').eq($(this).index('.js-scroll-block')).addClass('pane__anc--active');
          
          if(wTop >= lastSc) {
            $anc.removeClass('pane__anc--active').eq($anc.length - 1).addClass('pane__anc--active');

          }
        }
      });
    };

    $anc.on('click', function(e) {
      e.preventDefault();

      $('html, body').stop().animate({scrollTop: $('#' + $(this).attr('href')).offset().top - panelH}, 1000);
    });

    $('.js-menu-l').on('click', function(e) {
      e.preventDefault();

      $('html, body').stop().animate({scrollTop: $('#' + $(this).attr('href')).offset().top - panelH}, 1000);
    });

    $(window).scroll(function() {
      navigation(Math.round($(this).scrollTop()));
    });
  }
}

var screenH = {
  init: function() {
    function screen() {
      $('.js-screen').css('height', $(window).height() - $('.js-pane').outerHeight());
    }
    screen();

    $(window).resize(screen);
  }
}

//document ready

$(function() {
    //fix console bug for old browsers
    consoleFix.init();

    //parallax
    parallax.init();

    //navigation
    navigation.init();

    //screen
    screenH.init();

    //mobile burger
    $('.js-burger').on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('pane__burger--opened');

      $('.js-mobile-popup').toggleClass('mobile-popup--active').slideToggle();
    });

    $('.js-mobile-popup-item').on('click', function(e) {
      e.preventDefault();
      var panelH = $('.js-pane').height();
      $('html, body').stop().animate({scrollTop: $('#' + $(this).attr('href')).offset().top - panelH}, 1000);

      $('.js-mobile-popup').toggleClass('mobile-popup--active').slideToggle();
      $('.js-burger').toggleClass('pane__burger--opened');
    });

});
//window load
$(window).on('load', mapObj.init);

