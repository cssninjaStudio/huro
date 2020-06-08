/*! messaging.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Messaging page functions
========================================================================== */

"use strict";

$(document).ready(function () {

    //Hide chat side
    $('#hide-chat-side').on('click', function () {
        $('.chat-body-wrap, .message-field-wrapper').addClass('side-collapsed');
        $('.chat-side-fab').addClass('is-active').removeClass('is-mobile-active');
        $('.chat-side').removeClass('is-mobile-active');
    })

    //Show chat side
    $('.chat-side-fab').on('click', function(){
        $(this).removeClass('is-active').addClass('is-mobile-active');
        $('.chat-body-wrap, .message-field-wrapper').removeClass('side-collapsed');
        $('.chat-side').addClass('is-mobile-active');
    })

    //Highlight selected sidebar link and get the right conversation
    $('#messages-sidebar li, .collapsed-messaging li, #mobile-conversations-list li').on('click', function () {

        //Hide new conversation autocomplete if relevant
        //$('.chat-header .is-autocomplete').addClass('is-hidden');

        //Variables declaration
        var $this = $(this);
        var conversationRef = $(this).attr('data-conversation-menu');
        var userPic = $(this).find('.is-user').attr('src');
        var userBadge = $(this).find('.is-badge').attr('src');
        var userName = $(this).find('.recipient-meta span:first-child').html() || $(this).attr('data-username');
        var userPosition = $(this).attr('data-position');

        $('#messages-sidebar li, .collapsed-messaging li, #mobile-conversations-list li').removeClass('is-active');
        //$(this).addClass('is-active');

        $('li[data-conversation-menu="' + conversationRef + '"]').addClass('is-active');

        //Check if main chat window is hidden and display it
        if ($('.is-chat').hasClass('is-hidden')) {
            $('.is-chat, .is-chat-placeholder').toggleClass('is-hidden');
        }

        //Activate chat loader
        $('.chat-loader').addClass('is-active');

        //Remove current conversation
        $('#chat-body li').remove();

        //Load Conversation
        setTimeout(function () {
            $.ajax({
                url: 'assets/data/' + conversationRef + '.json',
                dataType: 'json',
                success: function (data) {

                    var html = "";
                    var linkIcon = feather.icons.link.toSvg();
                    var maximizeIcon = feather.icons.maximize.toSvg();
                    var downloadIcon = feather.icons['download-cloud'].toSvg();

                    for (var i in data.messages) {

                        var obj = data.messages[i];

                        for (var prop in obj) {

                            if (obj[prop].type == 'msg') {
                                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg">
                                        <div class="msg-inner">
                                            <p>${obj[prop].content.text}</p>
                                        </div>
                                        <time>
                                            ${obj[prop].content.time}
                                        </time>
                                    </div>
                                    </li>
                                `;
                            }
                            else if (obj[prop].type == 'system') {
                                html = `
                                    <li class="divider-container">
                                        <div class="divider">
                                            <span>${obj[prop].content.text}</span>
                                        </div>
                                    </li>
                                `;
                            }
                            else if (obj[prop].type == 'imagelink') {
                                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg is-link-image">
                                            <figure class="image">
                                                <img src="${obj[prop].content.link_image}">
                                                <div class="link-badge">
                                                    <img src="${obj[prop].content.link_badge}">
                                                </div>
                                            </figure>
                                            <div class="link-body">
                                                <span class="link-title">${obj[prop].content.text}</span>
                                                <small>${obj[prop].content.subtext}</small>
                                            </div>
                                        </div>
                                    </li>
                                `;
                            }
                            else if (obj[prop].type == 'image') {
                                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar is-online">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg is-image">
                                            <div class="image-container">
                                                <img src="${obj[prop].content.image_url}">
                                                <div class="image-overlay"></div>
                                                <div class="image-actions">
                                                    <div class="actions-inner">
                                                        <div class="action">
                                                            ${downloadIcon}
                                                        </div>
                                                        <a href="${obj[prop].content.image_url}" class="action messaging-popup">
                                                            ${maximizeIcon}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                `;
                            }
                            else if (obj[prop].type == 'link') {
                                html = `
                                    <li class="${obj[prop].sender}">
                                        <div class="avatar is-online">
                                            <img src="${obj[prop].avatar}" draggable="false"/>
                                        </div>
                                        <div class="msg is-link">
                                            <div class="icon-wrapper">
                                                ${linkIcon}
                                            </div>
                                            <p class="link-meta">
                                                <span>${obj[prop].content.text}</span>
                                                <a href="#">${obj[prop].content.subtext}</a>
                                            </p>
                                        </div>
                                    </li>
                                `;
                            }
                            else {

                            }
                            //Render conversation markup
                            $('#chat-body').append(html);

                            //Update user details (chat body right side)
                            $('#user-details-image').attr('src', userPic);
                            $('#user-details-badge').attr('src', userBadge);
                            $('#user-details-name').html(userName);
                            $('#user-details-title').html(userPosition);

                            //Scroll chat to bottom on load
                            var scrollChat = $('.chat-body');

                            scrollChat.scrollTop(scrollChat.prop("scrollHeight"));
                            //$().getUserPopovers();

                            var liCount = $('.chat-body li').length;

                            if (liCount == 0) {
                                $('.no-messages').removeClass('is-hidden');
                            }
                            else {
                                $('.no-messages').addClass('is-hidden');
                            }

                            //Inject the right conversation ref for the hide function
                            $('#chat-body').attr('data-conversation-body', conversationRef);

                            //Disable chat loader
                            setTimeout(function () {
                                $('.chat-loader').removeClass('is-active');
                            }, 500);
                        }

                    }
                }
            });
        }, 1000)

    })

    //Toggle between the sidebar normal state and new conversation state
    $('#show-new, #show-list').on('click', function () {
        $('#conversations-list, #new-conversation, .is-new-conversation').toggleClass('is-hidden');
    })

    //Make a typing indicator appear when the user is writing
    $('#chat-input').on('input', function () {
        $('.typing-indicator').addClass('is-active');
        if (!$(this).val()) {
            $('.typing-indicator').removeClass('is-active');
        }
    })

    //Fake chat messages simulation on Keypress
    $('#chat-input').on('keypress', function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            //Post new chat message
            var text = $('#chat-input').val();
            $('.chat-body').append('<li class="self animated preFadeInUp fadeInUp"><div class="avatar"><img src="assets/img/avatars/people/michiko_osada.jpg" draggable="false"/></div><div class="msg"><p> ' + text + ' </p><time><i data-feather="clock"></i>20:18</time></div></li>');

            feather.replace();
            //code to empty textarea after submit
            var empty = "";
            $("#chat-input").val(empty);
            $('.typing-indicator').removeClass('is-active');

            //Remove empty state
            if (!$('.no-messages').hasClass('is-hidden')) {
                $('.no-messages').addClass('is-hidden');
            }

            //Scroll chat to bottom
            var scrollChat = $('.chat-body');
            scrollChat.scrollTop(scrollChat.prop("scrollHeight"));

            //prevents the keypress event to trigger a line jump
            return false;
        }
    });

    //Fake chat messages simulation on button press
    $('.send-message .button').on('click', function () {
        {
            //Post new chat message
            var text = $('#chat-input').val();
            $('.chat-body').append('<li class="self animated preFadeInUp fadeInUp"><div class="avatar"><img src="assets/img/avatars/people/michiko_osada.jpg" draggable="false"/></div><div class="msg"><p> ' + text + ' </p><time><i data-feather="clock"></i>20:18</time></div></li>');

            feather.replace();
            //code to empty textarea after submit
            var empty = "";
            $("#chat-input").val(empty);
            $('.typing-indicator').removeClass('is-active');

            //Remove empty state
            if (!$('.no-messages').hasClass('is-hidden')) {
                $('.no-messages').addClass('is-hidden');
            }

            //Scroll chat to bottom
            var scrollChat = $('.chat-body');
            scrollChat.scrollTop(scrollChat.prop("scrollHeight"));

            //prevents the keypress event to trigger a line jump
            return false;
        }
    });

    //Sidebar user autocomplete
    if ($('#users-autocpl').length) {
        var usersOptions = {
            url: "assets/data/users.json",
            getValue: "name",
            template: {
                type: "custom",
                method: function (value, item) {
                    return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.badge + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.location + "</span></div></div> ";
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
                    var newRecipient = $('#users-autocpl').val();
                    //empty the input for next use
                    $('#users-autocpl').val('');
                    console.log(newRecipient);
                    //Revert sidebar to initial state
                    //$('#conversations-list, #new-conversation, .is-new-conversation').toggleClass('is-hidden');
                    //Check if main chat window is hidden and display it
                    if ($('.is-chat').hasClass('is-hidden')) {
                        $('.is-chat, .is-chat-placeholder').toggleClass('is-hidden');
                    }
                    //Remove messages from chat body
                    $('#chat-body li').remove();

                    //Close autocomplete
                    $('.chat-header .is-autocomplete').addClass('is-hidden');

                    //Ajax
                    $.ajax({
                        url: 'assets/data/users.json',
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);

                            var html = "";


                            for (var i in data) {
                                console.log(data[i]);

                                var conversationId = 'conversation' + data[i].user_id

                                if (data[i].name == newRecipient) {
                                    html = `
                                        <li class="is-active" data-conversation-menu="${conversationId}">
                                            <div class="recent-user">
                                                <div class="user-container">
                                                    <img src="${data[i].pic}" data-user-load="${data[i].user_id}">
                                                    <img class="is-badge" src="${data[i].badge}" data-skill-load="${data[i].skill_id}">
                                                </div>
                                                <div class="recipient-meta">
                                                    <span>${data[i].name}</span>
                                                    <span>${data[i].position}</span>
                                                    <time></time>
                                                </div>
                                            </div>
                                        </li>
                                    `;
                                } else {
                                    //break;
                                    continue;
                                }

                                //Update user details (chat body right side)
                                $('#user-details-image').attr('src', data[i].pic);
                                $('#user-details-badge').attr('src', data[i].badge);
                                $('#user-details-name').html(data[i].name);
                                $('#user-details-title').html(data[i].position);
                                $('#user-details-location').html('From ' + data[i].location);
                                $('#user-details-joined').html('Joined on ' + data[i].joined);
                                $('.chat-side-content.is-single').removeClass('is-hidden');

                                $('#messages-sidebar li.is-active').removeClass('is-active');
                                $('#conversations-list').prepend(html);
                                //$().getUserPopovers();
                                //$().getSkillPopovers();
                                //Update chat header
                                var newHeader = `

                                        <div class="user-container">
                                            <img class="is-user" src="${data[i].pic}" data-user-load="${data[i].user_id}">
                                            <img class="is-badge" src="${data[i].badge}" data-skill-load="${data[i].skill_id}">
                                        </div>
                                        <div class="recipient-meta">
                                            <span>${data[i].name}</span>
                                            <span>${data[i].position}</span>
                                        </div>

                                `
                                //Disable chat loader
                                setTimeout(function () {
                                    $('.chat-loader').removeClass('is-active');
                                }, 200);
                                $('.chat-header .current-user').html(newHeader);
                                $('.no-messages').removeClass('is-hidden');
                                $('#chat-input').attr('autofocus');

                            }
                        }
                    });
                }
            },
        };

        $("#users-autocpl").easyAutocomplete(usersOptions);
    }

    //Enable the message button when the autocomplete has a value
    $('#users-autocpl').on('change', function () {
        $('.start-conversation').removeClass('is-disabled');
    })

    //Start new conversation
    $('#start-conversation').on('click', function () {
        $('.chat-header .is-autocomplete').removeClass('is-hidden');
        $('#users-autocpl').focus();
        //
        $('.chat-body li').remove();
        $('.chat-body .no-messages').removeClass('is-hidden');
        $('#messages-sidebar ul li').removeClass('is-active');
        $('.chat-side #user-details-image').attr('src', 'assets/img/avatars/people/placeholder.jpg');
        $('.chat-side #user-details-badge').attr('src', 'assets/img/logos/koder/koder-square.svg');
        $('.chat-side').find('.user-name, .info, .user-skills, .user-job-title').empty();
    })

    //New conversation from placeholder
    $('#new-chat').on('click', function () {
        $('.is-chat, .is-chat-placeholder').toggleClass('is-hidden');
        $('#chat-body li').remove();
        $('.chat-side-content').addClass('is-hidden');
        $('.current-user').empty();
        $('.no-messages').removeClass('is-hidden');
        $('.chat-header .is-autocomplete').removeClass('is-hidden');
        $('#users-autocpl').focus();
    })

    //Cancel new conversation
    $('.chat-header .hide').on('click', function () {
        $('.chat-header .is-autocomplete input').val('');
        $('.chat-header .is-autocomplete').addClass('is-hidden');
    })

    //Ajax request to load first conversation on page load
    $.ajax({
        url: 'assets/data/conversation1.json',
        dataType: 'json',
        success: function (data) {

            var html = "";
            var timeIcon = feather.icons.clock.toSvg();
            var linkIcon = feather.icons.link.toSvg();
            var maximizeIcon = feather.icons.maximize.toSvg();
            var downloadIcon = feather.icons['download-cloud'].toSvg();

            for (var i in data.messages) {

                var obj = data.messages[i];

                for (var prop in obj) {

                    if (obj[prop].type == 'msg') {
                        html = `
                            <li class="${obj[prop].sender}">
                                <div class="avatar">
                                    <img src="${obj[prop].avatar}" draggable="false"/>
                                </div>
                                <div class="msg">
                                    <div class="msg-inner">
                                        <p>${obj[prop].content.text}</p>
                                    </div>
                                    
                                    <time>
                                        ${obj[prop].content.time}
                                    </time>
                                </div>
                            </li>
                        `;
                    }
                    else if (obj[prop].type == 'system') {
                        html = `
                            <li class="divider-container">
                                <div class="divider">
                                    <span>${obj[prop].content.text}</span>
                                </div>
                            </li>
                        `;
                    }
                    else if (obj[prop].type == 'imagelink') {
                        html = `
                            <li class="${obj[prop].sender}">
                                <div class="avatar">
                                    <img src="${obj[prop].avatar}" draggable="false"/>
                                </div>
                                <div class="msg is-link-image">
                                    <figure class="image">
                                        <img src="${obj[prop].content.link_image}">
                                        <div class="link-badge">
                                            <img src="${obj[prop].content.link_badge}">
                                        </div>
                                    </figure>
                                    <div class="link-body">
                                        <span class="link-title">${obj[prop].content.text}</span>
                                        <small>${obj[prop].content.subtext}</small>
                                    </div>
                                </div>
                            </li>
                        `;
                    }
                    else if (obj[prop].type == 'image') {
                        html = `
                                <li class="${obj[prop].sender}">
                                    <div class="avatar is-online">
                                        <img src="${obj[prop].avatar}" draggable="false"/>
                                    </div>
                                    <div class="msg is-image">
                                        <div class="image-container">
                                            <img src="${obj[prop].content.image_url}">
                                            <div class="image-overlay"></div>
                                            <div class="image-actions">
                                                <div class="actions-inner">
                                                    <div class="action">
                                                        ${downloadIcon}
                                                    </div>
                                                    <a href="${obj[prop].content.image_url}" class="action messaging-popup">
                                                        ${maximizeIcon}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `;
                    }
                    else if (obj[prop].type == 'link') {
                        html = `
                            <li class="${obj[prop].sender}">
                                <div class="avatar is-online">
                                    <img src="${obj[prop].avatar}" draggable="false"/>
                                </div>
                                <div class="msg is-link">
                                    <div class="icon-wrapper">
                                        ${linkIcon}
                                    </div>
                                    <p class="link-meta">
                                        <span>${obj[prop].content.text}</span>
                                        <a href="#">${obj[prop].content.subtext}</a>
                                    </p>
                                </div>
                            </li>
                        `;
                    }
                    else {

                    }
                    $('#chat-body').append(html);
                    
                    //Scroll chat to bottom on load
                    var scrollChat = $('.chat-body');
                    scrollChat.scrollTop(scrollChat.prop("scrollHeight"));
                }

            }
        }
    });
})