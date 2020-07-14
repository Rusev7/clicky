let clicksCount, imagesValue, clicksPerClick, cash;
let colorIndex = 0;
let clicksCostIndex = 0;
let currentLevelPoints = 50;

let clicksCosts = [
    {
        cost: 1000,
        clicksToAdd: 2
    }, 
    
    {
        cost: 3000,
        clicksToAdd: 5
    }, 
    
    {
        cost: 30000,
        clicksToAdd: 10
    }, 
    
    {
        cost: 50000,
        clicksToAdd: 20
    }
];
// COLOR SCHEMES
const yellowColors = ['#ffa505', '#ffb805', '#ffc905', '#ffe505', '#fffb05'];
const orangeColors = ['#ffaf7a', '#ff9d5c', '#ff8b3d', '#ff781f','#ff6600'];
const redColors = ['#963232', '#ab3232', '#b82f2f', '#c92929', '#e72222'];
const blackColors = ['#00000', '#191919', '#333333', '#4d4d4d', '#666666'];

const colorsArr = [orangeColors, yellowColors , redColors, blackColors];

const DOMStrings = {
    img: '.game-container__image',
    resetBtn: '.game-container__reset-btn',
    colorSchemeBtn: 'changeColors',
    addClicksBtn: 'addClicks',
    cashTextElement: '.cash-container__cash',
    clicksButtonSpan: 'clicksToAdd',
    clicksCostSpan: 'clickCost',
    numClicksSpan: 'clicks',
    gameContainerElement: '.game-container',
};
// start the game;
appInit();

function appInit() {
    
    // Check for localstorage values
    checkAndSetLocalStorage();

    const span = document.getElementById(DOMStrings.numClicksSpan);
    const img = document.querySelector(DOMStrings.img);
    const resetBtn = document.querySelector(DOMStrings.resetBtn);
    const changeColorSchemeBtn = document.getElementById(DOMStrings.colorSchemeBtn);
    const addClicksBtn = document.getElementById(DOMStrings.addClicksBtn);
    const cashTextElement = document.querySelector(DOMStrings.cashTextElement);
    const clicksButtonSpan = document.getElementById(DOMStrings.clicksButtonSpan);
    const clicksCostSpan = document.getElementById(DOMStrings.clicksCostSpan);

    let num = 0;
    setImgSrc(imagesValue, false);    
    span.innerText = clicksCount;
    cashTextElement.innerText = `$${Number(cash)}`;
    clicksButtonSpan.innerText = clicksCosts[clicksCostIndex].clicksToAdd;
    clicksCostSpan.innerText = clicksCosts[clicksCostIndex].cost;
    // ----- Change Colors
    changeColorSchemeBtn.addEventListener('click', () => {
        changeColorScheme();
    });

    // ----- Add clicks
    addClicksBtn.addEventListener('click', () => {
        addClicks();
    });

    // ----- Main Clicking Event Listener
    img.addEventListener('click', () => {
        changeBackground(num);
        clicksPresentUI(clicksCounter());
        checkNumberOfClicks(clicksCount);
        changeCashUI(addCash());
        num++;
        if(num == 5) {
            num = 0;
        }
    });

    // ----- RESET THE GAME
    resetBtn.addEventListener('click', () => {
        reset('clicksCount', 'imagesValue', 'clicksPerClick', 'cashAmount', 'clicksCostIndex', 'currentLevelPoints');
    });
}

// UI Changing Functions

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

function changeCostUI(cost, id) {
    const spanElement = document.getElementById(id);
    spanElement.innerText = cost;
}

function changeCashUI(cash) {
    cash = Number(cash);
    const cashTextElement = document.querySelector(DOMStrings.cashTextElement);
    cashTextElement.innerText = `$${cash}`;
}

function clicksPresentUI(clicks) {
    const span = document.getElementById('clicks');
    span.innerText = clicks;
}

function setImgSrc(value, animationBool) {
    const img = document.querySelector(DOMStrings.img);
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
    const gameContainerElement = document.querySelector(DOMStrings.gameContainerElement);

    if(animationBool) {
        gameContainerElement.classList.add('shake');
        img.classList.remove('clickable');
    } else {
        gameContainerElement.classList.remove('shake');
        img.classList.add('clickable');
    }
}

// Game Logic Functions

function addClicks() {
    if(cash >= clicksCosts[clicksCostIndex].cost) {
        clicksPerClick = clicksCosts[clicksCostIndex].clicksToAdd;
        cash -= clicksCosts[clicksCostIndex].cost;
        changeCashUI(cash);
        clicksCostIndex++;
        localStorage.setItem('clicksPerClick', clicksPerClick);
        localStorage.setItem('cashAmount', cash);
        localStorage.setItem('clicksCostIndex', clicksCostIndex);
        changeCostUI(clicksCosts[clicksCostIndex].cost, 'clickCost');
        changeCostUI(clicksCosts[clicksCostIndex].clicksToAdd, 'clicksToAdd');
    }
}

function addCash() {
    let cashToAdd = clicksPerClick * Math.max(clicksCostIndex, 1) * 10 ;
    cash += cashToAdd;
    localStorage.setItem('cashAmount', cash);
    return Number(cash);
}

function reset(clicks, imgValue, clicksPerClick, cashAmount, clicksCostIndex, currentLevelPoints) {
    localStorage.removeItem(clicks);
    localStorage.removeItem(imgValue);
    localStorage.removeItem(clicksPerClick);
    localStorage.removeItem(cashAmount);
    localStorage.removeItem(clicksCostIndex);
    localStorage.removeItem(currentLevelPoints);
    location.reload();
}

function clicksCounter() {
    clicksCount += clicksPerClick;
    localStorage.setItem('clicksCount', clicksCount);
    return clicksCount;
}

function checkNumberOfClicks(clicks) {
    if(clicks >= currentLevelPoints) {
        currentLevelPoints = (currentLevelPoints + 50) * clicksPerClick;
        localStorage.setItem('currentLevelPoints', currentLevelPoints);
        imagesValue++;
        localStorage.setItem('imagesValue', imagesValue);
        setImgSrc(imagesValue, true);
        
    } else {
        setImgSrc(imagesValue, false);
    }
}

function checkAndSetLocalStorage() {
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
        cash = Number(localStorage.getItem('cashAmount'));
    }

    if(localStorage.getItem('clicksCostIndex') == null) {
        localStorage.setItem('clicksCostIndex', clicksCostIndex);
    } else {
        clicksCostIndex = localStorage.getItem('clicksCostIndex');
    }

    if(localStorage.getItem('imagesValue') == null) {
        imagesValue = 0;
        localStorage.setItem('imagesValue', imagesValue);
    } else {
        imagesValue = Number(localStorage.getItem('imagesValue'));
    }

    if(localStorage.getItem('currentLevelPoints') == null) {
        currentLevelPoints = 50;
        localStorage.setItem('currentLevelPoints', currentLevelPoints);
    } else {
        currentLevelPoints = Number(localStorage.getItem('currentLevelPoints'));
    }
}
// To do: 
// --- fix checkNumberOfClicks function
// --- create DOMString object