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

// Añade campos para los hijos
document.getElementById('children').addEventListener('input', function() {
    const childrenCount = parseInt(this.value) || 0;
    const childrenDetails = document.getElementById('children-details');
    childrenDetails.innerHTML = ''; 

    let childrenHTML = ''; 

    for (let i = 0; i < childrenCount; i++) {
        childrenHTML += `
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

    // Añade el HTML acumulado al div una vez
    childrenDetails.innerHTML = childrenHTML;
});

// Validación del formulario de registro
function validateRegisterForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const children = parseInt(document.getElementById('children').value) || 0;

    // Valida el nombre de usuario
    if (username.length < 3) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }

    // Valida la contraseña
    if (password.length < 12) {
        alert('La contraseña debe tener al menos 12 caracteres.');
        return;
    }
    
    if (!/[a-z]/.test(password)) {
        alert('La contraseña debe tener al menos una letra minúscula.');
        return;
    }
    
    if (!/[A-Z]/.test(password)) {
        alert('La contraseña debe tener al menos una letra mayúscula.');
        return;
    }
    
    if (!/\d.*\d/.test(password)) {
        alert('La contraseña debe tener al menos dos números.');
        return;
    }
    
    if (!/[@$!%*?&._,-]/.test(password)) {
        alert('La contraseña debe tener al menos un carácter especial (@, $, !, %, *, ?, &, ., _, -, ,).');
        return;
    }



    // Valida la confirmación de contraseña
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Valida el correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('El correo electrónico no es válido.');
        return;
    }

    // Valida la ciudad y el país
    if (city.length < 3 || country.length < 3) {
        alert('La ciudad y el país deben tener al menos 3 caracteres.');
        return;
    }

    // Valida los hijos
    const childrenData = [];
    if (children > 0) {
        for (let i = 0; i < children; i++) {
            const childName = document.getElementById(`child-name-${i}`).value;
            const childAge = parseInt(document.getElementById(`child-age-${i}`).value);
            const childToys = document.getElementById(`child-toys-${i}`).value;

            if (childName.length < 3) {
                alert(`El nombre del hijo/hija ${i + 1} debe tener al menos 3 caracteres.`);
                return;
            }
            if (childAge <= 0) {
                alert(`La edad del hijo/hija ${i + 1} debe ser un número positivo.`);
                return;
            }

            childrenData.push({ name: childName, age: childAge, toys: childToys });
        }
    }

    // Crea el objeto del usuario actual
    const userData = {
        username,
        password,
        email,
        city,
        country,
        gender: document.getElementById('gender').value,
        children: childrenData,
    };

    // Obtiene usuarios existentes en localStorage o inicializa un array vacío si no existen
    let users = JSON.parse(localStorage.getItem('userData')) || [];
    console.log("Usuarios antes de añadir:", users); 

    // Añadir el nuevo usuario al array
    users.push(userData);

    // Guarda el array actualizado en localStorage
    localStorage.setItem('userData', JSON.stringify(users));
    console.log("Usuarios después de añadir:", users);

    alert('Registro exitoso.');
    closeRegisterPopup();
}

// Limpia el formulario de registro
function clearRegisterForm() {
    if (confirm('¿Estás seguro de que deseas limpiar todos los campos?')) {
        document.getElementById('register-form').reset();
    }
}

// Validación del formulario de inicio de sesión
function validateLoginForm() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const usersData = JSON.parse(localStorage.getItem('userData')) || [];

    const user = usersData.find(user => user.username === username && user.password === password);

    if (user) {
        closeLoginPopup();
        alert('Inicio de sesión exitoso.');
        
        document.querySelector('.auth-buttons').style.display = 'none';
        document.querySelector('.profile-icon').style.display = 'block';

        const userLogged = {
            username: user.username,
            email: user.email
        };
        
        localStorage.setItem('userLogged', JSON.stringify(userLogged));

    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}

// Función para cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('userLogged');

        document.querySelector('.auth-buttons').style.display = 'flex';
        document.querySelector('.profile-icon').style.display = 'none';
        alert('Sesión cerrada.');
    }
}
