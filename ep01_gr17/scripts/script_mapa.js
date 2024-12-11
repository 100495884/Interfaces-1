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
    const maxWidth = container.offsetWidth;  
    const maxHeight = container.offsetHeight; 

    let posX = maxWidth / 2; // Posición inicial de Santa en el centro
    let posY = maxHeight / 2; 
    let speed = 1; 
    let directionX = Math.random() * 2 - 1; 
    let directionY = Math.random() * 2 - 1;

    let distanceTraveled = 0; 
    const changeDirectionDistance = 50; 

    // Asegurarse de que Santa se mueva en línea recta
    setInterval(() => {
        // Calcular la distancia recorrida
        const prevPosX = posX;
        const prevPosY = posY;

        // Actualizar las posiciones de Santa
        posX += directionX * speed;
        posY += directionY * speed;

        const deltaX = posX - prevPosX;
        const deltaY = posY - prevPosY;
        distanceTraveled += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Cambiar dirección si Santa ha recorrido la distancia mínima
        if (distanceTraveled >= changeDirectionDistance) {
            directionX = Math.random() * 2 - 1;
            directionY = Math.random() * 2 - 1; 
            distanceTraveled = 0; 
        }

        if (posX < 0) posX = 0; 
        if (posY < 0) posY = 0;  
        if (posX > maxWidth - santa.offsetWidth) posX = maxWidth - santa.offsetWidth;  
        if (posY > maxHeight - santa.offsetHeight) posY = maxHeight - santa.offsetHeight;  

        // Actualizar la posición de Santa en la pantalla
        santa.style.left = `${posX}px`;
        santa.style.top = `${posY}px`;

        // Dibujar la línea discontinua
        drawDottedLine(posX, posY);

    }, 20); 
}

function drawDottedLine(x, y) {
    const lineContainer = document.createElement('div');
    lineContainer.style.position = 'absolute';
    lineContainer.style.top = `${y}px`;
    lineContainer.style.left = `${x}px`;
    lineContainer.style.width = '2px';
    lineContainer.style.height = '2px';
    lineContainer.style.backgroundColor = '#ff6347';
    lineContainer.style.borderRadius = '50%';

    document.getElementById('background-image').appendChild(lineContainer);

    // Desaparecer la línea después de un tiempo
    setTimeout(() => {
        lineContainer.remove();
    }, 2500);
}
