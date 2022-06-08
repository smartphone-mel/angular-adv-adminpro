/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/

const customInitFunctions = () => {
    $(function() {
        "use strict";
        $(function() {
            $(".preloader").fadeOut();
        });
        jQuery(document).on('click', '.mega-dropdown', function(e) {
            e.stopPropagation()
        });
        // ============================================================== 
        // This is for the top header part and sidebar part
        // ==============================================================  
        var set = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".sidebartoggler i").addClass("ti-menu");
            } else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }
    
            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }
    
        };
        $(window).ready(set);
        $(window).on("resize", set);
    
        // ============================================================== 
        // Theme options
        // ==============================================================     
        $(".sidebartoggler").on('click', function() {
            if ($("body").hasClass("mini-sidebar")) {
                $("body").trigger("resize");
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
                
            } else {
                $("body").trigger("resize");
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                
            }
        });
    
        // this is for close icon when navigation open in mobile view
        $(".nav-toggler").click(function() {
            $("body").toggleClass("show-sidebar");
            $(".nav-toggler i").toggleClass("ti-menu");
            $(".nav-toggler i").addClass("ti-close");
        });
    
        $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
            $(".app-search").toggle(200);
        });
        // ============================================================== 
        // Right sidebar options
        // ============================================================== 
        $(".right-side-toggle").click(function() {
            $(".right-sidebar").slideDown(50);
            $(".right-sidebar").toggleClass("shw-rside");
        });
        // ============================================================== 
        // This is for the floating labels
        // ============================================================== 
        $('.floating-labels .form-control').on('focus blur', function(e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
        // ============================================================== 
        //tooltip
        // ============================================================== 
        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        })
        // ============================================================== 
        //Popover
        // ============================================================== 
        $(function() {
            $('[data-toggle="popover"]').popover()
        })
        // ============================================================== 
        // Sidebarmenu
        // ============================================================== 
        $(function() {
            $('#sidebarnav').AdminMenu();
        });
    
        // ============================================================== 
        // Perfact scrollbar
        // ============================================================== 
        $('.scroll-sidebar, .right-side-panel, .message-center, .right-sidebar').perfectScrollbar();
        
        // ============================================================== 
        // Resize all elements
        // ============================================================== 
        $("body").trigger("resize");
        // ============================================================== 
        // To do list
        // ============================================================== 
        $(".list-task li label").click(function() {
            $(this).toggleClass("task-done");
        });
    
        
    
        // ============================================================== 
        // Collapsable cards
        // ==============================================================
        $('a[data-action="collapse"]').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
            $(this).closest('.card').children('.card-body').collapse('toggle');
    
        });
        // Toggle fullscreen
        $('a[data-action="expand"]').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
            $(this).closest('.card').toggleClass('card-fullscreen');
        });
    
        // Close Card
        $('a[data-action="close"]').on('click', function() {
            $(this).closest('.card').removeClass().slideUp('fast');
        });
    
    });
}

customInitFunctions();

/* Google Sign In! */
function js_onSignIn_fSculptor($event) { $event }
js_onSignIn_fSculptor.child_fSculptor = function($event) { $event }
function js_onFailure_fSculptor($event) { $event }
js_onFailure_fSculptor.child_fSculptor = function($event) { $event }

function js_onSignIn(googleUser) {
    js_onSignIn_fSculptor(googleUser);
    js_onSignIn_fSculptor.child_fSculptor(googleUser);
}

function js_onFailure(eError) {
    js_onFailure_fSculptor(eError);
    js_onFailure_fSculptor.child_fSculptor(eError);
}

/* Global Cookies! */
const ADMINPRO_BFORCE_LOGINREFRESH = 'ADMINPRO_BFORCE_LOGINREFRESH';

function js_getGlobalCookies(vDescription = '') {
    var aCookie = document.cookie?.split(';');
    var vSearch = (aCookie && aCookie.length > 0)
        ? aCookie?.find( x => x.split('=')[0]?.trim() === vDescription )?.split('=')
        : undefined;
    var vResult = (vSearch && vSearch.length > 1) ? vSearch[1] : undefined;

    return vResult;
    /*return
      document.cookie.split(';').find( x => x.split('=')[0] === vDescription ).split('=')[1];*/
}

function js_setGlobalCookies(vDescription = '', vValue = '') {
    // max-age: 1 week!
    document.cookie = `${vDescription}=${vValue};max-age=604800;SameSite=Lax;`;
}

function js_deleteGlobalCookies(vDescription = '') {
    document.cookie = `${vDescription}=;max-age=0;SameSite=Lax;`;
}

( () => { // js_setGlobalCookies!
    var local_ADMINPRO_BFORCE_LOGINREFRESH = js_getGlobalCookies(ADMINPRO_BFORCE_LOGINREFRESH);

    if (local_ADMINPRO_BFORCE_LOGINREFRESH == null || local_ADMINPRO_BFORCE_LOGINREFRESH == undefined )
        js_setGlobalCookies(ADMINPRO_BFORCE_LOGINREFRESH, 'true');
} ) ();
