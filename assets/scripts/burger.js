const burgerBtn = document.getElementById('burger-btn');
burgerBtn.addEventListener('click', toggleNav);
const header = document.querySelector('.large-screen-header');
const menuWrapper = document.querySelector('.menu-wrapper');
const body = document.body;

menuWrapper.onclick = (e) => {
    if (!header.contains(e.target)) {
        toggleNav();
    }
}

function toggleNav() {
    menuWrapper.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    header.classList.toggle('active');
    if (getComputedStyle(body).overflow !== 'hidden') body.style.overflow = 'hidden';
    else body.style.overflow = '';
}