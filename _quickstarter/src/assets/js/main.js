/*! main.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Main initialization file
========================================================================== */

"use strict";

//Init Pageloader
initPageLoader();

$(document).ready(function () {

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
    if ($('.main-sidebar, .sidebar-block').length) {
        initSidebar();

        if ($('[data-sidebar-open ]').length) {
            openSidebar();
        }   

        if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(orientation: landscape)').matches) {
            closeSidebarPanel()
        }

        $(window).on('resize', function () {
            if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(orientation: landscape)').matches) {
                closeSidebarPanel()
            }
        })
    }

    //Navbar Dropdowns
    initNavbarDropdowns();

    //Regular Dropdowns
    initDropdowns();

    //Mobile Dropdowns
    initMobileDropdowns();

    //Adjust Dropdowns
    adjustDropdowns()

    //Tabs
    initTabs();

    initTabbedWidgets();

    //H Select
    initHSelect();

    //Regular Modals
    initHModals();

    //Right Panels
    initPanels();

    //Animated checkbox
    initAnimatedCheckboxes();

    //Search
    initSearch();

    //Dark Mode
    initDarkMode();

})
