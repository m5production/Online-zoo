'use strict'

const burgerBtn = document.querySelector('#burger-btn');
burgerBtn.addEventListener('click', toggleNav);
const header = document.querySelector('.large-screen-header');
const menuWrapper = document.querySelector('.menu-wrapper');
menuWrapper.onclick = (e) => {
    if(e.target !== header){
        toggleNav();
    }
    console.log(':)');
}

function toggleNav() {
    menuWrapper.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    header.classList.toggle('active');
}