/*! theme.js | Huro | Css Ninja 2020-2021 */

/* ==========================================================================
Huro dark theme toggle
========================================================================== */

$(document).ready(function () {

    $('.dark-mode input').on('change', function () {
        if ($(this).prop('checked') === true) {
            $('html, body').removeClass('is-dark');
            $('.sidebar-brand img').attr('src', 'assets/img/logos/logo/logo.svg');
            $('.navbar-brand > .navbar-item > img, .centered-brand img').attr('src', 'assets/img/logos/logo/logo.svg');
            $('.is-night').addClass('is-hidden');
            $('.is-day').removeClass('is-hidden');

            $('.dark-mode input').prop('checked', true);

            setTimeout(function () {
                //$('#profile-menu').removeClass('is-active');
            }, 800);

            //Light mode placeholder illustrations setup
            $('.feature-placeholder').each(function () {
                var imageUrl = $(this).attr('data-light');
                $(this).attr('src', imageUrl);
            });

            $('.theme-image').each(function () {
                var imageUrl = $(this).attr('data-light');
                $(this).attr('src', imageUrl);
            });
        } 
        
        else {
            $('html, body').addClass('is-dark');
            $('.sidebar-brand img').attr('src', 'assets/img/logos/logo/logo-light.svg');
            $('.navbar-item > img, .centered-brand img').attr('src', 'assets/img/logos/logo/logo-light.svg');
            $('.is-day').addClass('is-hidden');
            $('.is-night').removeClass('is-hidden');

            $('.dark-mode input').prop('checked', false);

            setTimeout(function () {
                //$('#profile-menu').removeClass('is-active');
            }, 800);

            //Dark mode placeholder illustrations setup
            $('.feature-placeholder').each(function () {
                var imageUrl = $(this).attr('data-dark');
                $(this).attr('src', imageUrl);
            });

            $('.theme-image').each(function () {
                var imageUrl = $(this).attr('data-dark');
                $(this).attr('src', imageUrl);
            });
        }
    })

})

