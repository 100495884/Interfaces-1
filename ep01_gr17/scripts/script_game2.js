
// Función para inicializar el juego de parejas
function startGame2() {
    // Limpia intervalos y contenido previo
    clearInterval(pairsIntervalId);
    document.querySelector('.memory-game').innerHTML = '';

    // Reinicia variables de estado
    pairsFound = 0;
    timeRemainingPairs = 60;
    document.getElementById('pairsFound').innerText = pairsFound;
    document.getElementById('timePairs').innerText = timeRemainingPairs;

    // Genera y baraja las cartas
    const memoryGame = document.querySelector('.memory-game');
    const shuffledImages = images.sort(() => 0.5 - Math.random());

    shuffledImages.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-front">
                <img src="${image}" alt="Carta navideña" class="card-image">
            </div>
            <div class="card-back">🎄</div>
        `;
        memoryGame.appendChild(card);
        card.addEventListener('click', flipCard);
    });

    // Inicia temporizador
    pairsIntervalId = setInterval(updatePairsTimer, 1000);
}


// Función para voltear una carta
function flipCard() {
    if (lockBoard) return; // Evitar interacción mientras se comparan cartas
    if (this === firstCard) return; // No permite hacer clic en la misma carta

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    
    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Función para verificar si hay coincidencia
function checkForMatch() {
    // Compara el src de las imágenes en lugar de backgroundImage
    const firstImage = firstCard.querySelector('.card-front img').src;
    const secondImage = secondCard.querySelector('.card-front img').src;

    if (firstImage === secondImage) {
        disableCards();
        pairsFound++;
        document.getElementById('pairsFound').innerText = pairsFound;

        // Verificar si se han encontrado todas las parejas
        if (pairsFound === images.length / 2) {
            clearInterval(pairsIntervalId);
            alert('¡Felicidades! Has encontrado todas las parejas antes de que el tiempo se acabara.');
        }
    } else {
        unflipCards();
    }
}

// Función para desactivar cartas si hay coincidencia
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Función para desvoltear cartas si no hay coincidencia
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Función para reiniciar las variables de control del tablero
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Función para actualizar el temporizador del juego de parejas
function updatePairsTimer() {
    timeRemainingPairs--;
    document.getElementById('timePairs').innerText = timeRemainingPairs;

    if (timeRemainingPairs <= 0) {
        clearInterval(pairsIntervalId);
        alert('¡Tiempo terminado! Pares encontrados: ' + pairsFound);
    }
}