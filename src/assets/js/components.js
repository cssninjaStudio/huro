/*! components.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Demo Components initialization file
========================================================================== */

"use strict";

$(document).ready(function () {

    //Notyf Toasts Configuration
    var notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'bottom',
        },
        types: [
            {
                type: 'warning',
                background: themeColors.warning,
                icon: {
                    className: 'fas fa-hand-paper',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'info',
                background: themeColors.info,
                icon: {
                    className: 'fas fa-info-circle',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'primary',
                background: themeColors.primary,
                icon: {
                    className: 'fas fa-car-crash',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'accent',
                background: themeColors.accent,
                icon: {
                    className: 'fas fa-car-crash',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'purple',
                background: themeColors.purple,
                icon: {
                    className: 'fas fa-check',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'blue',
                background: themeColors.blue,
                icon: {
                    className: 'fas fa-check',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'green',
                background: themeColors.green,
                icon: {
                    className: 'fas fa-check',
                    tagName: 'i',
                    text: ''
                }
            },
            {
                type: 'orange',
                background: themeColors.orange,
                icon: {
                    className: 'fas fa-check',
                    tagName: 'i',
                    text: ''
                }
            }
        ]
    });

    //Notyf Toasts Demos
    if ($('.toast-trigger').length) {

        $('#success-toast-demo').on('click', function () {
            notyf.success('Your changes have been successfully saved!');
        })

        $('#error-toast-demo').on('click', function () {
            notyf.error('Looks like something went wrong, try again later.');
        })

        $('#info-toast-demo').on('click', function () {
            notyf.open({
                type: 'info',
                message: 'This is some useful information that you might need.'
            });
        })

        $('#warning-toast-demo').on('click', function () {
            notyf.open({
                type: 'warning',
                message: 'Please be careful when driving back to home.'
            });
        })

        $('#purple-toast-demo').on('click', function () {
            notyf.open({
                type: 'purple',
                message: 'This is a nice looking purple toast notification.'
            });
        })

        $('#blue-toast-demo').on('click', function () {
            notyf.open({
                type: 'blue',
                message: 'This is a nice looking blue toast notification.'
            });
        })

        $('#green-toast-demo').on('click', function () {
            notyf.open({
                type: 'green',
                message: 'This is a nice looking green toast notification.'
            });
        })

        $('#orange-toast-demo').on('click', function () {
            notyf.open({
                type: 'orange',
                message: 'This is a nice looking orange toast notification.'
            });
        })

        $('#primary-toast-demo').on('click', function () {
            if ($('body').hasClass('is-dark')) {
                notyf.open({
                    type: 'accent',
                    message: 'Please be careful when driving back to home.'
                });
            } else {
                notyf.open({
                    type: 'primary',
                    message: 'Please be careful when driving back to home.'
                });
            }

        })

    }

    //Filepond

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageExifOrientation,
        FilePondPluginFileValidateSize,
        FilePondPluginImageEdit
    );

    if ($('.filepond').length) {

        FilePond.create(
            document.querySelector('.filepond'),
        );

    }

    if ($('.filepond-2-grid').length) {

        FilePond.create(
            document.querySelector('.filepond-2-grid'),
        );

    }

    if ($('.filepond-3-grid').length) {

        FilePond.create(
            document.querySelector('.filepond-3-grid'),
        );

    }

    if ($('.profile-filepond').length) {

        FilePond.create(
            document.querySelector('.profile-filepond'),
            {
                labelIdle: `<i class="lnil lnil-cloud-upload"></>`,
                imagePreviewHeight: 140,
                imageCropAspectRatio: '1:1',
                imageResizeTargetWidth: 140,
                imageResizeTargetHeight: 140,
                stylePanelLayout: 'compact circle',
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
            }
        );

    }

    if ($('.profile-filepond-small').length) {

        FilePond.create(
            document.querySelector('.profile-filepond-small'),
            {
                labelIdle: `<i class="lnil lnil-cloud-upload"></>`,
                imagePreviewHeight: 110,
                imageCropAspectRatio: '1:1',
                imageResizeTargetWidth: 110,
                imageResizeTargetHeight: 110,
                stylePanelLayout: 'compact circle',
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
            }
        );

    }

    if ($('.profile-filepond-tiny').length) {

        FilePond.create(
            document.querySelector('.profile-filepond-tiny'),
            {
                labelIdle: `<i class="lnil lnil-cloud-upload"></>`,
                imagePreviewHeight: 80,
                imageCropAspectRatio: '1:1',
                imageResizeTargetWidth: 80,
                imageResizeTargetHeight: 80,
                stylePanelLayout: 'compact circle',
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
            }
        );

    }

    if ($('.square-filepond').length) {

        FilePond.create(
            document.querySelector('.square-filepond'),
            {
                labelIdle: `<i class="lnil lnil-plus"></>`,
                imagePreviewHeight: 140,
                imageCropAspectRatio: '1:1',
                imageResizeTargetWidth: 140,
                imageResizeTargetHeight: 140,
                stylePanelLayout: 'compact circle',
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
            }
        );

    }

    if ($('.square-filepond-small').length) {

        FilePond.create(
            document.querySelector('.square-filepond-small'),
            {
                labelIdle: `<i class="lnil lnil-plus"></>`,
                imagePreviewHeight: 110,
                imageCropAspectRatio: '1:1',
                imageResizeTargetWidth: 110,
                imageResizeTargetHeight: 110,
                stylePanelLayout: 'compact circle',
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
            }
        );

    }

    if ($('.square-filepond-tiny').length) {

        FilePond.create(
            document.querySelector('.square-filepond-tiny'),
            {
                labelIdle: `<i class="lnil lnil-plus"></>`,
                imagePreviewHeight: 80,
                imageCropAspectRatio: '1:1',
                imageResizeTargetWidth: 80,
                imageResizeTargetHeight: 80,
                stylePanelLayout: 'compact circle',
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
            }
        );

    }

    //Light Gallery
    if ($('#lightgallery').length) {
        lightGallery(document.getElementById('lightgallery'));
    }

    //Video Gallery
    if ($('#videogallery').length) {
        lightGallery(document.getElementById('videogallery'));
    }

    //Picakday
    if ($('#pickaday-datepicker').length) {
        var picker = new Pikaday({
            field: document.getElementById('pickaday-datepicker'),
            format: 'D MMM YYYY',
            onSelect: function () {
                //Do your stuff
            }
        });
    }

    //Bulma datepicker extension
    if ($('#bulma-datepicker-1').length) {
        bulmaCalendar.attach('#bulma-datepicker-1', {
            color: themeColors.primary,
            lang: 'en'
        });
    }

    if ($('#bulma-datepicker-2').length) {
        bulmaCalendar.attach('#bulma-datepicker-2', {
            displayMode: 'dialog',
            startDate: new Date('02/11/2018'),
            minDate: '01/01/2018',
            maxDate: '12/31/2018',
            color: themeColors.primary,
            lang: 'en'
        });
    }

    if ($('#bulma-datepicker-3').length) {
        bulmaCalendar.attach('#bulma-datepicker-3', {
            displayMode: 'inline',
            startDate: new Date('02/11/2018'),
            minDate: '01/01/2018',
            maxDate: '12/31/2018',
            color: themeColors.primary,
            lang: 'en'
        });
    }

    if ($('#bulma-datepicker-4').length) {
        bulmaCalendar.attach('#bulma-datepicker-4', {
            color: themeColors.primary,
            lang: 'en'
        });
    }

    if ($('#bulma-datepicker-5').length) {
        bulmaCalendar.attach('#bulma-datepicker-5', {
            color: themeColors.primary,
            lang: 'en'
        });
    }

    if ($('#bulma-datepicker-6').length) {
        bulmaCalendar.attach('#bulma-datepicker-6', {
            color: themeColors.primary,
            lang: 'en'
        });
    }

    if ($('#bulma-datepicker-7').length) {
        bulmaCalendar.attach('#bulma-datepicker-7', {
            color: themeColors.primary,
            lang: 'en'
        });
    }
    

    //Choices js
    if ($('#choices-text-remove-button').length) {
        var textRemove = new Choices(document.getElementById('choices-text-remove-button'), {
            delimiter: ',',
            editItems: true,
            //maxItemCount: 5,
            removeItemButton: true,
        });
    }

    if ($('#choices-multiple-remove-button').length) {
        var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
            removeItemButton: true,
        });
    }

    //Easyautocomplete
    if ($('#autocomplete-demo-simple').length) {
        var demoSimpleOptions = {
            url: "assets/data/user.json",
            getValue: "name",
            template: {
                type: "custom",
                method: function (value, item) {
                    return `
                        <div class="template-wrapper">
                            <div class="entry-text">
                                <span>${value}</span>
                            </div>
                        </div>
                    `
                }
            },
            highlightPhrase: false,
            list: {
                maxNumberOfElements: 5,
                showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function () { }
                },
                match: {
                    enabled: true
                },
                onChooseEvent: function () {
                    //do your stuff here
                }
            },
        };

        $("#autocomplete-demo-simple").easyAutocomplete(demoSimpleOptions);
    }

    if ($('#autocomplete-demo-subtext').length) {
        var demoSubtextOptions = {
            url: "assets/data/user.json",
            getValue: "name",
            template: {
                type: "custom",
                method: function (value, item) {
                    return `
                        <div class="template-wrapper">
                            <div class="entry-text">
                                <span>${value}</span>
                                <span>${item.location}</span>
                            </div>
                        </div>
                    `
                }
            },
            highlightPhrase: false,
            list: {
                maxNumberOfElements: 5,
                showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function () { }
                },
                match: {
                    enabled: true
                },
                onChooseEvent: function () {
                    //do your stuff here
                }
            },
        };

        $("#autocomplete-demo-subtext").easyAutocomplete(demoSubtextOptions);
    }

    if ($('#autocomplete-demo-advanced').length) {
        var demoAdvancedOptions = {
            url: "assets/data/user.json",
            getValue: "name",
            template: {
                type: "custom",
                method: function (value, item) {
                    return `
                        <div class="template-wrapper">
                            <div class="avatar-wrapper">
                                <img class="autocpl-avatar" src="${item.pic}">
                                <img class="avatar-badge" src="${item.badge}">
                            </div>
                            <div class="entry-text">
                                <span>${value}</span>
                                <span>${item.location}</span>
                            </div>
                        </div>
                    `
                }
            },
            highlightPhrase: false,
            list: {
                maxNumberOfElements: 5,
                showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function () { }
                },
                match: {
                    enabled: true
                },
                onChooseEvent: function () {
                    //do your stuff here
                }
            },
        };

        $("#autocomplete-demo-advanced").easyAutocomplete(demoAdvancedOptions);
    }

    if ($('.circle-chart-wrapper').length) {
        $('.circle-chart-wrapper').each(function(){
            var $this = $(this)
            var completion = $this.attr('data-completion');
            $this.find('.circle-chart__circle').attr('stroke-dasharray', completion + ',100');
        })
    }

})