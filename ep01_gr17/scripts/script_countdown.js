// script.js

function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 11, 24, 23, 59, 59); // 24 de diciembre a las 23:59:59

    // Si la fecha actual es después del 24 de diciembre, ajusta el año objetivo al próximo año
    if (now > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const totalSeconds = (targetDate - now) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

// Actualiza el contador cada segundo
setInterval(updateCountdown, 1000);

// Inicializa el contador
updateCountdown();