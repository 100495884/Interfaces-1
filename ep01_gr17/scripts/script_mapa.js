document.getElementById('start-btn').addEventListener('click', function() {
    // Hacer desaparecer el botón
    this.style.display = 'none';

    // Quitar el difuminado de la imagen
    document.getElementById('background-image').style.filter = 'none';

    // Iniciar animación de Papá Noel
    startSantaAnimation();
});

function startSantaAnimation() {
    const santa = document.getElementById('santa');
    const container = document.getElementById('background-image');
    const backgroundImage = new Image();
    backgroundImage.src = getComputedStyle(container).backgroundImage.slice(5, -2); // Obtener la URL de la imagen de fondo

    backgroundImage.onload = () => {
        const containerStyles = getComputedStyle(container);
        const containerWidth = container.offsetWidth; // Ancho visible del contenedor
        const containerHeight = container.offsetHeight; // Alto visible del contenedor

        const backgroundScaleX = containerWidth / backgroundImage.width; // Escala horizontal
        const backgroundScaleY = containerHeight / backgroundImage.height; // Escala vertical

        let posX = (containerWidth - santa.offsetWidth) / 2; // Centrar a Santa horizontalmente
        let posY = (containerHeight - santa.offsetHeight) / 2; // Centrar a Santa verticalmente
        let speed = 0.4;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 0.5 - 0.25; // Menor rango vertical

        setInterval(() => {
            // Actualizar las posiciones de Santa con movimientos más suaves
            posX += directionX * speed;
            posY += directionY * speed;

            // Cambiar la dirección gradualmente
            directionX += (Math.random() * 0.2 - 0.1) * 2; // Aumentar peso horizontal
            directionY += (Math.random() * 0.1 - 0.05); // Reducir rango vertical

            // Normalizar la dirección para evitar movimientos demasiado rápidos
            const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
            directionX /= magnitude;
            directionY /= magnitude;

            // Limitar a los bordes visibles del contenedor
            const santaWidth = santa.offsetWidth;
            const santaHeight = santa.offsetHeight;

            if (posX < 15) {
                posX = 15;
                directionX *= -1; // Rebota en el borde izquierdo
            }
            if (posY < 15) {
                posY = 15;
                directionY *= -1; // Rebota en el borde superior
            }
            if (posX > containerWidth - santaWidth) {
                posX = containerWidth - santaWidth;
                directionX *= -1; // Rebota en el borde derecho
            }
            if (posY > containerHeight - santaHeight) {
                posY = containerHeight - santaHeight;
                directionY *= -1; // Rebota en el borde inferior
            }

            // Actualizar la posición de Santa
            santa.style.left = `${posX}px`;
            santa.style.top = `${posY}px`;

            // Dibujar la línea discontinua
            drawDottedLine(posX+2, posY+2); // Centrar la línea en Santa
        }, 20);
    };
}


function drawDottedLine(x, y) {
    const lineContainer = document.createElement('div');

    // Tamaño del punto
    const dotSize = 2;

    // Calcular la posición exacta para centrar el punto
    lineContainer.style.position = 'absolute';
    lineContainer.style.top = `${y - dotSize / 2}px`; // Centrar verticalmente
    lineContainer.style.left = `${x - dotSize / 2}px`; // Centrar horizontalmente
    lineContainer.style.width = `${dotSize}px`;
    lineContainer.style.height = `${dotSize}px`;
    lineContainer.style.backgroundColor = '#ff6347';
    lineContainer.style.borderRadius = '50%';

    document.getElementById('background-image').appendChild(lineContainer);

    // Desaparecer la línea después de un tiempo
    setTimeout(() => {
        lineContainer.remove();
    }, 2500);
}



document.getElementById('santa').addEventListener('click', function () {
    const santa = document.getElementById('santa');
    const message = document.createElement('div');
    message.id = 'santa-message';
    message.innerText = '¡Santa ya está de camino con tus regalos!';

    // Calcular la posición del mensaje
    const santaRect = santa.getBoundingClientRect();
    const container = document.getElementById('background-image');

    message.style.top = `${santa.offsetTop - 40}px`; // Un poco encima de Santa
    message.style.left = `${santa.offsetLeft + santa.offsetWidth / 2 - 50}px`; // Centrado horizontalmente
    container.appendChild(message);

    // Mostrar el mensaje
    message.style.display = 'block';

    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        message.remove();
    }, 3000);
});
