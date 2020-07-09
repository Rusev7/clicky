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
    const btn = document.querySelector('.btn');

    img.addEventListener('click', () => {
        changeBackground();
        clicksPresentUI(clicksCounter());
        checkNumberOfClicks(clicksCount);
    });

    btn.addEventListener('click', () => {
        reset('clicksCount', 'imagesValue');
    });
}

function setImgSrc(value, animationBool) {
    const img = document.querySelector('.image');
    img.src = `img/img-${value}.png`;
    const gameContainerElement = document.querySelector('.game-container');

    if(animationBool) {
        gameContainerElement.classList.add('shake');
        img.classList.remove('clickable');
    } else {
        gameContainerElement.classList.remove('shake');
        img.classList.add('clickable');
    }
}

function reset(clicks, imgValue) {
    localStorage.removeItem(clicks);
    localStorage.removeItem(imgValue);
    location.reload();
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

    if(clicks % 250 == 0) {
        gameContainerElement.classList.add('shake');
    } else {
        gameContainerElement.classList.remove('shake');
    }
 
    if(clicks % 50 == 0) {
        imagesValue++;
        localStorage.setItem('imagesValue', imagesValue);
        setImgSrc(imagesValue, true);
    } else {
        setImgSrc(imagesValue, false);
    }
}

