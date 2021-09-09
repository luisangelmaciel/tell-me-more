// Variables NAV 
var mobileNav = {
    $overlayNav: $('.overlay--nav'),
    $overlayNavChild: $('.overlay--nav').children('span'),
    $overlayContent: $('.overlay--content'),
    $overlayContentChild: $('.overlay--content').children('span'),
    $navTrigger: $('.nav__trigger'),
    $nav: $('.nav--mobile'),
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

    init: function() {
        var self = this;

        // Init the layers
        this.initLayers();
        $(window).on('resize', function() {
            self.initLayers();
        });

        // Handle the transitions
        this.$navTrigger.on('click', function(e) {
            e.preventDefault();

            if (!self.$navTrigger.hasClass('is-active')) {
                // .nav--trigger active
                self.$navTrigger.addClass('is-active');

                // .overlay--nav active
                self.$overlayNavChild.addClass('is-active').one(self.transitionEnd, function() {
                    // .nav active
                    self.$nav.addClass('is-active');
                });

                // no-csstransitions fallback
                if ($('html').hasClass('no-csstransitions')) {
                    self.$nav.addClass('is-active');
                }
            } else {
                // .nav inactive
                self.$nav.removeClass('is-active').one(self.transitionEnd, function() {
                    // .overlay--nav inactive
                    self.$overlayNavChild.removeClass('is-active').off();

                    // .nav--trigger inactive
                    self.$navTrigger.removeClass('is-active');
                });

                // no-csstransitions fallback
                if ($('html').hasClass('no-csstransitions')) {
                    self.$overlayNavChild.removeClass('is-active');
                    self.$navTrigger.removeClass('is-active');
                }
            }
        });
    },

    initLayers: function() {
        var self = this;
        var diameter = (Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2)) * 2);

        self.$overlayNavChild.css({
            scaleX: 0,
            scaleY: 0,
            translateZ: 0,
            height: diameter + 'px',
            width: diameter + 'px',
            top: -(diameter / 2) + 'px',
            left: -(diameter / 2) + 'px',
        });
    }
}

mobileNav.init();

//  TABS
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent ");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none ";
    }
    tablinks = document.getElementsByClassName("tablinks ");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active ", " ");
    }
    document.getElementById(cityName).style.display = "block ";
    evt.currentTarget.className += " active ";
}

// When the user scrolls the page, execute myFunction 
window.onscroll = function() {
    myFunction()
};

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar ").style.width = scrolled + "% ";
}