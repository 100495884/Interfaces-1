function openProfilePopup() {
    document.getElementById('profile-popup').style.display = 'block';
}

function closeProfilePopup() {
    document.getElementById('profile-popup').style.display = 'none';
}

function openLettersPopup() {
    document.getElementById('letters-popup').style.display = 'block';
}

function closeLettersPopup() {
    document.getElementById('letters-popup').style.display = 'none';
}

// Añadir campos para hijos
document.getElementById('children').addEventListener('input', function() {
    const childrenCount = this.value;
    const childrenDetails = document.getElementById('children-details');
    childrenDetails.innerHTML = '';

    for (let i = 0; i < childrenCount; i++) {
        childrenDetails.innerHTML += `
            <div>
                <label for="child-name-${i}">Nombre del hijo/hija ${i + 1}*</label>
                <input type="text" id="child-name-${i}" name="child-name-${i}" required minlength="3">
                
                <label for="child-age-${i}">Edad del hijo/hija ${i + 1}*</label>
                <input type="number" id="child-age-${i}" name="child-age-${i}" required min="0">
                
                <label for="child-toys-${i}">Juguetes favoritos del hijo/hija ${i + 1}</label>
                <input type="text" id="child-toys-${i}" name="child-toys-${i}">
            </div>
        `;
    }
});

// Función para cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Eliminar datos de sesión
        localStorage.removeItem('userData');
        // Cambiar icono de perfil por botones de inicio de sesión y registro
        document.querySelector('.auth-buttons').style.display = 'flex';
        document.querySelector('.profile-icon').style.display = 'none';
        alert('Sesión cerrada.');
    }
}