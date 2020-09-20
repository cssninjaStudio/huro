/*! main.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Main initialization file
========================================================================== */

"use strict";

//Set environment variable (Used for development and demo)
/* 
    Possible values:
    1. development
    2. customization
*/

var env = 'development';

//Init Pageloader
initPageLoader();

$(document).ready(function () {

    //Swicth to Admin / Webapp
    switchLayouts();

    if (env === 'development') {
        //Change demo images
        changeDemoImages();
    }

    //JS background images
    initBgImages()

    //Feather icons
    feather.replace();

    //Active Link
    setActivelink();

    //Update Sidebar Naver
    updateSidebarNaver();

    //Mobile Navbar
    initMobileNavbar();

    //Mobile Navbar Hamburger
    initMobileNavbarHamburger();

    //Init sidebar (Admin Layout)
    if ($('.main-sidebar').length) {
        initSidebar();
        //openSidebar();

        if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(orientation: landscape)').matches) {
            closeSidebarPanel()
        }

        $(window).on('resize', function () {
            if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(orientation: landscape)').matches) {
                closeSidebarPanel()
            }
        })
    }

    //Init navbar (Webapp Layout)
    if ($('.view-wrapper').hasClass('is-webapp')) {
        initWebapp();
    }

    //Stuck form header
    initStuckHeader();

    //Navbar Dropdowns
    initNavbarDropdowns();

    //Regular Dropdowns
    initDropdowns();

    //Mobile Dropdowns
    initMobileDropdowns();

    //Adjust Dropdowns
    adjustDropdowns()

    //Chosen Selects
    initChosenSelects();

    //Tabs
    initTabs();

    //H Select
    initHSelect();

    //Combo Box
    initComboBox();

    //Image Combo Box
    initImageComboBox();

    //User Combo Box
    initUserComboBox();

    //Stacked Combo Box
    initStackedComboBox();

    //Big Combo Box
    initBigComboBox();

    //Accordion
    initAccordion();

    //Animated Modals
    initAnimatedModals();

    //Regular Modals
    initHModals();

    //Right Panels
    initPanels();

    //Text Tips
    initSmallTextTip();
    initTextTip();
    initMediumTextTip();

    //Animated checkbox
    initAnimatedCheckboxes();

    //Text Filter
    initCustomTextFilter();
    initTextFilter();

    //Advanced flex table
    initAdvancedFlexTable()

    //Accordion
    initSingleAccordion()

    //Collapse
    initCollapse()

    //Dark Mode
    initDarkMode();

    $(window).on('scroll', function () {
        var height = $(window).scrollTop();
        if (height > 60) {
            $('.landing-page-wrapper .navbar').removeClass('is-docked');
        } else {
            $('.landing-page-wrapper .navbar').addClass('is-docked');
        }
    });

    $('#night-toggle--daynight').on('change', function () {
        $('.landing-page-wrapper').toggleClass('is-dark');
    })

    $(".landing-page-wrapper .navbar .nav-link").on("click", function () {
        $('.landing-page-wrapper .navbar .nav-link').removeClass('is-active');
        $(this).addClass('is-active');
        if ($(this).hasClass('is-scroll')) {
            var fromTop = 50;
            var href = $(this).attr('href');
            if (href !== undefined) {

                if (href.indexOf("#") !== -1) {
                    var str = href;
                    var res = str.split("#");
                    console.log(res);

                    var $target = $("#" + res[1]);

                    if ($target.length) {
                        $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
                    }
                }

            }
        }

    });

})
