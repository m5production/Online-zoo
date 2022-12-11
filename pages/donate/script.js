'use strict'

//============BURGER============
{
    const burgerBtn = document.querySelector('#burger-btn');
    burgerBtn.addEventListener('click', toggleNav);
    const header = document.querySelector('.large-screen-header');
    const menuWrapper = document.querySelector('.menu-wrapper');
    const body = document.querySelector('body');

    menuWrapper.onclick = (e) => {
        if (e.target !== header) {
            toggleNav();
        }
        console.log(':)');
    }

    function toggleNav() {
        menuWrapper.classList.toggle('active');
        burgerBtn.classList.toggle('active');
        header.classList.toggle('active');
        if (getComputedStyle(body).overflow !== 'hidden') body.style.overflow = 'hidden';
        else body.style.overflow = '';
    }
}

//=========DONATE-SUMS==========

{
    const customSumField = document.querySelector('#custom-sum-input');
    const dotsLine = document.querySelector('.donation-schale-line');
    const sumsRow = document.querySelector('.pick-and-feed-donation-schale-sums');
    setInitialState(document.documentElement.clientWidth);

    //==============SUM-CHOICE===============
    const dotsCollection = dotsLine.querySelectorAll('.donation-schale-line-sum');
    const sumsCollection = sumsRow.querySelectorAll('.sum');

    setSumChooseEventListener(dotsCollection);
    setSumChooseEventListener(sumsCollection);

    function setSumChooseEventListener(items) {
        for (let sum of items) {
            sum.addEventListener('click', function () {
                const currSum = this.id.slice(3);
                selectSum(currSum);
            })
        }
    }

    function setInitialState(screenWidth) {
        if (screenWidth > 640) return;
        selectSum(100);
    }

    function selectSum(sum) {
        dotsLine.querySelector('.chosen').classList.remove('chosen');
        dotsLine.querySelector(`#dot${sum}`).classList.add('chosen');
        sumsRow.querySelector('.chosen').classList.remove('chosen');
        sumsRow.querySelector(`#sum${sum}`).classList.add('chosen');
        customSumField.value = sum;
    }
}