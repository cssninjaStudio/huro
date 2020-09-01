

"use strict";

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

$(document).ready(function () {

    var moreIcon = feather.icons['more-horizontal'].toSvg();

    var rowActionDropdown = `
        <div class="row-action">
            <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
                <div class="is-trigger" aria-haspopup="true" aria-controls="dropdown-menu">
                    ${moreIcon}
                </div>
                <div class="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-user-alt"></i>
                            </div>
                            <div class="meta">
                                <span>Profile</span>
                                <span>View profile</span>
                            </div>
                        </a>
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-bubble"></i>
                            </div>
                            <div class="meta">
                                <span>Message</span>
                                <span>Send Message</span>
                            </div>
                        </a>
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-travel"></i>
                            </div>
                            <div class="meta">
                                <span>Transfer</span>
                                <span>Transfer to other list</span>
                            </div>
                        </a>
                        <hr class="dropdown-divider">
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-trash"></i>
                            </div>
                            <div class="meta">
                                <span>Remove</span>
                                <span>Remove from list</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    var rowFileDropdown = `
        <div class="row-action">
            <div class="dropdown is-spaced is-dots is-right dropdown-trigger">
                <div class="is-trigger" aria-haspopup="true" aria-controls="dropdown-menu">
                    ${moreIcon}
                </div>
                <div class="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-cloud-download"></i>
                            </div>
                            <div class="meta">
                                <span>Download</span>
                                <span>Download this file</span>
                            </div>
                        </a>
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-cloud-upload"></i>
                            </div>
                            <div class="meta">
                                <span>Update</span>
                                <span>Upload a new version</span>
                            </div>
                        </a>
                        <hr class="dropdown-divider">
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i class="lnil lnil-trash"></i>
                            </div>
                            <div class="meta">
                                <span>Remove</span>
                                <span>Remove from list</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    if ($('#users-datatable').length) {

        var datatable = new DataTable(document.querySelector('#users-datatable'), {
            pageSize: 10,
            sort: {
                checkbox: false,
                picture: false,
                name: true,
                position: false,
                status: true,
                action: false
            },
            filters: {
                checkbox: false,
                picture: false,
                name: true,
                position: 'select',
                status: 'select',
                action: false
            },
            filterText: 'Type to Filter... ',
            filterInputClass: 'input',

            counterText: function (currentPage, totalPage, firstRow, lastRow, totalRow) {
                return 'Showing ' + firstRow + ' to ' + lastRow + ' of ' + totalRow + ' items.';
            },
            counterDivSelector: '.datatable-info span',
            pagingDivSelector: "#paging-first-datatable",
            firstPage: false,
            lastPage: false,
            nextPage: '<i class="fas fa-angle-right"></i>',
            prevPage: '<i class="fas fa-angle-left"></i>',
            afterRefresh: function () {
                changeDemoImages();
                initDropdowns();
            },
            data: [
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/8.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Erik Kovalsky</span>',
                    position: 'Product Manager',
                    status: `
                        <div class="status is-busy">
                            <i class="fas fa-circle"></i>
                            <span>Busy</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/7.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Alice Carasca</span>',
                    position: 'Software Engineer',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/13.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Tara Svenson</span>',
                    position: 'UI/UX Designer',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/5.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Mary Lebowski</span>',
                    position: 'Project Manager',
                    status: `
                        <div class="status is-available">
                            <i class="fas fa-circle"></i>
                            <span>Available</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <span class="avatar is-fake is-info">
                                <span>K</span>
                            </span>
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Kaylee Jennings</span>',
                    position: 'Web Developer',
                    status: `
                        <div class="status is-available">
                            <i class="fas fa-circle"></i>
                            <span>Available</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/27.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Carmen Escudero</span>',
                    position: 'HR Manager',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/22.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Dwayne Hicks</span>',
                    position: 'Product Manager',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <span class="avatar is-fake is-success">
                                <span>P</span>
                            </span>
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Paul Morris</span>',
                    position: 'Backend Developer',
                    status: `
                        <div class="status is-available">
                            <i class="fas fa-circle"></i>
                            <span>Available</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/23.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Irina Vierbovsky</span>',
                    position: 'Project Manager',
                    status: `
                        <div class="status is-available">
                            <i class="fas fa-circle"></i>
                            <span>Available</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/28.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Edouard Falant</span>',
                    position: 'Web Developer',
                    status: `
                        <div class="status is-busy">
                            <i class="fas fa-circle"></i>
                            <span>Busy</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <span class="avatar is-fake is-warning">
                                <span>S</span>
                            </span>
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Shana Williams</span>',
                    position: 'Sales Manager',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <span class="avatar is-fake is-info">
                                <span>B</span>
                            </span>
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Benjamin Hoffman</span>',
                    position: 'Product Manager',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/39.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Alejandro Badajoz</span>',
                    position: 'Business Analyst',
                    status: `
                        <div class="status is-busy">
                            <i class="fas fa-circle"></i>
                            <span>Busy</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/21.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Elizabeth Fisher</span>',
                    position: 'Mobile Developer',
                    status: `
                        <div class="status is-available">
                            <i class="fas fa-circle"></i>
                            <span>Available</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/37.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Helmut Fritz</span>',
                    position: 'Product Manager',
                    status: `
                        <div class="status is-available">
                            <i class="fas fa-circle"></i>
                            <span>Available</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <div class="h-avatar">
                            <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/31.jpg" alt="">
                        </div>
                    `,
                    name: '<span class="has-dark-text dark-inverted">Yasseen Amzi</span>',
                    position: 'Business Analyst',
                    status: `
                        <div class="status is-offline">
                            <i class="fas fa-circle"></i>
                            <span>Offline</span>
                        </div>
                    `,
                    action: `${rowActionDropdown}`
                }

            ]
        });

        setTimeout(function () {
            //Change demo images
            changeDemoImages();

            //initUserPopovers();
            adjustDropdowns();

            customizeDatatable();


        }, 1000);

    }


    if ($('#products-datatable').length) {

        var datatable = new DataTable(document.querySelector('#products-datatable'), {
            pageSize: 10,
            sort: {
                checkbox: false,
                picture: false,
                name: true,
                sku: true,
                unitPrice: true,
                stock: false,
                category: false,
                action: false
            },
            filters: {
                checkbox: false,
                picture: false,
                name: true,
                sku: true,
                unitPrice: false,
                stock: false,
                category: 'select',
                action: false
            },
            filterText: 'Type to Filter... ',
            filterInputClass: 'input',

            counterText: function (currentPage, totalPage, firstRow, lastRow, totalRow) {
                return 'Showing ' + firstRow + ' to ' + lastRow + ' of ' + totalRow + ' items.';
            },
            counterDivSelector: '.datatable-info span',
            pagingDivSelector: "#paging-first-datatable",
            firstPage: false,
            lastPage: false,
            nextPage: '<i class="fas fa-angle-right"></i>',
            prevPage: '<i class="fas fa-angle-left"></i>',
            afterRefresh: function () {
                changeDemoImages();
                initDropdowns();
            },
            data: [
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/1.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Yellow Couch</span>',
                    sku: 'FC-58-5564',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$190.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>51</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Couches</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/2.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Green Couch</span>',
                    sku: 'FC-58-1565',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$170.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>42</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Couches</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/4.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Turquoise Seat</span>',
                    sku: 'FS-12-4854',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$90.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>59</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Chairs</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/3.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Cyan Couch</span>',
                    sku: 'FC-58-6723',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$180.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>42</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Couches</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/7.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Coffee Table</span>',
                    sku: 'FT-45-4684',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$280.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>12</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Tables</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/5.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Red Couch</span>',
                    sku: 'FC-58-7565',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$190.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>31</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Couches</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/6.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Mustard Seat</span>',
                    sku: 'FS-11-1861',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$70.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>31</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Chairs</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/8.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Modern Sofa</span>',
                    sku: 'FC-58-3971',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$190.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>29</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Couches</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/9.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Table Triplets</span>',
                    sku: 'FT-22-2875',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$340.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>6</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Tables</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/10.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Wood Chair</span>',
                    sku: 'FS-11-2876',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$80.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>16</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Chairs</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/11.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Modern Table</span>',
                    sku: 'FT-14-6543',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$150.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>31</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Tables</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/12.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Hippie Sofa</span>',
                    sku: 'FC-58-7241',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$380.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>4</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Couches</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/13.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Wood Dresser</span>',
                    sku: 'FD-98-4654',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$270.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>31</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Dressers</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/14.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Walnut Chair</span>',
                    sku: 'FS-11-5873',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$110.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>37</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Chairs</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/15.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Purple Armchair</span>',
                    sku: 'FS-10-1948',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$130.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>24</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Chairs</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/16.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Round Chair</span>',
                    sku: 'FS-11-2857',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$60.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>31</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Chairs</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/17.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Modern Cabinet</span>',
                    sku: 'FB-58-25253',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$240.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>11</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Cabinets</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/18.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Chromed Cabinet</span>',
                    sku: 'FB-58-5673',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$350.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>31</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Cabinets</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/19.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Modern Lamp</span>',
                    sku: 'FL-19-7354',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$50.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>62</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Lamps</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/20.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Lamp Triplets</span>',
                    sku: 'FL-18-2846',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$180.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>44</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Lamps</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/21.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Wood Lamp</span>',
                    sku: 'FL-19-1947',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$60.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>82</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Lamps</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/22.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Carbone Fiber Lamp</span>',
                    sku: 'FL-19-3658',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$220.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>11</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Lamps</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    picture: `
                        <img class="product-photo" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/photo/demo/products/23.png" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Multidirectional Spots</span>',
                    sku: 'FL-19-1731',
                    unitPrice: `
                        <div class="price has-text-centered light-text">
                            <span>$160.00</span>
                        </div>
                    `,
                    stock: `
                        <div class="stock has-text-centered light-text">
                            <span>17</span>
                        </div>
                    `,
                    category: `
                        <div class="category light-text">
                            <span>Lamps</span>
                        </div>
                    `,
                    action: `
                        <button class="button h-button">
                            <span class="icon">
                                <i class="lnir lnir-pencil"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    `
                }
            ]
        });

        setTimeout(function () {
            //Change demo images
            changeDemoImages();

            //initUserPopovers();
            adjustDropdowns();

            customizeDatatable();


        }, 1000);

    }
    

    if ($('#files-datatable').length) {

        var datatable = new DataTable(document.querySelector('#files-datatable'), {
            pageSize: 10,
            sort: {
                checkbox: false,
                type: false,
                name: false,
                size: true,
                version: true,
                updated: false,
                action: false
            },
            filters: {
                checkbox: false,
                type: false,
                name: true,
                size: false,
                version: false,
                updated: false,
                action: false
            },
            filterText: 'Type to Filter... ',
            filterInputClass: 'input',

            counterText: function (currentPage, totalPage, firstRow, lastRow, totalRow) {
                return 'Showing ' + firstRow + ' to ' + lastRow + ' of ' + totalRow + ' items.';
            },
            counterDivSelector: '.datatable-info span',
            pagingDivSelector: "#paging-first-datatable",
            firstPage: false,
            lastPage: false,
            nextPage: '<i class="fas fa-angle-right"></i>',
            prevPage: '<i class="fas fa-angle-left"></i>',
            afterRefresh: function () {
                changeDemoImages();
                initDropdowns();
            },
            data: [
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/pdf.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Company UX Guide</span>',
                    size: '4.7 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.5.2</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/8.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Erik K.</span>
                                <span>2 weeks ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/sheet.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Tech Summit Expenses</span>',
                    size: '34 kb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.1.3</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/7.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Alice C.</span>
                                <span>3 days ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/doc-2.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Project Outline</span>',
                    size: '77 kb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.0.0</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/18.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Esteban C.</span>
                                <span>5 days ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/ppt.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">UX Presentation</span>',
                    size: '2.3 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.0.0</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/13.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Tara S.</span>
                                <span>2 weeks ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/ai.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Website Homepage Redesign</span>',
                    size: '4.8 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.0.0</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/5.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>Mary L.</span>
                                <span>2 weeks ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/doc-2.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">UX Ramp Up for Interns</span>',
                    size: '1.8 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.2.0</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/8.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Erik K.</span>
                                <span>2 months ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/pdf.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">2020 Projects Digest</span>',
                    size: '8.9 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.3.4</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/27.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Carmen E.</span>
                                <span>3 weeks ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/doc-2.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Financial Report - 2020</span>',
                    size: '1.2 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.0.4</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/10.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Henry G.</span>
                                <span>5 days ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/sheet.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">2020 Supplier Expenses</span>',
                    size: '250 kb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.0.0</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/38.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Christie D.</span>
                                <span>6 days ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/ai.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Website About Page Redesign</span>',
                    size: '3.9 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.2.1</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/5.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>Mary L.</span>
                                <span>4 days ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/ai.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Website Pricing Page Redesign</span>',
                    size: '2.6 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.1.0</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/5.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>Mary L.</span>
                                <span>3 days ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/doc-2.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Financial Report - 2019</span>',
                    size: '1.1 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.3.2</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/10.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Henry G.</span>
                                <span>1 year ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/sheet.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">2019 Supplier Expenses</span>',
                    size: '34 kb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.2.1</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/38.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Christie D.</span>
                                <span>1 year ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/ai.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Website Contact Page Redesign</span>',
                    size: '5.8 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.4.1</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/5.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>Mary L.</span>
                                <span>1 week ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/pdf.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">Company Brand Book</span>',
                    size: '5.3 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.6.3</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/8.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Erik K.</span>
                                <span>3 months ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                },
                {
                    checkbox: `
                        <div class="control">
                            <label class="checkbox is-circle is-primary is-outlined">
                                <input type="checkbox">
                                <span></span>
                            </label>
                        </div>
                    `,
                    type: `
                        <img class="file-icon" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/icons/files/pdf.svg" alt="">
                    `,
                    name: '<span class="has-dark-text dark-inverted">2019 Projects Digest</span>',
                    size: '4.7 mb',
                    version: `
                        <div class="verion has-text-centered light-text">
                            <span>1.2.1</span>
                        </div>
                    `,
                    updated: `
                        <div class="flex-media">
                            <div class="h-avatar is-small">
                                <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/27.jpg" alt="">
                            </div>
                            <div class="meta">
                                <span>by Carmen E.</span>
                                <span>1 year ago</span>
                            </div>
                        </div>
                    `,
                    action: `${rowFileDropdown}`
                }
            ]
        });

        setTimeout(function () {
            //Change demo images
            changeDemoImages();

            //initUserPopovers();
            adjustDropdowns();

            customizeDatatable();


        }, 1000);

    }

    if ($('#empty-datatable').length) {

        var datatable = new DataTable(document.querySelector('#empty-datatable'), {
            pageSize: 10,
            sort: {
                checkbox: false,
                type: false,
                name: false,
                size: true,
                version: true,
                updated: false,
                action: false
            },
            filters: {
                checkbox: false,
                type: false,
                name: true,
                size: false,
                version: false,
                updated: false,
                action: false
            },
            filterText: 'Type to Filter... ',
            filterInputClass: 'input',

            counterText: function (currentPage, totalPage, firstRow, lastRow, totalRow) {
                return 'Showing ' + firstRow + ' to ' + lastRow + ' of ' + totalRow + ' items.';
            },
            counterDivSelector: '.datatable-info span',
            pagingDivSelector: "#paging-first-datatable",
            firstPage: false,
            lastPage: false,
            nextPage: '<i class="fas fa-angle-right"></i>',
            prevPage: '<i class="fas fa-angle-left"></i>',
            afterRefresh: function () {
                changeDemoImages();
                initDropdowns();
            },
            data: []
        });

        setTimeout(function () {
            //Change demo images
            changeDemoImages();

            adjustDropdowns();

            customizeDatatable();


        }, 1000);

    }

})