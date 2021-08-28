const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const form = $('form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const password2 = $('#password2');

const local = window.localStorage;
if (local.getItem('username')) {
    username.value = local.getItem('username');
}

if (local.getItem('email')) {
    email.value = local.getItem('email');
}

if (local.getItem('password')) {
    password.value = local.getItem('password');
}

if (local.getItem('password2')) {
    password2.value = local.getItem('password2');
}

function showSuccess (el) {
    el.parentElement.className = 'form-control success';
}

function showError (el, message) {
    el.parentElement.className = 'form-control error';
    console.log(el.parentElement)
    el.parentElement.querySelector('small').innerText = message;
}

function checkName (el, str) {
    if (str.length < 3) {
        showError(el, 'Username must be at least 3 characters')
    }
    else if (str.length > 15) {
        showError(el, 'Username must be less than 15 characters')
    }
    else {
        showSuccess(el);
    }
}

function checkEmail (el, str) {
    if (str.includes('@')) {
        showSuccess(el);
    }
    else {
        showError(el, 'Email is not valid')
    }
}

function checkPassword (el, str) {
    if (str.length < 3) {
        showError(el, 'Password must be at least 3 characters')
    }
    else if (str.length > 15) {
        showError(el, 'Password must be less than 15 characters')
    }
    else {
        showSuccess(el);
    }
}

function checkConfirm (el, str) {
    if (str === password.value && str.trim().length>0) {
        showSuccess(el);
    }
    else {
        showError(el, 'Password does not match');
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkName(username, username.value);
    checkEmail(email, email.value);
    checkPassword (password, password.value);
    checkConfirm (password2, password2.value);
})

username.addEventListener('change', function() {
    local.setItem('username', username.value);
})

email.addEventListener('change', function() {
    local.setItem('email', email.value);
})

password.addEventListener('change', function() {
    local.setItem('password', password.value);
})

password2.addEventListener('change', function() {
    local.setItem('password2', password2.value);
})
