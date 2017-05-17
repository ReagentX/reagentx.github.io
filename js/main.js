
/*
Theme Name: Resumido
Description: Personal CV
Author: Rafava
Version: 1.0
*/


/* ==================================================================
 
 * Table of Contents:
 *
 * 1.0 - Loader
 * 2.0 - Carousels
 * 3.0 - Tabs
 * 4.0 - Lightbox
 * 5.0 - Menu
 * 6.0 - Frame 
 * 7.0 - Custom scrollbar
 * 8.0 - Contact form
 * 9.0 - IE bug

================================================================== */

    
$(window).load(function() {
    "use strict"; 

    //LOADER
    $("#background").delay(1000).fadeOut(800);
    $(".spinner").delay(500).fadeOut("slow");
    $(".frame-loading").delay(500).fadeOut("slow");
    
        
});


$(document).ready(function() {
    "use strict";


    //ABOUT CAROUSEL
    var a = $('.owl-about');
        a.owlCarousel({
           
           navigation : false,
           pagination:false, 
           slideSpeed : 400,
           singleItem:true

    });

    a = $('.owl-about').owlCarousel();
    
    $(".prev-slide").on("click", function() {
        a.trigger('owl.prev');
    });

    $(".next-slide").on("click", function() {
        a.trigger('owl.next');
    });


    //PORTFOLIO CAROUSEL
    var b = $('.owl-portfolio');
        b.owlCarousel({
          
           navigation : false,
           pagination:false, 
           slideSpeed : 400,
           singleItem:true

    });
    
    b = $('.owl-portfolio').owlCarousel();
    
    $(".prev-slide").on("click", function() {
        b.trigger('owl.prev');
    });

    $(".next-slide").on("click", function() {
        b.trigger('owl.next');
    });

    
    //SERVICES CAROUSEL
    var c = $('.owl-services');
        c.owlCarousel({
          
           navigation : false,
           pagination:false,
           slideSpeed : 400,
           singleItem:true
       
    });

    c = $('.owl-services').owlCarousel();
    
    $(".prev-slide").on("click", function() {
        c.trigger('owl.prev');
    });

    $(".next-slide").on("click", function() {
        c.trigger('owl.next');
    });
    

    //TABS
    $( ".main-item" ).tabs();

    
    //PORTFOLIO LIGHTBOX
    $('.test-popup-link').magnificPopup({

        type:'image',
        gallery: {
            enabled: true
        }

    });


    //MENU
    $('.navicon-button').on("click", function(e) {
        e.preventDefault();
          
        $(this).fadeOut(300);
        $('.navigation-menu').addClass('openmenu');
        $('.content').fadeOut(300);

        
    });
    $('.navigation-menu a').on("click", function(e) {
         e.preventDefault();
        
        $('.navicon-button').fadeIn(300);
        $('.navigation-menu').removeClass('openmenu');
        $('.content').delay(300).fadeIn(600);
  
    });

   
    //MENU FRAME
    $('.navicon-button').on("click", function() {

        $('.frame').delay(100).animate({height:"370px",width:'240px',backgroundColor:"rgba(0,0,0,0)"}, 40 );
    
    });
   
    //HOME FRAME
    $('.navigation-menu li:nth-child(1) a').on("click", function() {
  
        $('.frame').delay(100).animate({height:"240px",width:"240px",backgroundColor:"rgba(0,0,0,0)"}, 40 );
    
    });
   
    //ABOUT FRAME
    $('.navigation-menu li:nth-child(2) a').on("click", function() {

        $('.frame').delay(100).animate({height:"500px",width:"550px",backgroundColor:"rgba(0, 5, 5, 0.4)"}, 40 );
    
    });
  
    //EDUCATION FRAME
    $('.navigation-menu li:nth-child(3) a').on("click", function() {

        $('.frame').delay(100).animate({height:"500px",width:"550px",backgroundColor:"rgba(0, 5, 5, 0.4)"}, 40 );
    
    });
   
    //EXPERIENCE FRAME
    $('.navigation-menu li:nth-child(4) a').on("click", function() {

        $('.frame').delay(100).animate({height:"500px",width:"550px",backgroundColor:"rgba(0, 5, 5, 0.4)"}, 40 );
    
    });
   
    //PORTFOLIO FRAME
    $('.navigation-menu li:nth-child(5) a').on("click", function() {

        $('.frame').delay(100).animate({height:"500px",width:"600px",backgroundColor:"rgba(0, 5, 5, 0.4)"}, 40 );
    
    });
   
    //SERVICES FRAME
    $('.navigation-menu li:nth-child(6) a').on("click", function() {

        $('.frame').delay(100).animate({height: "370px",width:"500px",backgroundColor:"rgba(0, 5, 5, 0.4)"}, 40 );
    
    });

    //CONTACT FRAME
    $('.navigation-menu li:nth-child(7) a').on("click", function() {

        $('.frame').delay(100).animate({height: "450px",width:"500px",backgroundColor:"rgba(0, 5, 5, 0.4)"}, 40 );
    
    });


    //CUSTOM SCROLLBAR
    $(".scrll").perfectScrollbar({

        wheelSpeed:0.35,
        suppressScrollX:true
   
    });


    //CONTACT FORM
    $("input,textarea").jqBootstrapValidation({
        
        preventSubmit: true,
        submitError: function($form, event, errors) {
        // something to have when submit produces an error ?
        // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#name").val();  
        var email = $("input#email").val(); 
        var message = $("textarea#message").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
          }        
        $.ajax({
                url: "./js/mailer.php",
                type: "POST",
                data: {name: name, email: email, message: message},
                cache: false,
               
                success: function() {  
                // Success message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append( "</button>");
                $('#success > .alert-success').append("Your message has been sent. ");
                $('#success > .alert-success').append('</div>');
                            
                //clear all fields
                $('#contactForm').trigger("reset");
                },
               
                error: function() {      
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append( "</button>");
                $('#success > .alert-danger').append("Sorry "+firstName+" it seems that my mail server is not responding");
                $('#success > .alert-danger').append('</div>');
         
                //clear all fields
                $('#contactForm').trigger("reset");
                },
                })
                },
        
                filter: function() {
                return $(this).is(":visible");
                },
                });

        $("a[data-toggle=\"tab\"]").on("click", function(e) {
                e.preventDefault();
                $(this).tab("show");
        });
 
    $('#name').on("focus", function() {
    $('#success').html('');
    
    });


    //IE SCROLL BUG FIX
    if(navigator.userAgent.match(/Trident\/7\./)) {
   
    $('body').on("mousewheel", function () {
        event.preventDefault();

        var wheelDelta = event.wheelDelta;

        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });

    $('body').keydown(function (e) {

        var currentScrollPosition = window.pageYOffset;

        switch (e.which) {

            case 38: // up
                e.preventDefault(); // prevent the default action (scroll / move caret)
                window.scrollTo(0, currentScrollPosition - 120);
                break;

            case 40: // down
                e.preventDefault(); // prevent the default action (scroll / move caret)
                window.scrollTo(0, currentScrollPosition + 120);
                break;

            default: return; // exit this handler for other keys
        } 
    });
    }


});