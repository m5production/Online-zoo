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

//===========GALLERY============

{
    const paneContainer = document.querySelector('.cards-collection-container');
    const cardsPane = document.querySelector('.animal-cards.active-pane');
    const cardsCollection = cardsPane.children;
    setCardTextHeight(calcMaxTextHeight());
    const collectionLength = cardsCollection.length;
    let slidingEnabled = true;

    let numberOfVisibleItems = getNumberOfVisibleItems();
    let firstVisibleIndex = 0;
    let lastVisibleIndex = numberOfVisibleItems - 1;

    paneContainer.prepend(makePrev());
    paneContainer.append(makeNext());

    function getNumberOfVisibleItems() {
        const browserWidth = document.documentElement.clientWidth;
        return browserWidth > 640 ? 6
            : browserWidth > 320 ? 4
                : 1;
    }

    function setCardTextHeight(height){
        for(let card of cardsCollection){
            card.querySelector('.card-text').style.height = height + 'px';
        }
    }

    function calcMaxTextHeight(){
        let maxTextHeight = 0;
        for(let card of cardsCollection){
            const curHeight = card.querySelector('.card-text').offsetHeight;
            maxTextHeight = Math.max(curHeight, maxTextHeight);
        }
        return maxTextHeight;
    }

    //Pane generation
    function makeNext() {
        const firstIndex = lastVisibleIndex + 1;
        const nextPane = document.createElement('ul');
        nextPane.classList.add('animal-cards', 'next-pane');

        for (let i = 0; i < numberOfVisibleItems; i++) {
            const nextElem = cardsCollection[(i + firstIndex) % collectionLength];
            nextPane.append(nextElem.cloneNode(true));
        }

        return nextPane;
    }

    function makePrev() {
        const firstIndex = (collectionLength + firstVisibleIndex - numberOfVisibleItems) % collectionLength;
        const prevPane = document.createElement('ul');
        prevPane.classList.add('animal-cards', 'prev-pane');


        for (let i = 0; i < numberOfVisibleItems; i++) {
            const nextElem = cardsCollection[(firstIndex + i) % collectionLength];
            prevPane.append(nextElem.cloneNode(true));
        }

        return prevPane;
    }

    //=========TESTS=================
    // paneContainer.innerHTML = '';
    // const nextPane = makePrev();
    // nextPane.classList.add('animal-cards');
    // paneContainer.append(nextPane);


    //Sliding operations
    function hidePane(direction) {
        slidingEnabled = false;
        const oldPaneType =
            direction === 'to-right'
                ? 'next-pane'
                : 'prev-pane';
        const activePane = document.querySelector('.animal-cards.active-pane');
        activePane.classList.add(direction);
        activePane.addEventListener('animationend', function () {
            console.log('работает');
            this.className = `animal-cards ${oldPaneType}`;
        })
    }

    function showPane(direction) {
        const newPaneType =
            direction === 'from-right'
                ? 'next-pane'
                : 'prev-pane';
        const nextPane = document.querySelector(`.animal-cards.${newPaneType}`);
        nextPane.classList.add(direction);
        nextPane.addEventListener('animationend', function () {
            this.className = 'animal-cards active-pane';
            slidingEnabled = true;
        })
    }

    function slideNext() {
        if (!slidingEnabled) return;
        slidingEnabled = false;
        const prevPane = document.querySelector('.animal-cards.prev-pane');
        prevPane.remove();
        hidePane('to-left');
        showPane('from-right');
        firstVisibleIndex = (lastVisibleIndex + 1) % collectionLength;
        lastVisibleIndex = (lastVisibleIndex + numberOfVisibleItems) % collectionLength;
        paneContainer.append(makeNext());
    }

    function slidePrev() {
        if (!slidingEnabled) return;
        slidingEnabled = false;
        const nextPane = document.querySelector('.animal-cards.next-pane');
        nextPane.remove();
        hidePane('to-right');
        showPane('from-left');
        lastVisibleIndex = (collectionLength + firstVisibleIndex - 1) % collectionLength;
        firstVisibleIndex = (collectionLength + firstVisibleIndex - numberOfVisibleItems) % collectionLength;
        paneContainer.prepend(makePrev());
    }

    //Buttons
    const next = document.querySelector('#gallery-btn-next');
    const prev = document.querySelector('#gallery-btn-prev');

    next.addEventListener('click', slideNext);
    prev.addEventListener('click', slidePrev);
}

//=========TESTIMONIALS=========

{
    const feedbackTrack = document.querySelector('.feedback-track');
    if(document.documentElement.clientWidth <= 640) setFeedbackTrackHeight();
    const progressBar = document.querySelector('#testimonials-progress-bar');
    const slideDist = feedbackTrack.firstElementChild.offsetWidth + 30;
    let currentValue = 0;

    function slideOffset(currentValue) {
        currentValue = progressBar.value;
        const slideOffsetVal = currentValue * slideDist;
        feedbackTrack.style.transform = `translate(-${slideOffsetVal}px)`;
    }

    function setFeedbackTrackHeight(){
        const trackContainer = document.querySelector('.feedback-track-container');
        trackContainer.style.height = feedbackTrack.querySelector('.feedback-item').offsetHeight * 3 + 15 * 2 + 'px';
        console.log(trackContainer.style.height);
    }

    progressBar.addEventListener('input', slideOffset);



    //=================FEEDBACK POP-UP=================

    {
        const body = document.querySelector('body');
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        const feedbackItems = document.querySelectorAll('.feedback-item'); // мб добавить к классу .feedback-section
        const popUpWrapper = document.querySelector('.pop-up-wrapper'); // мб добавить к классу .feedback-section
        const feedbackContent = document.querySelector('.feedback-section .feedback-pop-up-content');
        const closeBtn = document.querySelector('.feedback-pop-up-close-btn');
        const innerCont = document.querySelector('#content');

        let popUpActive = true;



        popUpWrapper.addEventListener('click', (e) => {
            if ((e.target === e.currentTarget || e.target === closeBtn) && popUpActive) {
                closePopUp();
            }
        })

        for (let item of feedbackItems) {
            item.addEventListener('click', showPopUp)
        }

        function showPopUp(event) {
            popUpActive = true;
            innerCont.innerHTML = '';
            innerCont.innerHTML = event.currentTarget.innerHTML;
            popUpWrapper.classList.add('pop-up-visible');
            body.style.overflow = 'hidden';
            body.style.paddingRight = `${scrollBarWidth}px`;
        }

        function closePopUp() {
            popUpActive = false;
            popUpWrapper.classList.remove('pop-up-visible');
            popUpWrapper.classList.add('pop-up-hide');
            popUpWrapper.addEventListener('animationend', colatteralOperations);

            function colatteralOperations() {
                popUpWrapper.classList.remove('pop-up-hide');
                body.style.overflow = '';
                body.style.paddingRight = '';
                popUpWrapper.removeEventListener('animationend', colatteralOperations);
            }
        }
    }
}