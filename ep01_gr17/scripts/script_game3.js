// Variables para el Juego 3
let scoreSnake = 0;
let snakeIntervalId;
let snake;
let snakeDirection;
let giftPosition;
let isGameRunning = false;

const snakeCanvas = document.getElementById("snakeCanvas");
const ctx = snakeCanvas.getContext("2d");

// Configuración de la cuadrícula
const gridWidth = 25; 
const gridHeight = 15; 
const cellSize = Math.min(snakeCanvas.width / gridWidth, snakeCanvas.height / gridHeight);

// Configuración del canvas en función de las celdas
snakeCanvas.width = gridWidth * cellSize;
snakeCanvas.height = gridHeight * cellSize;

// Desactiva el suavizado de imagen para mejorar la nitidez
ctx.imageSmoothingEnabled = false;

// Carga imágenes con alta resolución o que correspondan al tamaño del cellSize
const headImage = new Image();
headImage.src = 'images/trineo.png';

const bodyImage = new Image();
bodyImage.src = 'images/saco.png';

const giftImage = new Image();
giftImage.src = 'images/regalo.png';

// Función para iniciar el juego de Snake
function startGame3() {
    scoreSnake = 0;
    document.getElementById('scoreSnake').innerText = scoreSnake;
    snake = [{ x: 10, y: 10 }]; 
    snakeDirection = "right";
    generateGiftPosition();
    isGameRunning = true;

    clearInterval(snakeIntervalId);
    snakeIntervalId = setInterval(updateSnakeGame, 150);
}

// Dibuja la serpiente y el regalo
function drawSnake() {
    snake.forEach((segment, index) => {
        const image = index === 0 ? headImage : bodyImage;

        if (index === 0) {
            ctx.save();
            const x = segment.x * cellSize;
            const y = segment.y * cellSize;

            if (snakeDirection === "right") {

                ctx.scale(-1, 1);
                ctx.drawImage(image, -x - cellSize, y, cellSize, cellSize);
            } 
            else if (snakeDirection === "down") {
            
                ctx.scale(1, -1);
                ctx.drawImage(image, x, -y - cellSize, cellSize, cellSize);
            } 
            else if (snakeDirection === "left") {
                
                ctx.drawImage(image, x, y, cellSize, cellSize);
            }
            else if (snakeDirection === "up") {
                // Rota hacia arriba (90 grados hacia la derecha)
                ctx.translate(x + cellSize / 2, y + cellSize / 2); // Centra la rotación
                ctx.rotate(Math.PI / 2); // Rotación de -90 grados
                ctx.drawImage(image, -cellSize / 2, -cellSize / 2, cellSize, cellSize); // Dibuja la imagen centrada
            }
            

            ctx.restore(); 
        } else {
            
            ctx.drawImage(image, segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
        }
    });
}



function drawGift() {
    ctx.drawImage(giftImage, giftPosition.x * cellSize, giftPosition.y * cellSize, cellSize, cellSize); // Tamaño ajustado a cellSize
}

// Genera una posición aleatoria para el regalo 
function generateGiftPosition() {
    giftPosition = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
    };
}

let canChangeDirection = true;

document.addEventListener("keydown", (event) => {
    if (!canChangeDirection) return; 

    if ((event.key === "ArrowUp" || event.key === "w") && snakeDirection !== "down") {
        snakeDirection = "up";
        canChangeDirection = false;
    } else if ((event.key === "ArrowDown" || event.key === "s") && snakeDirection !== "up") {
        snakeDirection = "down";
        canChangeDirection = false;
    } else if ((event.key === "ArrowLeft" || event.key === "a") && snakeDirection !== "right") {
        snakeDirection = "left";
        canChangeDirection = false;
    } else if ((event.key === "ArrowRight" || event.key === "d") && snakeDirection !== "left") {
        snakeDirection = "right";
        canChangeDirection = false;
    }
});
// Actualiza el juego de Snake
function updateSnakeGame() {
    if (!isGameRunning) return;

    canChangeDirection = true; // Permite cambio de dirección en cada actualización

    const head = { x: snake[0].x, y: snake[0].y };
    if (snakeDirection === "up") head.y -= 1;
    else if (snakeDirection === "down") head.y += 1;
    else if (snakeDirection === "left") head.x -= 1;
    else if (snakeDirection === "right") head.x += 1;

    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight || snakeCollision(head)) {
        gameOver();
        return;
    }

    if (head.x === giftPosition.x && head.y === giftPosition.y) {
        scoreSnake++;
        document.getElementById('scoreSnake').innerText = scoreSnake;
        generateGiftPosition();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    drawSnake();
    drawGift();
}


function snakeCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Función para terminar el juego cuando ocurre una colisión
function gameOver() {
    clearInterval(snakeIntervalId);
    isGameRunning = false;
    alert('¡Juego terminado! Puntaje final: ' + scoreSnake);
}
