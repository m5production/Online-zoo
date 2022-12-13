'use strict'
//=========DONATE-SUMS==========

{
    const customSumField = document.querySelector('#custom-sum-input');
    const dotsLine = document.querySelector('.donation-schale-line');
    const sumsRow = document.querySelector('.pick-and-feed-donation-schale-sums');
    selectSum(100);

    //==============SUM-CHOICE===============
    const dotsCollection = dotsLine.querySelectorAll('.donation-schale-line-sum');
    const sumsCollection = sumsRow.querySelectorAll('.sum');

    customSumField.addEventListener('input', function () {
        selectSum(this.value);
    })

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

    function selectSum(sum) {
        manipulateClass(dotsLine.querySelector('.chosen'), 'remove', 'chosen');
        manipulateClass(sumsRow.querySelector('.chosen'), 'remove', 'chosen');
        manipulateClass(dotsLine.querySelector(`#dot${sum}`), 'add', 'chosen');
        manipulateClass(sumsRow.querySelector(`#sum${sum}`), 'add', 'chosen');
        customSumField.value = sum;
    }

    function manipulateClass(obj, action, classN){
        if(obj) {
            obj.classList[action](classN);
        }
    }
}