
let score = 0;
let timeRemaining = 90; // 90 segundos para el temporizador
let intervalId, circleIntervalId, giftTimerId, giftIntervalId;

function showGame(gameNumber) {
    document.querySelectorAll('.game').forEach(game => game.style.display = 'none');
    document.getElementById(`game${gameNumber}`).style.display = 'block';

    if (gameNumber === 1) {
        startGame1();
    } else if (gameNumber === 2) {
        startGame2();
    } else if (gameNumber === 3) {
        startGame3();
    } else {
        clearInterval(intervalId);
        clearInterval(circleIntervalId);
        clearInterval(giftTimerId);
        clearTimeout(giftIntervalId);
        clearInterval(snowballIntervalId);
        clearInterval(snowballTimerId);
    }
}

function startGame1() {
    // Limpiar intervalos anteriores
    clearInterval(intervalId);
    clearInterval(circleIntervalId);
    clearTimeout(giftIntervalId);

    // Reiniciar variables de estado del juego
    score = 0;
    timeRemaining = 90;
    document.getElementById('score').innerText = score;
    document.getElementById('time').innerText = timeRemaining;

    // Iniciar el juego
    moveCircle();
    intervalId = setInterval(updateTimer, 1000);
}


function moveCircle() {
    const circle = document.getElementById('circle');
    const gameContainer = document.querySelector('.game-container');

    circleIntervalId = setInterval(() => {
        const maxX = gameContainer.clientWidth - circle.offsetWidth;
        const maxY = gameContainer.clientHeight - circle.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        circle.style.left = `${randomX}px`;
        circle.style.top = `${randomY}px`;
    }, 800); 
}

document.getElementById('circle').addEventListener('click', () => {
    score++;
    document.getElementById('score').innerText = score;
    playClickSound();
});

function updateTimer() {
    timeRemaining--;
    document.getElementById('time').innerText = timeRemaining;

    if (timeRemaining <= 0) {
        clearInterval(intervalId);
        clearInterval(circleIntervalId);
        alert('¡Tiempo terminado! Puntaje final: ' + score);
    }
}

function playClickSound() {
    const clickSound = new Audio('sounds/click.mp3'); // Asegúrate de tener un archivo de sonido en la carpeta 'sounds'
    clickSound.play();
}





// Variables para el Juego 2
let pairsFound = 0;
let timeRemainingPairs = 60; // 60 segundos para el juego de parejas
let pairsIntervalId;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Configuración de las imágenes para las cartas navideñas
const images = [
    'images/carta1.png', 'images/carta2.png', 'images/carta3.png',
    'images/carta4.png', 'images/carta5.png', 'images/carta6.png',
    'images/carta1.png', 'images/carta2.png', 'images/carta3.png',
    'images/carta4.png', 'images/carta5.png', 'images/carta6.png'
];
