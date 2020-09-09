/*! profile.js | Huro | Css Ninja 2020-2021 */

/* ==========================================================================
Tile Grids JS
========================================================================== */

"use strict";


$(document).ready(function () {

    //User profile
    if ($('#user-profile').length) {
           
        $('.languages-donut').peity('donut', {
            delimiter: null,
            fill: [themeColors.accent, '#efefef', themeColors.primaryMedium],
            height: 50,
            innerRadius: 22,
            radius: 8,
            width: 50
        });

    }

    //Edit profile
    if ($('#edit-profile').length) {
           
        $(window).on('scroll', function () {
            var height = $(window).scrollTop();
            if (height > 200) {
                $(".stuck-header").addClass('is-stuck');
            } else {
                $(".stuck-header").removeClass('is-stuck');
            }
        });

    }

})