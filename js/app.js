let clicksCount, imagesValue, clicksPerClick, cash, cashPerClick;
let colorIndex = 0;
let clicksCostIndex = 0;
let currentLevelPoints = 50;
let weaponsCostIndex = 0;

const clicksCosts = [
    {
        cost: 1000,
        clicksToAdd: 2
    }, 
    
    {
        cost: 10000,
        clicksToAdd: 5
    }, 
    
    {
        cost: 20000,
        clicksToAdd: 10
    }, 
    
    {
        cost: 100000,
        clicksToAdd: 20
    },
];

// Weapons 
const weaponsCosts = [
    {
        name: 'axe',
        cost: 3000, // 3000
        clicksToAdd: 3,
        src: './img/axe',
    }, 
    
    {
        name: 'sword',
        cost: 30000, // 150000
        clicksToAdd: 5,
        src: './img/sword',
    }, 
    
    {
        name: 'hammer',
        cost: 100000, // 35000
        clicksToAdd: 8,
        src: './img/hammer',
    }, 
    
    {
        name: 'arm of pain',
        cost: 1000000, // 150000
        clicksToAdd: 15,
        src: './img/arm',
    },
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
    cashTextElement: 'cash',
    clicksButtonSpan: 'clicksToAdd',
    clicksCostSpan: 'clickCost',
    numClicksSpan: 'clicks',
    gameContainerElement: '.game-container',
    weapon: '.weapons',
    weaponsCostSpan: 'weaponCost',
    weaponsButtonSpan: 'weaponToAdd',
    buyWeaponsBtn: 'buyWeapons',
    weaponImg: '.weapons',
    weaponBtnContainer: 'weaponBtn',
    clicksBtnContainer: 'clicksBtn',
    clicksPerClickSpan: 'clicksPerClick',
    cashPerClickSpan: 'cashPerClick',
};
// start the game;
appInit();

function appInit() {
    // Check for localstorage values
    checkAndSetLocalStorage();

    const img = document.querySelector(DOMStrings.img);
    const resetBtn = document.querySelector(DOMStrings.resetBtn);
    const cashTextElement = document.getElementById(DOMStrings.cashTextElement);
    const span = document.getElementById(DOMStrings.numClicksSpan);
    const changeColorSchemeBtn = document.getElementById(DOMStrings.colorSchemeBtn);
    const addClicksBtn = document.getElementById(DOMStrings.addClicksBtn);
    const clicksButtonSpan = document.getElementById(DOMStrings.clicksButtonSpan);
    const clicksCostSpan = document.getElementById(DOMStrings.clicksCostSpan);
    const weaponsButtonSpan = document.getElementById(DOMStrings.weaponsButtonSpan);
    const weaponsCostSpan = document.getElementById(DOMStrings.weaponsCostSpan);
    const buyWeaponsBtn = document.getElementById(DOMStrings.buyWeaponsBtn);


    let num = 0;
    setImgSrc(imagesValue, false);   
    setGameInfoUI(); 
    span.innerText = clicksCount;
    cashTextElement.innerText = `$${Number(cash)}`;

    // ----- Change Colors
    changeColorSchemeBtn.addEventListener('click', () => {
        changeColorScheme();
    });

    // ------ Buy Weapons
    if(weaponsCostIndex <= (weaponsCosts.length - 1)) {
        weaponsButtonSpan.innerText = `${weaponsCosts[weaponsCostIndex].name} +${weaponsCosts[weaponsCostIndex].clicksToAdd}`;
        weaponsCostSpan.innerText = weaponsCosts[weaponsCostIndex].cost;

        showWeaponUI();
        
        buyWeaponsBtn.addEventListener('click', () => {
            buyWeapon();
            showWeaponUI();
        });
    } else {
        showWeaponUI();
        removeWeaponsBtnUI();
    }
    

    // ----- Add clicks
    if(clicksCostIndex <= (clicksCosts.length - 1)) {
        clicksButtonSpan.innerText = clicksCosts[clicksCostIndex].clicksToAdd;
        clicksCostSpan.innerText = clicksCosts[clicksCostIndex].cost;

        addClicksBtn.addEventListener('click', () => {
            addClicks();
        });
    } else {
        removeClicksBtnUI();
    }
    

    // ----- Main Clicking Event Listener
    img.addEventListener('mouseup', () => {
        changeBackground(num);
        clicksPresentUI(clicksCounter());
        checkNumberOfClicks(clicksCount);
        changeCashUI(addCash());
        weaponStrikeRemoveUI()
        num++;
        if(num == 5) {
            num = 0;
        }
    });

    img.addEventListener('mousedown', () => {
        weaponStrikeAddUI();
    });

    // ----- RESET THE GAME
    resetBtn.addEventListener('click', () => {
        reset();
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

function setGameInfoUI() {
    const clicksPerClickSpan = document.getElementById(DOMStrings.clicksPerClickSpan);
    const cashPerClickSpan = document.getElementById(DOMStrings.cashPerClickSpan);
    clicksPerClickSpan.innerText = clicksPerClick;
    cashPerClickSpan.innerText = cashPerClick;
}

function changeCostUI(cost, id) {
    const spanElement = document.getElementById(id);
    spanElement.innerText = cost;
}

function changeWeaponBtnSpanUI() {
    const weaponSpanBtn = document.getElementById(DOMStrings.weaponsButtonSpan);
    weaponSpanBtn.innerText = `${weaponsCosts[weaponsCostIndex].name} +${weaponsCosts[weaponsCostIndex].clicksToAdd}`;
}

function showWeaponUI() {
    const weaponImg = document.querySelector(DOMStrings.weaponImg);
    console.log('showed');
    if(weaponsCostIndex == 0) {
        weaponImg.style.display = 'none';
    } else {
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let imgSrc = `${weaponsCosts[weaponsCostIndex - 1].src}.png`;
        console.log(imgSrc);
    
        if(width <= 600) {
            imgSrc = `${weaponsCosts[weaponsCostIndex - 1].src}-compressor.png`;
        }
        
        weaponImg.src = imgSrc;
        weaponImg.style.display = 'block';
    }
}

function removeWeaponsBtnUI() {
    const weaponBtnContainer = document.getElementById(DOMStrings.weaponBtnContainer);
    weaponBtnContainer.style.display = 'none';
}

function removeClicksBtnUI() {
    const clicksBtnContainer = document.getElementById(DOMStrings.clicksBtnContainer);
    clicksBtnContainer.style.display = 'none';
}

function changeCashUI(cash) {
    cash = Number(cash);
    const cashTextElement = document.getElementById(DOMStrings.cashTextElement);
    cashTextElement.innerText = `$${cash}`;
}

function weaponStrikeAddUI() {
    const weapon = document.querySelector(DOMStrings.weapon);
    weapon.classList.add('strike');
}

function weaponStrikeRemoveUI() {
    const weapon = document.querySelector(DOMStrings.weapon);
    weapon.classList.remove('strike');
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
        let currentWeaponBonus;

        if(weaponsCostIndex == 0) {
            currentWeaponBonus = 0;
        } else {
            currentWeaponBonus = weaponsCosts[weaponsCostIndex - 1].clicksToAdd;
        }

        clicksPerClick = clicksPerClick + clicksCosts[clicksCostIndex].clicksToAdd + currentWeaponBonus;
        cashPerClick = clicksPerClick * Math.max(clicksCostIndex, 1) * 10 ;
        cash -= clicksCosts[clicksCostIndex].cost;
        changeCashUI(cash);
        clicksCostIndex++;

        if(clicksCostIndex <= (clicksCosts.length - 1)) {
            changeCostUI(clicksCosts[clicksCostIndex].cost, 'clickCost');
            changeCostUI(clicksCosts[clicksCostIndex].clicksToAdd, 'clicksToAdd');
        } else {
            removeClicksBtnUI();
        }

        localStorage.setItem('clicksPerClick', clicksPerClick);
        localStorage.setItem('cashAmount', cash);
        localStorage.setItem('clicksCostIndex', clicksCostIndex);
        setGameInfoUI();
        
    }
}

function buyWeapon() {

    if(cash >= weaponsCosts[weaponsCostIndex].cost) {
        clicksPerClick += weaponsCosts[weaponsCostIndex].clicksToAdd;
        cash -= weaponsCosts[weaponsCostIndex].cost;
        cashPerClick = clicksPerClick * Math.max(clicksCostIndex, 1) * 10 ;
        changeCashUI(cash);
        weaponsCostIndex++;

        if(weaponsCostIndex <= (weaponsCosts.length - 1)) {
            changeCostUI(weaponsCosts[weaponsCostIndex].cost, 'weaponCost');
            changeWeaponBtnSpanUI();
        } else {
            removeWeaponsBtnUI();
        }

        localStorage.setItem('clicksPerClick', clicksPerClick);
        localStorage.setItem('cashAmount', cash);
        localStorage.setItem('weaponsCostIndex', weaponsCostIndex);
        setGameInfoUI();
        console.log(weaponsCostIndex);
        
        
    }
}

function addCash() {
    cashPerClick = clicksPerClick * Math.max(clicksCostIndex, 1) * 10 ;
    cash += cashPerClick;
    localStorage.setItem('cashPerClick', cashPerClick);
    localStorage.setItem('cashAmount', cash);
    return Number(cash);
}

function reset() {
    localStorage.clear();
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

    if(localStorage.getItem('cashPerClick') == null) {
        cashPerClick = clicksPerClick * Math.max(clicksCostIndex, 1) * 10;
        localStorage.setItem('cashPerClick', cashPerClick);
    } else {
        cashPerClick = Number(localStorage.getItem('cashPerClick'));
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
        clicksCostIndex = Number(localStorage.getItem('clicksCostIndex'));
    }

    if(localStorage.getItem('weaponsCostIndex') == null) {
        localStorage.setItem('weaponsCostIndex', weaponsCostIndex);
    } else {
        weaponsCostIndex = Number(localStorage.getItem('weaponsCostIndex'));
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