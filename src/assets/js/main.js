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

    //Main Sidebar
    initSidebar();

    //Update Sidebar Naver
    updateSidebarNaver();

    //Mobile Navbar
    initMobileNavbar();

    //Mobile Navbar Hamburger
    initMobileNavbarHamburger();

    //Init sidebar
    openSidebar();

    //Navbar Dropdowns
    initNavbarDropdowns();

    //Regular Dropdowns
    initDropdowns();

    //Mobile Dropdowns
    initMobileDropdowns();

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

})
