/*! functions.js | Huro | Css ninja 2020-2021 */

"use strict";

//Set environment variable (Used for development and demo)
/* 
    Possible values:
    1. development
    2. customization
*/

var env = 'customization';

//Theme colors to be used from JS
var themeColors = {
    primary: '#671cc9',
    primaryMedium: '#d4b3ff',
    primaryLight: '#f4edfd',
    secondary: '#ff227d',
    accent: '#797bf2',
    success: '#06d6a0',
    info: '#039BE5',
    warning: '#faae42',
    danger: '#FF7273',
    purple: '#8269B2',
    blue: '#37C3FF',
    green: '#93E088',
    yellow: '#FFD66E',
    orange: '#FFA981',
    lightText: '#a2a5b9',
    fadeGrey: '#ededed',
}

//Pageloader
function initPageLoader() {
    if ($('.pageloader').length) {

        $('.pageloader').toggleClass('is-active');

        $(window).on('load', function () {
            var pageloaderTimeout = setTimeout(function () {
                $('.pageloader').toggleClass('is-active');
                $('.infraloader').toggleClass('is-active')
                clearTimeout(pageloaderTimeout);
                setTimeout(function () {
                    $('.rounded-hero').addClass('is-active');
                }, 350)
            }, 700);
        })
    }
}

//Set Active Links
function setActivelink() {
    var url = window.location.href;
    var activePage = url;
    $('.sidebar-panel .inner ul li a, .mobile-subsidebar ul li a').each(function () {
        var linkPage = this.href;

        if (activePage == linkPage) {
            $(this).closest("li").addClass("is-active");
            $(this).closest('.has-children').find('ul').slideToggle();
            $(this).closest('.has-children').addClass('active');
        }
    });

    $('.main-sidebar .sidebar-inner ul li a').each(function () {
        var linkPage = this.href;

        if (activePage == linkPage) {
            $(this).closest("li").find('a').addClass("is-selected");
        }
    });

    $('.webapp-subnavbar-inner .center ul li a').each(function () {
        var linkPage = this.href;

        if (activePage == linkPage) {
            $(this).closest("li").addClass("is-active");
            $(this).closest(".tab-content").addClass("is-active").siblings('.tab-content').removeClass('is-active');
            var tabId = $(this).closest('.tab-content').attr('id');
            $(this).closest(".webapp-subnavbar-inner").find('.tabs ul li').removeClass('is-active');
            $('[data-tab=' + tabId + ']').addClass('is-active');
        }
    });
}

//Main Sidebar
function initSidebar() {
    $('.huro-hamburger').on("click", function () {
        if ($(this).hasClass('full-push')) {
            var sidebar = $(this).attr('data-sidebar');
            $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass('active');
            $('#' + sidebar).toggleClass('is-active');
            $('.view-wrapper').toggleClass('is-pushed');
            $('.main-sidebar, .sidebar-brand').toggleClass('is-bordered');
            $('body').toggleClass('opened');
        }

        if ($(this).hasClass('push-resize')) {
            var sidebar = $(this).attr('data-sidebar');
            $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass('active');
            $('#' + sidebar).toggleClass('is-active');
            $('.view-wrapper').toggleClass('is-pushed-full');
            $('.main-sidebar, .sidebar-brand').toggleClass('is-bordered');
            $('body').toggleClass('opened');

            if ($(this).hasClass('messages-push')) {
                $('.view-wrapper').toggleClass('is-pushed-messages');
                $('.collapsed-messaging').toggleClass('is-active');
                $('body').toggleClass('is-chat-side-collapsed');
            }
        }

        if ($(this).hasClass('push-search')) {
            var sidebar = $(this).attr('data-sidebar');
            $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass('active');
            $('#' + sidebar).toggleClass('is-active');
            $('.view-wrapper').toggleClass('is-pushed-search');
            $('.main-sidebar, .sidebar-brand').toggleClass('is-bordered');
            $('body').toggleClass('opened');
        }

    })

    //Close sidebar
    $('.panel-close').on('click', function () {
        $(this).closest('.sidebar-panel').removeClass('is-active');
        $('.huro-hamburger .icon-box-toggle').removeClass('active');
        $('.main-sidebar, .sidebar-brand').toggleClass('is-bordered');
        $('body').toggleClass('opened');
    })

    //Sidebar links default behaviour
    $('.main-sidebar ul li a').on('click', function () {
        $('.main-sidebar ul li a').removeClass('is-selected');
        $(this).addClass('is-selected');
    })

    //Collapsible submenu items
    $(".has-children .parent-link").on("click", function (i) {
        i.preventDefault();
        if (!$(this).closest('.has-children').hasClass("active")) {
            $(".sidebar-panel .has-children ul, .mobile-subsidebar .has-children ul").slideUp();
            $(this).closest('.has-children').find('ul').slideToggle();
            $(".sidebar-panel .has-children, .mobile-subsidebar .has-children").removeClass("active");
            $(this).closest('.has-children').addClass("active");
        }
        else {
            $(this).closest('.has-children').find('ul').slideToggle();
            $(".sidebar-panel li, .mobile-subsidebar li").removeClass("active");
        }
    });

    //User menu naver position
    $('#user-menu').on('click', function () {
        $('.naver').addClass('from-bottom');
        $('.naver').css({
            'margin-bottom': 64
        });
    });

    $(window).on('scroll', function () {
        var height = $(window).scrollTop();
        if (height > 80) {
            $(".circular-menu").addClass('is-active');
        } else {
            $(".circular-menu").removeClass('is-active active');
        }
    });
}

//Close sidebar
function closeSidebarPanel() {
    $('.sidebar-panel.is-active').removeClass('is-active');
    $('.huro-hamburger .icon-box-toggle').removeClass('active');
    $('.view-wrapper').removeClass('is-pushed-full');
    $('.main-sidebar, .sidebar-brand').toggleClass('is-bordered');
    $('body').toggleClass('opened');
}

//Sidebar Flying Naver
function updateSidebarNaver() {
    var activeItem = $('[data-menu-item]').attr('data-menu-item');
    var mobileActiveItem = $('[data-mobile-item]').attr('data-mobile-item');
    $(activeItem).addClass('is-active');
    $(mobileActiveItem).addClass('is-active');

    if ($('[data-naver-offset]').length) {
        var naverOffset = parseInt($('.view-wrapper').attr('data-naver-offset'));
        $('.naver').removeClass('from-bottom');
        $('.naver').css({
            'margin-top': naverOffset,
        });
    }
    else if ($('[data-naver-offset-bottom]').length) {
        var naverOffsetBottom = parseInt($('.view-wrapper').attr('data-naver-offset-bottom'));
        $('.naver').addClass('from-bottom');
        $('.naver').css({
            'margin-bottom': naverOffsetBottom,
        });
    }
}

//Mobile Navbar
function initMobileNavbar() {
    $(window).on('scroll', function () {
        var height = $(window).scrollTop();
        if (height > 65) {
            $(".mobile-navbar").removeClass('no-shadow');
        } else {
            $(".mobile-navbar").addClass('no-shadow');
        }
    });
}

//Mobile Navbar Hamburger
function initMobileNavbarHamburger() {
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function () {
            $(this).toggleClass('is-active');
            if ($('.mobile-main-sidebar').hasClass('is-active')) {
                $('.mobile-main-sidebar, .mobile-subsidebar').removeClass('is-active');
            } else {
                $('.mobile-main-sidebar, .mobile-subsidebar').addClass('is-active');
            }
        });
    }
}

//Init Sidebar on page load
function openSidebar() {
    $('.nav-trigger .menu-toggle .icon-box-toggle').toggleClass('active');
    $('.sidebar-panel').addClass('is-active');
    $('.view-wrapper').addClass('is-pushed-full');
    $('body').addClass('opened');
    $('.main-sidebar, .sidebar-brand').addClass('is-bordered');
}

//Navbar Dropdowns
function initNavbarDropdowns() {
    $('.has-dropdown').on('click', function () {
        $('.has-dropdown').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $(document).on('click', function (e) {
        var target = e.target;
        if (!$(target).is('.has-dropdown .navbar-link') && !$(target).parents().is('.has-dropdown')) {
            $('.has-dropdown').removeClass('is-active');
        }
    });
}

//Regular Dropdowns
function initDropdowns() {
    $('.dropdown-trigger').on('click', function () {
        $('.dropdown').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $(document).on('click', function (e) {
        var target = e.target;
        if (!$(target).is('.dropdown img, .kill-drop') && !$(target).parents().is('.dropdown')) {
            $('.dropdown').removeClass('is-active');
        }
        if ($(target).is('.kill-drop')) {
            $('.dropdown').removeClass('is-active');
        }
    });
}

//Mobile Dropdowns
function initMobileDropdowns() {
    $('.has-dropdown.is-mobile').on('click', function () {
        $(this).find('.navbar-link').toggleClass('is-active');
        $(this).find('.mobile-dropdown').slideToggle();
    })
}

//Adjust dropdowns
function adjustDropdowns() {
    $('.dropdown').each(function () {
        var $this = $(this);

        if (($(this).offset().top + $(this).height()) >= ($(window).height() - 250)) {
            $($this).addClass("is-up");
        }
        else {
            $($this).removeClass("is-up");
        }
    })

    $(window).on('scroll', function () {
        $('.dropdown').each(function () {
            var $this = $(this);

            if (($(this).offset().top + $(this).height()) >= ($(window).height() - 250)) {
                $($this).addClass("is-up");
            }
            else {
                $($this).removeClass("is-up");
            }
        })
    })
}

//Launch an alert dialog
function initConfirm(title, message, maximizable, closableByDimmer, okLabel, cancelLabel, callback) {
    alertify.confirm('confirm').set({
        transition: 'fade',
        title: title,
        message: message,
        movable: false,
        maximizable: maximizable,
        closableByDimmer: closableByDimmer,
        labels: {
            ok: okLabel,
            cancel: cancelLabel
        },
        reverseButtons: true,
        'onok': callback
    }).show();
}

//Tabs
function initTabs() {
    $('.tabs-inner .tabs li, .vertical-tabs-wrapper .tabs li').on('click', function () {
        var tab_id = $(this).attr('data-tab');

        //$(this).closest('.tabs-wrapper').find('> .tabs-inner > .tabs > li.is-active').removeClass('is-active');
        //$(this).addClass('is-active');

        $(this).siblings('li').removeClass('is-active');
        $(this).addClass('is-active');

        $(this).closest('.tabs-wrapper, .vertical-tabs-wrapper').find('.tab-content').removeClass('is-active');
        $("#" + tab_id).addClass('is-active');
    });


    /*$('.tabs-wrapper.is-slider .tabs a').on('click', function () {
        $(this).closest('.tabs-wrapper').find('.tab-naver').toggleClass('is-active');
    })*/
}

//H Select
function initHSelect() {
    $('.h-select').on('click', function () {
        $(this).toggleClass('is-active');
    })

    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.h-select') && !$(target).parents().is('.control')) {
            $('.h-select').removeClass('is-active');
        }
    });

    $('.h-select input').on('change', function () {
        var selectedValue = $(this).siblings('.option-meta').find('span').text();
        $(this).closest('.h-select').find('.select-box span').html(selectedValue);
    })
}


//Regular Modals
function initHModals() {
    var modalID;
    if ($('.h-modal-trigger').length) {
        $('.h-modal-trigger').on('click', function () {
            modalID = $(this).attr('data-modal');
            $('#' + modalID).toggleClass('is-active');
        })

        $('.h-modal-close').on('click', function () {
            $(this).closest('.modal').removeClass('is-active');
        })
    }
}

//Right Panels
function initPanels() {
    var panelId;
    if ($('.right-panel-trigger').length) {
        $('.right-panel-trigger').on('click', function () {
            panelId = $(this).attr('data-panel');
            $('#' + panelId).addClass('is-active');

            if (panelId == 'search-panel') {
                $('.right-panel .search-input').focus();
            }
        })

        $('.panel-overlay, .right-panel .close-panel').on('click', function () {
            $(this).closest('.right-panel-wrapper').removeClass('is-active');
        })
    }
}

//Scroll to top
function scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//Toast
function launchToast(title, message, position, timeout) {
    iziToast.show({
        class: 'h-toast',
        icon: icon,
        title: title,
        message: message,
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: "#fff",
        backgroundColor: '#5d4394',
        progressBarColor: '#444F60',
        position: position,
        transitionIn: 'fadeInUp',
        close: false,
        timeout: timeout,
        zindex: 99999,
    });
}

//Dark Mode
function initDarkMode() {
    $('.dark-mode input').on('change', function () {
        if ($(this).prop('checked') === true) {
            $('html, body').removeClass('is-dark');
            $('.theme-image').each(function () {
                var imageUrl = $(this).attr('data-light');
                $(this).attr('src', imageUrl);
            });
        } else {
            $('html, body').addClass('is-dark');
            $('.theme-image').each(function () {
                var imageUrl = $(this).attr('data-dark');
                $(this).attr('src', imageUrl);
            });
        }
    })
}

//Animated chackboxes
function initAnimatedCheckboxes() {
    $('.animated-checkbox input').each(function () {
        var $this = $(this);
        if ($(this).closest('.animated-checkbox').hasClass('is-checked')) {
            $(this).closest('.animated-checkbox').addClass('is-checked');
            $this.closest('.animated-checkbox').find('.shadow-circle').addClass('is-opaque');
            setTimeout(function () {
                $this.closest('.animated-checkbox').removeClass('is-unchecked');
            }, 150);
        } else {
            $(this).closest('.animated-checkbox').addClass('is-unchecked').removeClass('is-checked');
            setTimeout(function () {
                $this.closest('.animated-checkbox').find('.shadow-circle').removeClass('is-opaque');
            }, 150);
        }
    });
    $('.animated-checkbox input').on('change', function () {
        var $this = $(this);
        if ($(this).closest('.animated-checkbox').hasClass('is-checked')) {
            $(this).closest('.animated-checkbox').addClass('is-unchecked').removeClass('is-checked');
            setTimeout(function () {
                $this.closest('.animated-checkbox').find('.shadow-circle').removeClass('is-opaque');
            }, 150);
        } else {
            $(this).closest('.animated-checkbox').addClass('is-checked');
            $this.closest('.animated-checkbox').find('.shadow-circle').addClass('is-opaque');
            setTimeout(function () {
                $this.closest('.animated-checkbox').removeClass('is-unchecked');
            }, 150);
        }
    });
}

//Go back in history
function goBack() {
    window.history.go(-1);
}


//Back to top
function initBackToTop() {
    var pxShow = 600;
    var scrollSpeed = 500;
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= pxShow) {
            $("#backtotop").addClass('visible');
        } else {
            $("#backtotop").removeClass('visible');
        }
    });
    $('#backtotop a').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, scrollSpeed);
        return false;
    });
}


//Fake json search demo
function initSearch() {
    $('.search-input').each(function () {
        $(this).on('keyup', function () {
            var $container = $(this).closest('.control');
            var searchQuery = $(this).val();
            var expression = new RegExp(searchQuery, "i");
            $.getJSON('assets/data/search.json', function (data) {
                $container.find('.search-results .search-result, .search-results .placeholder-wrap').remove();
                $.each(data, function (key, value) {
                    if (value.name.search(expression) != -1 || value.position.search(expression) != -1) {

                        if (value.pic != null) {
                            var template = `
                                    <a class="search-result">
                                        <div class="h-avatar is-small">
                                            <img class="${value.type === 'user' ? 'avatar' : 'article'}" src="${value.pic}" alt="">
                                        </div>
                                        <div class="meta">
                                            <span>${value.name}</span>
                                            <span>${value.position}</span>
                                        </div>
                                    </a>
                                `

                            $container.find('.search-results').append(template);
                        }

                        else {

                            var classes = new Array('is-danger', 'is-info', 'is-primary', 'is-success', 'is-warning', 'is-h-purple', 'is-h-blue', 'is-h-green', 'is-h-orange', 'is-h-red', 'is-h-green');
                            var length = classes.length;
                            var randomClass = classes[Math.floor(Math.random() * length)];

                            var template = `
                                    <a class="search-result">
                                        <div class="h-avatar is-small">
                                            <span class="avatar is-fake ${randomClass}">
                                                <span>${value.initials}</span>
                                            </span>
                                        </div>
                                        <div class="meta">
                                            <span>${value.name}</span>
                                            <span>${value.position}</span>
                                        </div>
                                    </a>
                                `

                            $container.find('.search-results').append(template);
                        }

                    }
                })

                if ($('.search-result').length === 0) {
                    var placeholder = `
                            <div class="placeholder-wrap">
                                <div class="placeholder-content has-text-centered">
                                    <img class="light-image" src="assets/img/illustrations/placeholders/search-4.svg" alt="" />
                                    <img class="dark-image" src="assets/img/illustrations/placeholders/search-4-dark.svg" alt="" />
                                    <h3 class="dark-inverted">No Matching Results</h3>
                                    <p>Sorry, we couldn't find any matching records. Please try different search terms.</p>
                                </div>
                            </div>
                        `

                    $container.find('.search-results').append(placeholder);
                }
            })

            if (searchQuery === '') {
                $container.find('.search-results').removeClass('is-active');
            } else {
                $container.find('.search-results').addClass('is-active');
            }
        });
    });
}

//Customize Datatable
function customizeDatatable() {
    $('.datatable-filter-cell').find('.input').wrap("<div class='control has-icon'></div>");
    var searchIcon = `
        <div class="form-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
    `;
    $('.datatable-filter-cell').find('.control.has-icon').append(searchIcon);

    $('.datatable-filter-cell').find('select').wrap("<div class='field'><div class='control has-icons-left'><div class='select'></div></div></div>");
    var selectIcon = `
        <div class="icon is-small is-left">
            <i class="lnil lnil-menu-circle"></i>
        </div>
    `;
    $('.datatable-filter-cell').find('.control.has-icons-left').append(selectIcon);
    $('.datatable-filter-cell').find('select option:first-child').html('Filter by');

    $('.is-datatable tbody td .checkbox input').on('change', function () {
        $(this).closest('tr').toggleClass('is-selected');

        if ($('.is-datatable td .checkbox input:checked').length > 0) {
            $('.field.has-addons').removeClass('is-disabled');
        }

        else {
            $('.field.has-addons').addClass('is-disabled');
        }
    });

    $('.is-datatable th .checkbox input').on('change', function () {
        if ($(this).prop('checked') === true) {
            $('.is-datatable td .checkbox input').prop('checked', true).trigger('change');
            $('.field.has-addons').removeClass('is-disabled');
        }
        else {
            $('.is-datatable td .checkbox input').prop('checked', false).trigger('change');
            $('.field.has-addons').addClass('is-disabled');
        }
    });

    $('.pagination li').click(function () {
        $('.pagination li.is-selected').removeClass('is-selected');
        $(this).addClass('is-selected');
    })
}

//Tabbed Widget
function initTabbedWidgets() {
    $('.tabbed-widget .tabbed-control').on('click', function () {
        var container = $(this).closest('.tabbed-widget');
        if (!$(this).hasClass('is-active')) {
            $(this).siblings('.tabbed-control').removeClass('is-active');
            $(this).addClass('is-active');
            container.find('.inner-list-wrapper').toggleClass('is-active');
        }
    })
}