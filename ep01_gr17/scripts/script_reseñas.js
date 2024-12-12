// Función para enviar una reseña
function sendReseña(event) {
    event.preventDefault();

    const userLogged = JSON.parse(localStorage.getItem("userLogged"));
    if (!userLogged) {
        alert("Debes estar registrado e iniciar sesión para enviar una reseña.");
        return;
    }

    const anonimo = document.getElementById("anonimo").checked;
    const titulo = document.getElementById("titulo").value.trim();
    const textoReseña = document.getElementById("texto").value.trim();

    // Validación de campos
    if (!titulo) {
        alert("Por favor ingresa un título para tu reseña.");
        return;
    }
    if (!textoReseña) {
        alert("Por favor escribe el texto de tu reseña.");
        return;
    }

    const nuevaReseña = {
        anonimo,
        titulo,
        calificacion: selectedRating,
        texto: textoReseña,
        usuario: anonimo ? "Anónimo" : userLogged.username,
    };

    let usersData = JSON.parse(localStorage.getItem("userData")) || [];
    const userIndex = usersData.findIndex(user => user.username === userLogged.username);

    if (userIndex !== -1) {
        if (!usersData[userIndex].reseñas) {
            usersData[userIndex].reseñas = [];
        }
        usersData[userIndex].reseñas.push(nuevaReseña);

        localStorage.setItem("userData", JSON.stringify(usersData));
        alert("Reseña enviada con éxito.");

        // Restablecer los valores del formulario
        resetReseñaForm();
    } else {
        alert("Hubo un problema al enviar tu reseña. Por favor, intenta nuevamente.");
    }
}

function resetReseñaForm() {
    // Reiniciar el estado de los campos del formulario
    document.getElementById("anonimo").checked = false; // Desmarcar el checkbox
    document.getElementById("titulo").value = ""; // Vaciar el campo del título
    document.getElementById("texto").value = ""; // Vaciar el campo del texto de la reseña
    selectedRating = 1; // Restablece la calificación a 1 estrella

    // Restablecer visualmente las estrellas
    const stars = document.querySelectorAll('.rating-container .star');
    stars.forEach((s) => s.classList.remove('active')); // Eliminar todas las clases activas
    stars[0].classList.add('active'); // Seleccionar la primera estrella
}


// Vincula el evento al botón de enviar
document.getElementById("reseña-enviar").addEventListener("click", sendReseña);



// Función para abrir el popup de reseñas
function openReseñasPopup() {
    const usersData = JSON.parse(localStorage.getItem("userData")) || [];
    const reseñasList = document.getElementById("reseñas-list");
    reseñasList.innerHTML = "";

    usersData.forEach(user => {
        if (user.reseñas && user.reseñas.length > 0) {
            user.reseñas.forEach(reseña => {
                const reseñaElement = document.createElement("div");
                reseñaElement.classList.add("reseña-item");

                // Generar las estrellas
                const estrellas = "★".repeat(reseña.calificacion);

                reseñaElement.innerHTML = `
                    <h4>${reseña.titulo}</h4>
                    <div class="reseña-stars">${estrellas}</div>
                    <p>${reseña.texto}</p>
                    <small>- ${reseña.usuario}</small>
                `;
                reseñasList.appendChild(reseñaElement);
            });
        }
    });

    document.getElementById("popup-reseñas").style.display = "block";
}


// Función para cerrar el popup de reseñas
function closeReseñasPopup() {
    document.getElementById("popup-reseñas").style.display = "none";
}
