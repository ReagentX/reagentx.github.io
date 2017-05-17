/* plugin for labels to be placed over input fields in contact page */
jQuery.fn.labelOver = function (overClass) {
    return this.each(function () {
        var label = jQuery(this);
        var f = label.attr('for');
        if (f) {
            var input = jQuery('#' + f);
            this.hide = function () {
                label.css({
                    textIndent: -10000
                })
            }
            this.show = function () {
                if (input.val() == '') label.css({
                    textIndent: 0
                })
            }
            // handlers
            input.focus(this.hide);
            input.blur(this.show);
            label.addClass(overClass).click(function () {
                input.focus()
            });
            if (input.val() != '') this.hide();
        }
    })
}

var divOpenControl = 0;

$(document).ready(function () {
    if (window.location.hash != '') {
        var url = window.location.hash.replace('#', '');

        $('select.mainMenu > option').each(function () {
            if ($(this).val().replace('.html', '') == url)
                $(this).attr('selected', 'selected');
        });

        getPageContent(url + ".html");
    }
    else {
        var url = window.location.pathname.replace('/', '').toString();

        if (url.indexOf('index.html') > 0)
            url = 'index.html';
        else if (url.indexOf('indexVideo.html') > 0)
            url = 'indexVideo.html';
        else if (url.indexOf('indexImage.html') > 0)
            url = 'indexImage.html';

        $('select.mainMenu > option').each(function () {
            if ($(this).val() == url)
                $(this).attr('selected', 'selected');
        });

        $('#menu').addClass('homePage');
        $('#select').addClass('selectMenu');
        $('a.logo').addClass('homeLogo');
    }

    $('ul.mainMenu>li').hover(function () {
        $(this).find('ul.subMenu').slideDown('fast');
        $(this).find('ul.subMenu').parent().addClass('third-color-bg');
    }, function () {
        if (window.innerWidth > 480) {
            $(this).find('ul.subMenu').slideUp('fast');
        }
        $(this).find('ul.subMenu').parent().removeClass('third-color-bg');
    });

    $('ul.socialLinks>li>div').hover(function () {
        $(this).stop().animate({ marginRight: 0 }, 250, function () { });
    },
    function () {
        $(this).stop().animate({ marginRight: '-73px' }, 250, function () { });
    });

    $('.mainMenu a').click(function () {
        var url = $(this).attr("href");
        if (url == 'index.html' || url == 'indexVideo.html' || url == 'indexImage.html' || url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
            return true;
        }
        else if (url == "javascript:;")
            return false;
        else {
            if (url.replace('.html', '') != window.location.hash.replace('#', '')) {
                getPageContent(url);
            }

            window.location.hash = url.replace('.html', '');
            return false;
        }
    });

    $('select.mainMenu').change(function () {
        var url = $(this).val();

        $(this).attr('selected', 'selected');
        if (url == 'index.html' || url == 'indexVideo.html' || url == 'indexImage.html'|| url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
            location.href = url;
        }
        else {
            if (url.replace('.html', '') != window.location.hash.replace('#', '')) {
                getPageContent(url);
            }

            window.location.hash = url.replace('.html', '');
            return false;
        }
    });

    $(window).scroll(function () {

        var y_scroll_pos = window.pageYOffset;
        var scroll_pos_test = 150;             // set to whatever you want it to be

        if (y_scroll_pos > scroll_pos_test) {
            $('.top').fadeIn(1000);
        } else {
            $('.top').fadeOut(500);
        }
    });

    $('.top').click(function () {
        $('body').scrollTo(0, 800, { queue: true });
        return false;
    });

});

function goHome() {
    $('.pages').fadeOut('slow');

    $('.slides-navigation').fadeIn('slow');
    $('.slide-text').fadeIn('slow');
    $('#loading').fadeOut('slow');

    window.location.hash = '';
}

function getPageContent(pageUrl) {
    $('.pages').fadeOut('slow');
    $('#loading').fadeIn('slow');

    $.ajax({
        url: pageUrl,
        contentType: "application/json;charset=utf-8;",
        dataType: "html",
        success: function (html) {
            $('.slides-navigation').fadeOut('slow');
            $('.slide-text').fadeOut('slow');

            setTimeout(function () {
                $('.pages').html(html);
                $('.pages').fadeIn('slow');
                $('#loading').fadeOut('fast');

                pageFunctionsLoad();
            }, 500);

            $('#menu').removeClass('homePage');
            $('#select').removeClass('selectMenu');
            $('a.logo').removeClass('homeLogo');
        },
        error: function () {
            $('#loading').fadeOut('fast');
        }
    });
}

function pageFunctionsLoad() {

    getPortfolioPageItems();

    $('.accordion').accordion();

    $('.scroll-pane').jScrollPane({ horizontalBar: true });

    /*JS code for toggle operations start*/
    $('.toggle>h5').click(function () {
        var index = $('.toggle>h5').index($(this));
        var text = $('.toggle>p').eq(index);
        if (text.is(':hidden')) {
            text.slideDown('300');
            $(this).addClass('active');
        }
        else {
            text.slideUp('300');
            $(this).removeClass('active');
        }
    });
    /*JS code for toggle operations end*/

    $('.commentAdd label').labelOver('over');
    $('.contact-form label').labelOver('over');

    $('.skill-title > span').each(function () {
        var skillProgW = $(this).html();
        var skillW = $(this).parent().width()

        if (skillProgW > 100)
            $(this).stop().animate({ width: skillW }, 800, function () { });
        else {
            var newW = ((skillW * skillProgW) / 100);
            $(this).stop().animate({ width: newW }, 800, function () { });
        }
    });

    /*function which validates input with required class in blog detail*/
    $("#commentAdd a").click(function () {
        $('#commentAdd').validate({
            errorPlacement: function (error, element) {
                error.appendTo();
            }
        }).form();
    });

    /*post operation for contact page*/
    $("#contact a").click(function () {
        $('#contact #loadingForm').fadeIn('slow');

        /*function which validates input with required class in contact page */
        var myform = $("#contact").validate({
            email: true,
            errorPlacement: function (error, element) {
                error.appendTo();
            }
        }).form();

        /*myform returns true if form is valid.*/
        if (myform) {
            var action = $("#contact").attr('action');
            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                web: $('#web').val(),
                message: $('#message').val()
            },
					function (data) {
					    d = data;
					    $('.response').remove();

					    if (data == 'Message sent!') {
					        $('#contact a').attr('disabled', '');
					        $('#contact').append('<span class="success"></p>');
					    }
					    else {
					        $('#contact').append('<span class="response"></span>');
					    }
					});
        }
        $('#contact #loadingForm').fadeOut('slow');
        return false;
    });

    tb_init('a.thickbox, area.thickbox, input.thickbox'); //pass where to apply thickbox
    imgLoader = new Image(); // preload image
    imgLoader.src = tb_pathToImage;

    MapLoad();
};

function getPortfolioPageItems() {
    $.ajax({
        type: "GET",
        url: "portfolio.xml",
        dataType: "xml",
        success: function (xml) {
            var cntnt = "";
            var cssName = "";
            var url = window.location.hash.replace('#', '');

            if (url == 'portfolioC6')
                cssName = "port2";
            else if (url == 'portfolioC4')
                cssName = "port3";
            else if (url == 'portfolioC3')
                cssName = "port4";

            $(xml).find('item').each(function () {
                var id = $(this).attr('id');
                var name = $(this).find('name').text();
                var title = $(this).find('title').text();
                var img = $(this).find('img').text();

                cntnt = "<li class='" + cssName + "' rel='" + title + "'><div class='wrap'>";
                cntnt += "<a href='" + id + "'><img src='" + img + "' alt='port-item' /><div class='mask'><span class='text-color'>" + name + "</span> <span class='third-color detail'>" + title + "</span></div></a>";
                cntnt += "</div></li>";

                $('ul.portfolio').append(cntnt);
            });

            /*This function for filter operations and animation of portfolio page start*/
            $("ul.portfolio a").click(function () {
                if (divOpenControl == 0) {
                    divOpenControl = 1;

                    itemId = $(this).attr("href");
                    getPortfolio(itemId);
                } else {
                    closePortfolio();

                    divOpenControl = 0;
                }
                return false;
            });

            var filterItems = new Array();
            $("ul.portfolio li").each(function () {
                var filterItem = $(this).attr('rel');

                if (filterItems.indexOf(filterItem) < 0) {
                    filterItems.push(filterItem);
                }
            });

            for (var i = 0; i < filterItems.length; i++) {
                if (i == 0) {
                    $('div.filter').append('<a href="javascript:;" class="btn small color1 active" rel="all">All</a>');
                }

                $('div.filter').append('<a href="javascript:;" class="btn small color1" rel="' + filterItems[i] + '">' + filterItems[i] + '</a>');
            }

            $("div.filter > a").click(function () {
                if (!$(this).hasClass('active')) {
                    $('div.filter > a').removeClass('active');
                    $(this).addClass('active');
                    $("ul.portfolio li").fadeOut('slow');
                    $('#loadingFilter').fadeIn('slow');
                    var selectedGroup = $(this).attr('rel');
                    if (selectedGroup == "all") {
                        setTimeout(function () {
                            $("ul.portfolio li").fadeIn('slow');
                        }, 500);

                    }
                    else {
                        setTimeout(function () {
                            $("ul.portfolio li").each(function () {
                                if ($(this).attr('rel') != selectedGroup) {
                                    $(this).fadeOut('slow');
                                }
                                else {
                                    $(this).fadeIn('slow');
                                }
                            });
                        }, 1000);

                    }
                    $('#loadingFilter').fadeOut('slow');
                }
            });
            /*This function for filter operations and animation of portfolio page end*/
        }
    });
}

function closePortfolio() {
    divOpenControl = 0;
    $(".portfolioContent").fadeOut("slow");
    $('ul.portfolio').stop(true, true).delay(400).animate({ marginTop: '0px' }, 400, function () { });
}

function getPortfolio(pId) {
    $(".portfolioContent").fadeOut("slow");
    $.ajax({
        type: "GET",
        url: "portfolio.xml",
        dataType: "xml",
        success: function (xml) {
            var cntnt = "";

            cntnt = "<a href=\"javascript:closePortfolio();\" class=\"text-color closePortfolio\">X</a>"
            $(xml).find('item').each(function () {
                var id = $(this).attr('id');
                if (id == pId) {
                    var name = $(this).find('name').text();
                    var title = $(this).find('title').text();
                    var content = $(this).find('content').text();

                    cntnt += "<div class=\"span6 slides\" style=\"margin-left:0px;\"><ul class=\"img-cycle\">";
                    $(this).find('image').each(function () {
                        var img = $(this).text();

                        cntnt += "<li>";
                        cntnt += "<img src=\"" + img + "\" alt=\"item\" />";
                        cntnt += "</li>";
                    });
                    cntnt += "</ul></div>";

                    cntnt += "<div class=\"span6 content\">";
                    cntnt += "<h3 class=\"text-color\">" + name + "</h3>";
                    cntnt += "<span class=\"third-color\">" + title + "</span>";
                    cntnt += "<p>" + content + "</p>";
                    cntnt += "</div>";
                }
            });

            setTimeout(function () {
                $('.portfolioContent').html(cntnt).fadeIn('slow');
                $(".img-cycle").bxSlider({
                    auto: true,
                    pause: 4000,
                    pager: false,
                    captions: false,
                    pagerType: "short",
                    speed: 1000
                });

            }, 500);

            $('body').scrollTo(225, 800, { queue: true });
        }
    });
}

/*google map installation process*/
function MapLoad() {
    var Lat = 40.00432;
    var Lng = -74.953249;

    var mapOptions = {
        center: new google.maps.LatLng(Lat, Lng),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
}