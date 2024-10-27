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
        
        // Mostrar los detalles de los hijos en el popup del perfil
        const childrenDetailsDiv = document.getElementById('children-details-profile'); // Corregido para usar el ID correcto
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

    // Validar los datos del perfil
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

    // Obtener los detalles de los hijos desde el perfil
    const children = [];
    const childrenDetailsDiv = document.getElementById('children-details-profile'); // Asegúrate de que sea el ID correcto
    const childInfoDivs = childrenDetailsDiv.getElementsByClassName('child-info');

    for (let i = 0; i < childInfoDivs.length; i++) {
        const name = document.getElementById(`child-name-${i}`).value;
        const age = document.getElementById(`child-age-${i}`).value;
        const toys = document.getElementById(`child-toys-${i}`).value;

        // Validación de cada hijo
        if (name.length < 3) {
            alert(`El nombre del hijo/hija ${i + 1} debe tener al menos 3 caracteres.`);
            return;
        }
        if (age <= 0) {
            alert(`La edad del hijo/hija ${i + 1} debe ser un número positivo.`);
            return;
        }

        // Añadir al array de hijos
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
        children  // Añadir el array de hijos actualizado
    };

    // Crear objeto actualizado para mostrar usuario logueado
    const updatedUserLogged = {
        username,
        email
    };

    // Guardar los datos actualizados en localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    localStorage.setItem('userLogged', JSON.stringify(updatedUserLogged));

    alert('Perfil actualizado con éxito');
    closeProfilePopup();  // Cerrar el popup después de guardar
}




function openLettersPopup() {
    const userLogged = JSON.parse(localStorage.getItem('userLogged')); // Obtener el usuario logueado
    const users = JSON.parse(localStorage.getItem('userData')) || {}; // Obtener todos los usuarios
    const currentUser = users[userLogged.username]; // Obtener los datos del usuario actual

    // Verificar si el usuario actual tiene cartas
    const profile_letters = currentUser ? currentUser.cartas : [];

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
            letterDiv.setAttribute('draggable', 'true');
            letterDiv.setAttribute('data-index', index); // Agregar atributo con el índice para identificarla

            // Agregar los eventos de drag and drop
            letterDiv.addEventListener('dragstart', handleDragStart);
            letterDiv.addEventListener('dragover', handleDragOver);
            letterDiv.addEventListener('drop', handleDrop);

            letterDiv.innerHTML = `
                <div class="profile-letter-content">
                    <div>
                        <p><strong>${profile_letter.nombre}, ${profile_letter.ciudad}, ${profile_letter.pais}</strong></p>
                        <p>${profile_letter.carta}</p>
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

// Variables para mantener el estado del drag and drop
let draggedElementIndex = null;

function handleDragStart(event) {
    draggedElementIndex = event.target.getAttribute('data-index'); // Guardar el índice del elemento arrastrado
    event.dataTransfer.effectAllowed = 'move'; // Efecto de mover
}

function handleDragOver(event) {
    event.preventDefault(); // Necesario para permitir el drop
    event.dataTransfer.dropEffect = 'move'; // Mostrar efecto de mover
}

function handleDrop(event) {
    event.preventDefault();
    const targetIndex = event.target.closest('.profile_letter').getAttribute('data-index'); // Obtener el índice del elemento donde se suelta

    if (draggedElementIndex !== null && targetIndex !== null) {
        // Intercambiar las posiciones de las cartas en el array
        const userLogged = JSON.parse(localStorage.getItem('userLogged')); // Obtener el usuario logueado
        const users = JSON.parse(localStorage.getItem('userData')) || {}; // Obtener todos los usuarios
        const currentUser = users[userLogged.username]; // Obtener los datos del usuario actual

        const cartas = currentUser.cartas;
        const draggedLetter = cartas[draggedElementIndex];

        // Intercambiar las posiciones de las cartas
        cartas.splice(draggedElementIndex, 1); // Eliminar la carta arrastrada
        cartas.splice(targetIndex, 0, draggedLetter); // Insertar en la nueva posición

        // Actualizar los datos del usuario en localStorage
        users[userLogged.username] = currentUser;
        localStorage.setItem('userData', JSON.stringify(users));

        // Volver a cargar las cartas con el nuevo orden
        openLettersPopup();
    }
}



function deleteLetter(index) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta carta?');
    if (confirmation) {
        const userLogged = JSON.parse(localStorage.getItem('userLogged')); // Obtener el usuario logueado
        const users = JSON.parse(localStorage.getItem('userData')) || {}; // Obtener todos los usuarios
        const currentUser = users[userLogged.username]; // Obtener los datos del usuario actual

        if (currentUser && currentUser.cartas) {
            // Eliminar la carta del array
            currentUser.cartas.splice(index, 1);
            // Actualizar los datos del usuario en localStorage
            users[userLogged.username] = currentUser;
            localStorage.setItem('userData', JSON.stringify(users));
            // Recargar el contenido de las cartas
            openLettersPopup();
        }
    }
}




function closeLettersPopup() {
    // Ocultar el popup
    document.getElementById('popup-letters').style.display = 'none';
}
