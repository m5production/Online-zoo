function toggleNav(){
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.large-screen-header');
    burger.classList.toggle('active');
    header.classList.toggle('active');
}