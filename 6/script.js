const toggleBtn = document.querySelector('header > button:first-child');
const signUpBtn = document.querySelector('header > button ~ button');
const body = document.body;
const nav = document.querySelector('nav');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal button');
const overlay = document.querySelector('.overlay');

toggleBtn.addEventListener('click', function() {
    body.classList.toggle('show-nav');
    nav.classList.toggle('show')
})

signUpBtn.addEventListener('click', function() {
    overlay.classList.add('show');
    modal.classList.add('show');
})

overlay.addEventListener('click', function() {
    overlay.classList.remove('show');
    modal.classList.remove('show');
})

