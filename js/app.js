let clicksCount, imagesValue, clicksPerClick, cash;
let colorIndex = 0;
let clicksCosts = [100, 1000, 10000, 1000000];
let clicksCostIndex = 0;
// COLOR SCHEMES
const yellowColors = ['#ffa505', '#ffb805', '#ffc905', '#ffe505', '#fffb05'];
const orangeColors = ['#ffaf7a', '#ff9d5c', '#ff8b3d', '#ff781f','#ff6600'];
const redColors = ['#963232', '#ab3232', '#b82f2f', '#c92929', '#e72222'];
const blackColors = ['#00000', '#191919', '#333333', '#4d4d4d', '#666666'];

const colorsArr = [orangeColors, yellowColors , redColors, blackColors];
// start the game;
appInit();

function appInit() {
    
    // Check for localstorage values
    if(localStorage.getItem('clicksCount') == null) {
        clicksCount = 0;
        localStorage.setItem('clicksCount', clicksCount);
    } else {
        clicksCount = Number(localStorage.getItem('clicksCount'));
    }

    if(localStorage.getItem('clicksPerClick') == null) {
        clicksPerClick = 1;
        localStorage.setItem('clicksPerClick', clicksPerClick);
    } else {
        clicksPerClick = Number(localStorage.getItem('clicksPerClick'));
    }

    if(localStorage.getItem('cashAmount') == null) {
        cash = 0;
        localStorage.setItem('cashAmount', cash);
    } else {
        cash = localStorage.getItem('cashAmount');
    }

    if(localStorage.getItem('imagesValue') == null) {
        imagesValue = 0;
        localStorage.setItem('imagesValue', imagesValue);
    } else {
        imagesValue = Number(localStorage.getItem('imagesValue'));
    }

    const span = document.getElementById('clicks');
    const img = document.querySelector('.game-container__image');
    const resetBtn = document.querySelector('.game-container__reset-btn');
    const changeColorSchemeBtn = document.getElementById('changeColors');
    const addClicksBtn = document.getElementById('addClicks');
    const cashTextElement = document.querySelector('.cash-container__cash');
    let num = 0;
    setImgSrc(imagesValue, false);    

    span.innerText = clicksCount;
    cashTextElement.innerText = `$${cash}`;
    // ----- Change Colors
    changeColorSchemeBtn.addEventListener('click', () => {
        changeColorScheme();
    });

    addClicksBtn.addEventListener('click', () => {
        addClicks();
    });

    // ----- Main Clicking Event Listener
    img.addEventListener('click', () => {
        changeBackground(num);
        clicksPresentUI(clicksCounter());
        checkNumberOfClicks(clicksCount);
        addCash(clicksPerClick);
        num++;
        if(num == 5) {
            num = 0;
        }
    });

    // ----- RESET THE GAME
    resetBtn.addEventListener('click', () => {
        reset('clicksCount', 'imagesValue', 'clicksPerClick', 'cashAmount');
    });
}

function changeBackground(num) {
    const bodyEl = document.querySelector('body');
    bodyEl.style.backgroundColor = colorsArr[colorIndex][num];
}

function changeColorScheme() {
    let colorSchemeRandomNum = Math.floor(Math.max(Math.random() * colorsArr.length, 0));
    console.log(colorSchemeRandomNum);
    colorIndex = colorSchemeRandomNum;
    const bodyEl = document.querySelector('body');
    bodyEl.style.backgroundColor = colorsArr[colorIndex][0];
}

function addClicks(clicksCount) {
    if(clicksCount >= clicksCosts[clicksCostIndex]) {
        // ....
    }
}

function addCash(clicksPerClick) {
    let cashToAdd = clicksPerClick * 10;
    cash += cashToAdd;
    localStorage.setItem('cashAmount', cash);
    const cashTextElement = document.querySelector('.cash-container__cash');
    cashTextElement.innerText = `$${cash}`;
}

function setImgSrc(value, animationBool) {
    const img = document.querySelector('.game-container__image');
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if(width <= 600) {
        img.src = `img/img-${value}-compressor.png`;
    } else {
        img.src = `img/img-${value}.png`;
    }

    if(value > 13 && width > 600) {
        img.src = `img/moresoon.png`;
    } else if (value > 13 && width <= 600) {
        img.src = `img/moresoon-compressor.png`;
    }
    const gameContainerElement = document.querySelector('.game-container');

    if(animationBool) {
        gameContainerElement.classList.add('shake');
        img.classList.remove('clickable');
    } else {
        gameContainerElement.classList.remove('shake');
        img.classList.add('clickable');
    }
}

function reset(clicks, imgValue, clicksPerClick, cashAmount) {
    localStorage.removeItem(clicks);
    localStorage.removeItem(imgValue);
    localStorage.removeItem(clicksPerClick);
    localStorage.removeItem(cashAmount);
    location.reload();
}

function clicksCounter() {
    clicksCount += clicksPerClick;
    localStorage.setItem('clicksCount', clicksCount);
    return clicksCount;
}

function clicksPresentUI(clicks) {
    const span = document.getElementById('clicks');
    span.innerText = clicks;
}

function checkNumberOfClicks(clicks) {
    if(clicks % 50 == 0) {
        imagesValue++;
        localStorage.setItem('imagesValue', imagesValue);
        setImgSrc(imagesValue, true);
    } else {
        setImgSrc(imagesValue, false);
    }
}

// To do: add cash / shop system;