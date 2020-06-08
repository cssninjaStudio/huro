/*! popover.js | Huro | Css Ninja 2020-2021 */

/* ==========================================================================
Ajax User Popovers
========================================================================== */

"use strict";

$(document).ready(function () {

    /* Users

        0. Ray Chow
        1. Christa Geller
        2. Michiko Osada
        3. Trey Pratt
        4. Tony Wang
        5. Paul Duffy
        6. Alan Steiner
        7. Karin Lamb

    */

    function initUserPopovers() {
        $('*[data-user-popover]').each(function () {
            var e = $(this);
            var userRef = $(this).attr('data-user-popover');

            var mailIcon = feather.icons.mail.toSvg();
            var phoneIcon = feather.icons.phone.toSvg();
            var profileIcon = feather.icons['more-horizontal'].toSvg();


            $.ajax({
                url: 'assets/data//user.json',
                dataType: 'json',
                success: function (data) {
                    e.webuiPopover({
                        trigger: 'hover',
                        placement: 'auto',
                        width: 300,
                        padding: false,
                        offsetLeft: 0,
                        offsetTop: 20,
                        animation: 'pop',
                        cache: false,
                        content: function () {

                            var destroyLoader = setTimeout(function () {
                                $('.loader-overlay').removeClass('is-active');
                            }, 500);

                            if (data.badge != null) {
                                var html = `
                                    <div class="profile-popover-block">

                                        <div class="loader-overlay is-active">
                                            <div class="loader is-loading"></div>
                                        </div>

                                        <div class="profile-popover-wrapper">
                                            <div class="popover-avatar">
                                                <img class="avatar" src="${data[userRef].pic}">
                                                <img class="badge" src="${data[userRef].badge}">
                                            </div>
                                            <div class="popover-meta">
                                                <span class="user-meta">
                                                    <span class="username">${data[userRef].name}</span>
                                                    <span class="location">${data[userRef].location}</span>
                                                </span>
                                                <span class="job-title">${data[userRef].position}</span>
                                                <span class="bio">${data[userRef].bio}</span>
                                            </div>
                                        </div>
                                        <div class="popover-actions">
                                            <a class="popover-icon">
                                                ${phoneIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${profileIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${mailIcon}
                                            </a>
                                        </div>
                                    </div>
                                `;
                            } else {
                                var html = `

                                    <div class="profile-popover-block">

                                        <div class="loader-overlay is-active">
                                            <div class="loader is-loading"></div>
                                        </div>

                                        <div class="profile-popover-wrapper">
                                            <div class="popover-avatar">
                                                <img class="avatar" src="${data[userRef].pic}">
                                            </div>
                                            <div class="popover-meta">
                                                <span class="user-meta">
                                                    <span class="username">${data[userRef].name}</span>
                                                    <span class="location">${data[userRef].location}</span>
                                                </span>
                                                <span class="job-title">${data[userRef].position}</span>
                                                <span class="bio">${data[userRef].bio}</span>
                                            </div>
                                        </div>
                                        <div class="popover-actions">
                                            <a class="popover-icon">
                                                ${phoneIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${mailIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${profileIcon}
                                            </a>
                                        </div>

                                    </div>
                                `;
                            }
                            return html;
                            return destroyLoader;

                        }
                    });
                }
            });
        });
    }

    initUserPopovers();

})