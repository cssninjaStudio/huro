/*! components.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Auth pages js
========================================================================== */

"use strict";


$(window).on('load', function () {
    var pageloaderTimeout = setTimeout(function () {
        $('.pageloader').toggleClass('is-active');
        $('.infraloader').toggleClass('is-active')
        clearTimeout(pageloaderTimeout);
    }, 700);
})

$(document).ready(function () {

    feather.replace();

    $('.pageloader').toggleClass('is-active');

    //Attribute background images
    if ($('.has-background-image').length) {
        $(".has-background-image").each(function () {
            var bgImage = $(this).attr('data-background');
            if (bgImage !== undefined) {
                $(this).css('background-image', 'url(' + bgImage + ')');
            }
        }
        )
    }

    $('#login-submit').on('click', function () {
        var $this = $(this);
        $this.addClass('is-loading');
        setTimeout(function () {
            $this.removeClass('is-loading');
            $('#login-form').submit();
        }, 1000);
    })

    //Reset password
    $('#forgot-link, #cancel-recover').on('click', function () {
        $(this).closest('.is-form').find('form, .form-text').toggleClass('is-hidden');
    })

    //Signup Flow
    if ($('#huro-signup').length) {

        //Steps
        $('.step-icon').on('click', function () {
            var targetStep = $(this).attr('data-step');
            var progressValue = $(this).attr('data-progress');
            $(this).prevAll().addClass('is-done');
            $(this).removeClass('is-done').addClass('is-active');
            $(this).nextAll().removeClass('is-active is-done');
            $('#signup-steps-progress').val(progressValue);
            if (targetStep !== undefined) {
                $('.signup-columns').addClass('is-hidden');
                $('#' + targetStep).removeClass('is-hidden');
                $('.avatar-carousel').slick('setPosition');
                $('.card-bg').addClass('faded');
            }

            if (targetStep == 'signup-step-1') {
                $('.card-bg').removeClass('faded');
            }
        })

        //Step 1 confirmation
        $('#confirm-step-1').on('click', function () {
            var $this = $(this);
            $this.addClass('is-loading');
            setTimeout(function () {
                $this.removeClass('is-loading');
                $('.card-bg').addClass('faded');
                $('.signup-steps').removeClass('is-hidden');

                //Activate step
                //$('.step-icon:nth-child(2)').removeClass('is-inactive').trigger('click');
                $('#signup-step-1, #signup-step-2').toggleClass('is-hidden');
                $('.avatar-carousel').slick('setPosition');
            }, 1000);
        })

        //Avatar carousel selector
        if ($('.avatar-carousel').length) {

            var carousel = $('.avatar-carousel');

            carousel.on('init', function () {
                feather.replace();
            })

            carousel.on('afterChange', function () {
                var currentAvatarUrl = $('.avatar-carousel').find('.slick-current img').attr('src');
                $('.picture-selector .image-container img').attr('src', currentAvatarUrl);
                $('#confirm-step-2').removeClass('is-disabled');
            })

            $('.avatar-carousel').slick({
                centerMode: true,
                dots: false,
                infinite: true,
                centerPadding: '100px',
                prevArrow: "<div class='slick-custom is-prev'><i data-feather='chevron-left'></i></div>",
                nextArrow: "<div class='slick-custom is-next'><i data-feather='chevron-right'></i></div>",
                slidesToShow: 3,
            });

            //Go to next avatar/skill when clicking on it
            $('.slick-slider').on('click', '.slick-slide', function (e) {
                e.stopPropagation();
                var index = $(this).data("slick-index");
                if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
                    $('.slick-slider').slick('slickGoTo', index);
                }
            });

            //Picture cropper
            if ($('#upload-demo').length) {

                /*function readFile(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $('.upload-demo').addClass('ready');
                            $uploadCrop.croppie('bind', {
                                url: e.target.result
                            }).then(function () {
                                console.log('jQuery bind complete');
                            });

                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                    else {
                        swal("Sorry - you're browser doesn't support the FileReader API");
                    }
                }

                var $uploadCrop = $('#upload-demo').croppie({
                    enableExif: true,
                    url: 'assets/img/placeholders/placeholder.png',
                    viewport: {
                        width: 130,
                        height: 130,
                        type: 'circle'
                    },
                    boundary: {
                        width: '100%',
                        height: 300
                    }
                });

                function popupResult(result) {
                    var html;
                    if (result.html) {
                        html = result.html;
                    }
                    if (result.src) {
                        html = '<img src="' + result.src + '" />';
                        $('#upload-modal .modal-content').removeClass('scaleIn');
                        $('#upload-modal .modal-background').removeClass('scaleInCircle');
                        $('.picture-selector .image-container img').attr('src', result.src);
                        $('#confirm-step-2').removeClass('is-disabled');
                        setTimeout(function () {
                            $('body').removeClass('is-fixed');
                            $('#upload-modal').removeClass('is-active');
                        }, 500);
                    }

                }

                $('#upload').on('change', function () { readFile(this); });
                $('.upload-result').on('click', function (ev) {
                    $uploadCrop.croppie('result', {
                        type: 'canvas',
                        size: 'viewport'
                    }).then(function (resp) {
                        popupResult({
                            src: resp
                        });
                    });
                });

                $('#upload').on('change', function () {
                    $('.upload-result.is-disabled').removeClass('is-disabled');
                })*/
            }
        }

        //Step 2 confirmation
        $('#confirm-step-2').on('click', function () {
            var $this = $(this);
            $this.addClass('is-loading');
            setTimeout(function () {
                $this.removeClass('is-loading');
                //Activate step
                $('.step-icon:nth-child(2)').removeClass('is-inactive').trigger('click');
            }, 1000);
        })

        //Go to onboarding
        $('#finish-signup').on('click', function () {
            var $this = $(this);
            $this.addClass('is-loading');
            $('.step-icon.is-inactive').removeClass('is-inactive').trigger('click');
            setTimeout(function () {
                $this.removeClass('is-loading');
                window.location.href = '/webapp-welcome.html';
            }, 1400);
        })

        //Go to onboarding
        /*$('#go-to-ob2').on('click', function () {
            $('.signup-columns').addClass('is-hidden');
            $('#signup-step-5').removeClass('is-hidden');
            $('.onboarding-navigation').find('.dot:nth-child(2)').addClass('is-active');
        })

        //Go to onboarding
        $('#go-to-ob3').on('click', function () {
            $('.signup-columns').addClass('is-hidden');
            $('#signup-step-6').removeClass('is-hidden');
            $('.onboarding-navigation').find('.dot:nth-child(3)').addClass('is-active');
        })

        //Go to onboarding
        $('#go-to-ob4').on('click', function () {
            $('.signup-columns').addClass('is-hidden');
            $('#signup-step-7').removeClass('is-hidden');
            $('.onboarding-navigation').find('.dot:nth-child(4)').addClass('is-active');
        })*/
    }

})