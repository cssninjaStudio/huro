/* globals hopscotch: false */

/* ============ */
/* EXAMPLE TOUR */
/* ============ */
var tour = {
    id: "hello-hopscotch",
    steps: [
        {
            title: "Welcome",
            content: "We're happy to have you on board. Let's get started and go through the basics.",
            target: document.querySelector("#start-tour"),
            placement: "bottom",
            multipage: false,
            onNext: function () {
                $('#some-element').addClass('overlay-highlight');
            }
        },
        {
            title: "Dashboard",
            content: "This is your dashboard. It displays your current projects and active tasks.",
            target: document.querySelector("#some-element"),
            placement: "bottom",
            xOffset: "center",
            arrowOffset: "center",
            onNext: function () {
                $('#some-element').removeClass('overlay-highlight');
                $('#some-element2').addClass('overlay-highlight');
            }
        },
        {
            title: "Activity Feed",
            content: "This is your activity feed. It shows the last activities you were involved in.",
            target: document.querySelector("#some-element2"),
            placement: "top",
            xOffset: "center",
            arrowOffset: "center",
            onNext: function () {
                $('#some-element3').trigger('click');
            }
        },
        {
            title: "Active Bounties",
            content: "These are your active bounties. You can click on one of them to immediatly view it's details.",
            target: document.querySelector("#some-element3"),
            placement: "top",
            xOffset: "center",
            arrowOffset: "center",
            onNext: function () {
                $('#some-element3').removeClass('overlay-highlight');
                $('#some-element4').addClass('overlay-highlight');
            }
        },
        {
            title: "Sidebar",
            content: "Use the main sidebar to browse the different app sections like bounties, projects, messages, settings etc...",
            target: document.querySelector("#some-element4"),
            placement: "right",
            yOffset: "center",
            arrowOffset: "center",
            onNext: function () {
                $('#some-element5').addClass('overlay-highlight');
            }
        },
        {
            title: "Navigation",
            content: "Use the navigation panel to browse inner pages and get access to every app features.",
            target: document.querySelector("#some-element5"),
            placement: "right",
            yOffset: "center",
            arrowOffset: "center",
            onNext: function () {
                $('#some-element5').removeClass('overlay-highlight');
                $('#some-element6').addClass('overlay-highlight');
            }
        },
        {
            title: "Mobile App",
            content: "Don't forget to download the Koder IOS app. As a developer, you will need it to take code challenges to determine your primary skill.",
            target: document.querySelector("#some-element6"),
            placement: "bottom",
            xOffset: "-160px",
            arrowOffset: "240px",
            onNext: function () {
                $('#some-element7').addClass('overlay-highlight');
            }
        }
    ],
    onStart: function () {
        $('.app-overlay').addClass('is-active');
    },
    onEnd: function () {
        $('.app-overlay').removeClass('is-active');
        $('#tour-end-modal').addClass('is-active');
    },
    //showPrevButton: true
},

    /* ========== */
    /* TOUR SETUP */
    /* ========== */
    addClickListener = function (el, fn) {
        if (el.addEventListener) {
            el.addEventListener('click', fn, false);
        }
        else {
            el.attachEvent('onclick', fn);
        }
    },

    startBtnEl = document.getElementById("startTourBtn");

if (startBtnEl) {
    addClickListener(startBtnEl, function () {
        if (!hopscotch.isActive) {
            hopscotch.startTour(tour);
        }
    });
}
else {
    // Assuming we're on page 2.
    if (hopscotch.getState() === "hello-hopscotch:1") {
        // tour id is hello-hopscotch and we're on the second step. sounds right, so start the tour!
        hopscotch.startTour(tour);
    }
}