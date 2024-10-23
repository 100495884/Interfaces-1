// script.js

// Funciones para abrir y cerrar las ventanas emergentes
function openRegisterPopup() {
    document.getElementById('register-popup').style.display = 'block';
}

function closeRegisterPopup() {
    document.getElementById('register-popup').style.display = 'none';
}

function openLoginPopup() {
    document.getElementById('login-popup').style.display = 'block';
}

function closeLoginPopup() {
    document.getElementById('login-popup').style.display = 'none';
}



// Función para alternar el menú de perfil
function toggleProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Validación del formulario de registro
function validateRegisterForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const children = document.getElementById('children').value;

    // Validar nombre de usuario
    if (username.length < 3) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }

    // Validar contraseña
    const passwordRegex = /^[A-Za-z]{12,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 12 caracteres y contener solo letras.');
        return;
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('El correo electrónico no es válido.');
        return;
    }

    // Validar ciudad y país
    if (city.length < 3 || country.length < 3) {
        alert('La ciudad y el país deben tener al menos 3 caracteres.');
        return;
    }

    // Validar hijos
    if (children > 0) {
        for (let i = 0; i < children; i++) {
            const childName = document.getElementById(`child-name-${i}`).value;
            const childAge = document.getElementById(`child-age-${i}`).value;
            if (childName.length < 3) {
                alert(`El nombre del hijo/hija ${i + 1} debe tener al menos 3 caracteres.`);
                return;
            }
            if (childAge <= 0) {
                alert(`La edad del hijo/hija ${i + 1} debe ser un número positivo.`);
                return;
            }
        }
    }

    // Guardar datos en local storage
    const userData = {
        username,
        password,
        email,
        city,
        country,
        gender: document.getElementById('gender').value,
        children: [],
        cartas: []
    };

    for (let i = 0; i < children; i++) {
        userData.children.push({
            name: document.getElementById(`child-name-${i}`).value,
            age: document.getElementById(`child-age-${i}`).value,
            toys: document.getElementById(`child-toys-${i}`).value
        });
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Registro exitoso.');
    closeRegisterPopup();
}

// Limpiar formulario de registro
function clearRegisterForm() {
    if (confirm('¿Estás seguro de que deseas limpiar todos los campos?')) {
        document.getElementById('register-form').reset();
    }
}

// Validación del formulario de inicio de sesión
function validateLoginForm() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const userData = JSON.parse(localStorage.getItem('userData'));
    const email = userData.email;

    if (userData && userData.username === username && userData.password === password) {
        closeLoginPopup();
        alert('Inicio de sesión exitoso.');
        // Cambiar botones de inicio de sesión y registro por el icono de perfil
        document.querySelector('.auth-buttons').style.display = 'none';
        document.querySelector('.profile-icon').style.display = 'block';

        const userLogged = {
            username,
            email
        };
        // Guardar el objeto userLogged en el local storage
        localStorage.setItem('userLogged', JSON.stringify(userLogged));

    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
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
        localStorage.removeItem('userLogged');
        // Cambiar icono de perfil por botones de inicio de sesión y registro
        document.querySelector('.auth-buttons').style.display = 'flex';
        document.querySelector('.profile-icon').style.display = 'none';
        alert('Sesión cerrada.');
    }
}