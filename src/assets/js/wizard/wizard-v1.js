/*! wizard-v1.js | Huro | Css ninja 2020-2021 */

"use strict";

var currentStep = 0;
var delay = 100; //1200

function handleProgress(value) {
    $('#wizard-progress').val(value);
}

function goToStep(step) {

    currentStep = step;

    $('.wizard-v1-wrapper .inner-wrapper').removeClass('is-active');
    $('#wizard-step-' + step).addClass('is-active');

    var stepTitle = $('.inner-wrapper.is-active').attr('data-step-title');
    var titleHtml = `
        <span class="title-wrap">Step ${step + 1}: <span>${stepTitle}</span></span>
    `
    $('.is-wizard-title').html(titleHtml);

    if (currentStep > 0) {
        $('.wizard-buttons').addClass('is-active');
    }

    if (currentStep == 0) {
        handleProgress(15);
        $('.wizard-buttons').removeClass('is-active');
    }

    else if (currentStep == 1) {
        handleProgress(25);
    }

    else if (currentStep == 2) {
        handleProgress(45);
    }

    else if (currentStep == 3) {
        handleProgress(60);
    }

    else if (currentStep == 4) {
        handleProgress(75);
    }

    else if (currentStep == 5) {
        handleProgress(85);
    }

    else if (currentStep == 6) {
        handleProgress(95);
    }

    $('[data-dropdown-step="' + step + '"]').removeClass('is-disabled');
}

function initPermissions() {
    $('.permission-level-inner').off().on('click', function(){
        var $this = $(this);
        var progress = $this.attr('data-progress');
        $this.closest('.permission-levels').find('.progress').val(progress);
        $this.addClass('is-active');
        $this.closest('.permission-level').prevAll().find('.permission-level-inner').addClass('is-active');
        $this.closest('.permission-level').nextAll().find('.permission-level-inner').removeClass('is-active');
    })
}

function removeMember() {
    $('.invited-member .cancel-button').off().on('click', function () {
        $(this).closest('.invited-member').remove();

        var memberCount = $('.invited-member').length;

        if (memberCount === 0) {
            $('.empty-wrap').removeClass('is-hidden');
        }
    })
}

function addMember(MemberId, MemberPhoto, MemberName) {

    var template = `
        <div id="invited-member-${MemberId}" class="invited-member">
            <div class="h-avatar is-medium">
                <img class="avatar" src="${MemberPhoto}" alt="">
            </div>
            <div class="meta">
                <span>Invited</span>
                <p>${MemberName}</p>
            </div>
            <div class="actions">
                <div class="permissions">
                    <div class="permission-levels">
                        <div class="permission-level hint--bubble hint--top" aria-label="Reader">
                            <div class="permission-level-inner is-active" data-progress="20"></div>
                        </div>
                        <div class="permission-level hint--bubble hint--top" aria-label="Collaborator">
                            <div class="permission-level-inner" data-progress="50"></div>
                        </div>
                        <div class="permission-level hint--bubble hint--top" aria-label="Manager">
                            <div class="permission-level-inner" data-progress="68"></div>
                        </div>
                        <div class="permission-level hint--bubble hint--top" aria-label="Owner">
                            <div class="permission-level-inner" data-progress="100"></div>
                        </div>
                        <progress class="progress permissions-progress is-primary is-tiny" value="20" max="100">20%</progress>
                    </div>
                </div>
                <button class="button is-circle cancel-button hint--top hint--bubble" aria-label="Cancel Invite">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `

    $('.empty-wrap').addClass('is-hidden');

    if ($('#invited-member-' + MemberId).length) {
        notyf.open({
            type: 'warning',
            message: 'You already Invited ' + MemberName
        });
    }

    else {
        $('.members-list').append(template);
        removeMember();
        initPermissions();
    }

}

$(document).ready(function () {

    //Step 1 card buttons
    $('.type-select-button').on('click', function () {
        var $this = $(this);
        $this.addClass('is-loading');
        setTimeout(function () {
            $this.removeClass('is-loading');
            goToStep(currentStep + 1);
        }, delay)
    });

    //Wizard buttons
    $('.wizard-button-next').on('click', function () {
        var $this = $(this);
        $this.addClass('is-loading');
        setTimeout(function () {
            $this.removeClass('is-loading');
            goToStep(currentStep + 1);
        }, delay)
    });

    $('.wizard-button-previous').on('click', function () {
        var $this = $(this);
        $this.addClass('is-loading');
        setTimeout(function () {
            $this.removeClass('is-loading');
            goToStep(currentStep - 1);
        }, delay)
    });

    //Wizard nav dropdown
    $('#wizard-navigation-dropdown .dropdown-item').on('click', function () {
        var targetStep = parseInt($(this).attr('data-dropdown-step'));
        goToStep(targetStep);
    });

    //Init datepickers
    var datepickers = document.querySelectorAll('.form-datepicker');
    var datePicker = [];
    console.log(datepickers.length);
    for (var i = 0; i < datepickers.length; i++) {

        datePicker[i] = new Pikaday({
            field: datepickers[i],
            firstDay: 1,
            format: 'MMM D, YYYY',
            onSelect: function () {
                //Do your stuff
            }
        });

    }

    //Autocomplete
    var customerOptions = {
        url: "assets/data/companies.json",
        getValue: "name",
        template: {
            type: "custom",
            method: function (value, item) {
                return `
                    <div class="template-wrapper">
                        <div class="avatar-wrapper">
                            <img class="autocpl-avatar" src="${item.pic}">
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
                var value = $("#customers-search").getSelectedItemData();
                $('#customer-logo').attr('src', value.pic);
                $('#customer-name').html(value.name);
                $('#customer-location').html(value.location);
                $('.project-customer').find('.field, .media-flex-center').toggleClass('is-hidden');
                //console.log('You chose the customer named ' + value + ' and who lives in ' + item.location);
            }
        },
    };

    $("#customers-search").easyAutocomplete(customerOptions);

    //Remove Customer
    $('#remove-customer').on('click', function () {
        $("#customers-search").val('');
        $('.project-customer').find('.field, .media-flex-center').toggleClass('is-hidden');
    })


    $('.project-budget .budget-item-inner').on('click', function () {
        var $container = $(this).closest('.project-budget');
        $container.find('.budget-item-inner').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $('.toggle-uploader-link').on('click', function () {
        $('.uploader, .page-placeholder.is-files').toggleClass('is-hidden');
    })


    //Add Members
    var members = 0;

    $('.toggle-members-link').on('click', function () {
        $('.project-team-wrapper, .page-placeholder.is-people').toggleClass('is-hidden');
    })

    if ($('#add-member').length) {
        var membersOptions = {
            url: "assets/data/user.json",
            getValue: "name",
            template: {
                type: "custom",
                method: function (value, item) {
                    return `
                        <div class="template-wrapper">
                            <div class="avatar-wrapper">
                                <img class="autocpl-avatar" src="${item.pic}" alt="">
                            </div>
                            <div class="entry-text">
                                <span>${value}</span>
                                <span>${item.position}</span>
                            </div>
                        </div>
                    `;
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
                    //Get the user name from the autocomplete
                    var memberName = $('#add-member').val();
                    var memberPhoto = $('#add-member').getSelectedItemData().pic;
                    var memberId = $('#add-member').getSelectedItemData().id;

                    addMember(memberId, memberPhoto, memberName);

                    //empty the input for next use
                    $('#add-member').val('');

                    //Increment instructor variable
                    members = members + 1;
                }
            },
        };

        $("#add-member").easyAutocomplete(membersOptions);
    }

})