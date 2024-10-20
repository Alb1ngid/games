let startButton = document.querySelector('#start');
let game = document.querySelector('#game');
let timeHeader = document.querySelector('#time-header');
let resultHeader = document.querySelector('#result-header');
let timeDisplay = document.querySelector('#time');
let resultDisplay = document.querySelector('#result');
let gameTimeInput = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;


startButton.addEventListener('click', startGame);

gameTimeInput.addEventListener('input', setGameTime);

function startGame() {
    score = 0;
    setGameTime();
    gameTimeInput.setAttribute('disabled', 'true');
    show(timeHeader);
    hide(resultHeader);
    isGameStarted = true;
    game.style.backgroundColor = '#fff';
    startButton.classList.add('hide');

    let interval = setInterval(function () {
        let time = parseFloat(timeDisplay.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            timeDisplay.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function setGameTime() {
    let time = +gameTimeInput.value;
    timeDisplay.textContent = time.toFixed(1);
}

function endGame() {
    isGameStarted = false;
    show(startButton);
    gameTimeInput.removeAttribute('disabled');
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    show(resultHeader);
    hide(timeHeader);
    resultDisplay.textContent = score;
}

function renderBox() {
    if (!isGameStarted) {
        return;
    }

    game.innerHTML = '';

    let box = document.createElement('div');
    let boxSize = getRandom(30, 100);
    let gameSize = game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = getRandomColor();
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    game.appendChild(box);

    box.addEventListener('click', handleBoxClick);
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function show(element) {
    element.classList.remove('hide');
}

function hide(element) {
    element.classList.add('hide');
}
