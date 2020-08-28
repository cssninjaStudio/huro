/*! main.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Main initialization file
========================================================================== */

"use strict";

//Init Pageloader
initPageLoader();

$(document).ready(function () {

    //Change demo images
    changeDemoImages();

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

    //Init sidebar
    if ($('.main-sidebar').length) {
        initSidebar();
        openSidebar();
    }

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
    initTextFilter();

    //Advanced flex table
    initAdvancedFlexTable()

    //Accordion
    initSingleAccordion()

    //Collapse
    initCollapse()

    //Dark Mode
    initDarkMode();

    //TEMP
    if ($('.view-wrapper').hasClass('is-webapp')) {
        var pageTitle = $('.view-wrapper').attr('data-page-title');
        $('#webapp-page-title').html(pageTitle);

        //Inifnite Scroll
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= $(
                'body').offset().top + $('body').
                    outerHeight() - window.innerHeight) {

                alert('You reached the end of the DIV');
            }
        });
    }

    $(window).on('scroll', function () {
        var height = $(window).scrollTop();
        if (height > 10) {
            $(".webapp-navbar.is-transparent").addClass('is-scrolled');
        } else {
            $(".webapp-navbar.is-transparent").removeClass('is-scrolled');
        }
    });

    $('.webapp-navbar .centered-link-toggle').on('click', function () {
        var menu = $(this).attr('data-menu-id');

        if ($(this).hasClass('is-active') && $('.webapp-subnavbar').hasClass('is-active')) {
            $('.webapp-subnavbar').removeClass('is-active');
            $(".webapp-navbar").removeClass('is-solid');

        } else {
            $('.webapp-subnavbar').addClass('is-active');
            $(".webapp-navbar").addClass('is-solid');
        }

        $('.webapp-navbar .centered-link').removeClass('is-active');
        $(this).addClass('is-active');
        $('.webapp-subnavbar-inner').removeClass('is-active');
        $("#" + menu).addClass('is-active');
    });

    var activeWebappMenu = $('.view-wrapper').attr('data-menu-item');
    $('.centered-link-toggle').removeClass('is-active');
    $(activeWebappMenu).addClass('is-active');

    $('.webapp-navbar .centered-link-search, #webapp-navbar-search-close').on('click', function () {
        $('#webapp-navbar-menu, #webapp-navbar-search').toggleClass('is-hidden');
    });


})
