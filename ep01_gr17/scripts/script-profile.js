function closeProfilePopup() {
    document.getElementById('profile-popup').style.display = 'none';
}

function closeLettersPopup() {
    document.getElementById('popup-letters').style.display = 'none';
}

function openProfilePopup() {
    // Obtener los datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        // Rellenar los campos con los datos del localStorage
        document.getElementById('name').value = userData.username || 'Usuario';
        document.getElementById('correo').value = userData.email || '';
        document.getElementById('ciudad').value = userData.city || '';
        document.getElementById('pais').value = userData.country || '';
        document.getElementById('genero').value = userData.gender || '';
        
        // Mostrar los detalles de los hijos
        const childrenDetailsDiv = document.getElementById('children-details');
        childrenDetailsDiv.innerHTML = '';  // Limpiar contenido previo

        userData.children.forEach((child, index) => {
            childrenDetailsDiv.innerHTML += `
                <div class="child-info">
                    <label for="child-name-${index}">Nombre del hijo/a:</label>
                    <input type="text" id="child-name-${index}" name="child-name-${index}" value="${child.name}">
                    
                    <label for="child-age-${index}">Edad:</label>
                    <input type="number" id="child-age-${index}" name="child-age-${index}" value="${child.age}">

                    <label for="child-toys-${index}">Juguetes favoritos:</label>
                    <input type="text" id="child-toys-${index}" name="child-toys-${index}" value="${child.toys}">
                </div>
            `;
        });
    }

    // Mostrar la ventana emergente de perfil
    document.getElementById('profile-popup').style.display = 'block';
}

function saveProfile() {
    // Obtener los valores del formulario
    const username = document.getElementById('name').value;
    const email = document.getElementById('correo').value;
    const city = document.getElementById('ciudad').value;
    const country = document.getElementById('pais').value;
    const gender = document.getElementById('genero').value;

    // Validar los datos
    if (username.length < 3) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('El correo electrónico no es válido.');
        return;
    }

    if (city.length < 3 || country.length < 3) {
        alert('La ciudad y el país deben tener al menos 3 caracteres.');
        return;
    }

    // Obtener los detalles de los hijos
    const children = [];
    const childrenDetailsDiv = document.getElementById('children-details');
    const childInfoDivs = childrenDetailsDiv.getElementsByClassName('child-info');

    for (let i = 0; i < childInfoDivs.length; i++) {
        const name = document.getElementById(`child-name-${i}`).value;
        const age = document.getElementById(`child-age-${i}`).value;
        const toys = document.getElementById(`child-toys-${i}`).value;
        children.push({ name, age, toys });
    }

    // Obtener los datos anteriores para preservar la contraseña
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (!storedData) {
        alert('No se encontraron datos de usuario guardados.');
        return;
    }

    // Crear el objeto actualizado (conservando la contraseña)
    const updatedUserData = {
        username,
        password: storedData.password,  // Mantener la contraseña
        email,
        city,
        country,
        gender,
        children
    };

    const updateduserLogged = {
        username,
        email
    };

    // Guardar los datos actualizados en localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    localStorage.setItem('userLogged', JSON.stringify(updateduserLogged));

    alert('Perfil actualizado con éxito');
    closeProfilePopup();  // Cerrar el popup después de guardar
}



function openLettersPopup() {
    const profile_letters = JSON.parse(localStorage.getItem('cartas')) || [];
    const lettersContent = document.getElementById('profile-letters-content');
    const noLettersMessage = document.getElementById('no-letters-message');
    const popupLetters = document.getElementById('popup-letters');

    // Verificar que los elementos existen
    if (!lettersContent || !noLettersMessage || !popupLetters) {
        console.error('No se encontraron los elementos necesarios.');
        return;
    }

    // Limpiar contenido existente
    lettersContent.innerHTML = ''; 

    if (profile_letters.length > 0) {
        // Si hay cartas, ocultar el mensaje de "No tienes cartas"
        noLettersMessage.style.display = 'none';

        profile_letters.forEach((profile_letter, index) => {
            const letterDiv = document.createElement('div');
            letterDiv.classList.add('profile_letter');

            letterDiv.innerHTML = `
                <div class="profile-letter-content">
                    <div>
                        <p><strong>${profile_letter.formnombre}, ${profile_letter.formciudad}, ${profile_letter.formpais}</strong></p>
                        <p>${profile_letter.formcarta}</p>
                    </div>
                    <button onclick="deleteLetter(${index})">Eliminar</button>
                </div>`;
            lettersContent.appendChild(letterDiv);
        });
    } else {
        // Mostrar el mensaje "No tienes cartas" si no hay cartas
        noLettersMessage.style.display = 'block';
    }

    // Mostrar el popup
    popupLetters.style.display = 'block';
}


function deleteLetter(index) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta carta?');
    if (confirmation) {
        let letters = JSON.parse(localStorage.getItem('cartas')) || [];
        letters.splice(index, 1);  // Eliminar carta del array
        localStorage.setItem('cartas', JSON.stringify(letters));  // Actualizar en localStorage
        openLettersPopup();  // Recargar el contenido de las cartas
    }
}



function closeLettersPopup() {
    // Ocultar el popup
    document.getElementById('popup-letters').style.display = 'none';
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
        // Cambiar icono de perfil por botones de inicio de sesión y registro
        document.querySelector('.auth-buttons').style.display = 'flex';
        document.querySelector('.profile-icon').style.display = 'none';
        alert('Sesión cerrada.');
    }
}