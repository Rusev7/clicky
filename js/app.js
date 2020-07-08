let clicksCount, imagesValue;

// start the game;
appInit();


function changeBackground() {
    const colors = ['#FFA421', '#0078ff', '#bd00ff', '#01ff1f', '#e3ff00'];

    let num = Math.floor(Math.random() * colors.length);

    const bodyEl = document.querySelector('body');

    bodyEl.style.backgroundColor = colors[num];
}

function appInit() {
    
    if(localStorage.getItem('clicksCount') == null) {
        clicksCount = 0;
        localStorage.setItem('clicksCount', clicksCount);
    } else {
        clicksCount = Number(localStorage.getItem('clicksCount'));
    }

    if(localStorage.getItem('imagesValue') == null) {
        imagesValue = 0;
        localStorage.setItem('imagesValue', imagesValue);
    } else {
        imagesValue = Number(localStorage.getItem('imagesValue'));
    }

    const span = document.getElementById('clicks');
    span.innerText = clicksCount;

    setImgSrc(imagesValue, false);

    const img = document.querySelector('.image');

    img.addEventListener('click', () => {
        changeBackground();
        clicksPresentUI(clicksCounter());
        checkNumberOfClicks(clicksCount);
    });
}

function setImgSrc(value, animationBool) {
    const img = document.querySelector('.image');
    img.src = `img/img-${value}.png`;

    if(animationBool) {
        img.classList.add('shake');
    } else {
        img.classList.remove('shake');
    }
}

function clicksCounter() {
    clicksCount++;
    localStorage.setItem('clicksCount', clicksCount);
    return clicksCount;
}

function clicksPresentUI(clicks) {
    const span = document.getElementById('clicks');
    span.innerText = clicks;
}

function checkNumberOfClicks(clicks) {
    const gameContainerElement = document.querySelector('.game-container');

    if(clicks % 500 == 0) {
        gameContainerElement.classList.add('shake');
    } else {
        gameContainerElement.classList.remove('shake');
    }
 
    if(clicks / 100 == imagesValue + 1) {
        imagesValue++;
        localStorage.setItem('imagesValue', imagesValue);
        setImgSrc(imagesValue, true);
    } else {
        setImgSrc(imagesValue, false);
    }
}

console.log(1500 % 500);