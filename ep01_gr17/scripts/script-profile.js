function closeProfilePopup() {
    document.getElementById('profile-popup').style.display = 'none';
}

function closeLettersPopup() {
    document.getElementById('popup-letters').style.display = 'none';
}

function openProfilePopup() {
    // Obtener el usuario logueado
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    const currentUser = users.find(user => user.username === userLogged.username);

    if (currentUser) {
        // Rellenar los campos con los datos del usuario logueado
        document.getElementById('name').value = currentUser.username || 'Usuario';
        document.getElementById('correo').value = currentUser.email || '';
        document.getElementById('ciudad').value = currentUser.city || '';
        document.getElementById('pais').value = currentUser.country || '';
        document.getElementById('genero').value = currentUser.gender || '';
        
        // Mostrar los detalles de los hijos en el popup del perfil
        const childrenDetailsDiv = document.getElementById('children-details-profile');
        childrenDetailsDiv.innerHTML = '';

        currentUser.children.forEach((child, index) => {
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

    document.getElementById('profile-popup').style.display = 'block';
}

function saveProfile() {
    const username = document.getElementById('name').value;
    const email = document.getElementById('correo').value;
    const city = document.getElementById('ciudad').value;
    const country = document.getElementById('pais').value;
    const gender = document.getElementById('genero').value;

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
    const childrenDetailsDiv = document.getElementById('children-details-profile');
    const childInfoDivs = childrenDetailsDiv.getElementsByClassName('child-info');

    for (let i = 0; i < childInfoDivs.length; i++) {
        const name = document.getElementById(`child-name-${i}`).value;
        const age = document.getElementById(`child-age-${i}`).value;
        const toys = document.getElementById(`child-toys-${i}`).value;

        if (name.length < 3) {
            alert(`El nombre del hijo/hija ${i + 1} debe tener al menos 3 caracteres.`);
            return;
        }
        if (age <= 0) {
            alert(`La edad del hijo/hija ${i + 1} debe ser un número positivo.`);
            return;
        }

        children.push({ name, age, toys });
    }

    const users = JSON.parse(localStorage.getItem('userData')) || [];
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));

    const currentUserIndex = users.findIndex(user => user.username === userLogged.username);

    if (currentUserIndex === -1) {
        alert('No se encontraron datos de usuario guardados.');
        return;
    }

    // Actualizar datos del usuario logueado
    users[currentUserIndex] = {
        ...users[currentUserIndex],
        username,
        email,
        city,
        country,
        gender,
        children
    };

    localStorage.setItem('userData', JSON.stringify(users));
    alert('Perfil actualizado con éxito');
    closeProfilePopup();
}

function openLettersPopup() {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    
    const currentUser = users.find(user => user.username === userLogged.username);
    const profile_letters = currentUser ? currentUser.cartas || [] : [];
    
    const lettersContent = document.getElementById('profile-letters-content');
    const noLettersMessage = document.getElementById('no-letters-message');
    const popupLetters = document.getElementById('popup-letters');

    if (!lettersContent || !noLettersMessage || !popupLetters) {
        console.error('No se encontraron los elementos necesarios.');
        return;
    }

    lettersContent.innerHTML = '';

    if (profile_letters.length > 0) {
        noLettersMessage.style.display = 'none';

        profile_letters.forEach((profile_letter_content, index) => {
            const letterDiv = document.createElement('div');
            letterDiv.classList.add('profile_letter');
            letterDiv.setAttribute('draggable', true);
            letterDiv.setAttribute('data-index', index); // Store index for reordering

            letterDiv.innerHTML = `
                <button class="delete-button" onclick="deleteLetter(${index})">&times;</button>
                <div class="profile_letter-content">
                    <p><strong>${profile_letter_content.nombre}, ${profile_letter_content.ciudad}, ${profile_letter_content.pais}</strong></p>
                    <p>${profile_letter_content.carta}</p>
                </div>
            `;

            // Drag events
            letterDiv.addEventListener('dragstart', handleDragStart);
            letterDiv.addEventListener('dragover', handleDragOver);
            letterDiv.addEventListener('drop', handleDrop);
            letterDiv.addEventListener('dragend', handleDragEnd);

            lettersContent.appendChild(letterDiv);
        });
    } else {
        noLettersMessage.style.display = 'block';
    }

    popupLetters.style.display = 'block';
}



// Función para eliminar una carta
function deleteLetter(index) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta carta?');
    if (confirmation) {
        const userLogged = JSON.parse(localStorage.getItem('userLogged'));
        const users = JSON.parse(localStorage.getItem('userData')) || [];
        const currentUser = users.find(user => user.username === userLogged.username);

        if (currentUser && currentUser.cartas) {
            currentUser.cartas.splice(index, 1);
            localStorage.setItem('userData', JSON.stringify(users));
            openLettersPopup(); // Recargar el popup después de eliminar la carta
        }
    }
}


function closeLettersPopup() {
    document.getElementById('popup-letters').style.display = 'none';
}

let draggedElementIndex = null;

function handleDragStart(event) {
    draggedElementIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    event.dataTransfer.effectAllowed = 'move';
    event.target.classList.add('dragging');
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    const targetElement = event.target.closest('.profile_letter');
    if (!targetElement || targetElement.classList.contains('dragging')) return;

    const container = document.getElementById('profile-letters-content');
    const targetIndex = Array.from(container.children).indexOf(targetElement);

    // Intercambiar las posiciones en el DOM
    if (draggedElementIndex < targetIndex) {
        container.insertBefore(container.children[draggedElementIndex], container.children[targetIndex].nextSibling);
    } else {
        container.insertBefore(container.children[draggedElementIndex], container.children[targetIndex]);
    }

    saveNewOrder(); // Guardar el nuevo orden en el localStorage
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
    draggedElementIndex = null;
}

// Reaplica los eventos Drag and Drop a los elementos
function addDragAndDropEvents(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragend', handleDragEnd);
}

// Guardar el nuevo orden en el localStorage
function saveNewOrder() {
    const container = document.getElementById('profile-letters-content');
    const newOrder = Array.from(container.children).map(child => {
        const index = child.getAttribute('data-index');
        return JSON.parse(localStorage.getItem('userData'))[index];
    });

    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    const currentUser = users.find(user => user.username === userLogged.username);

    if (currentUser) {
        currentUser.cartas = newOrder;
        localStorage.setItem('userData', JSON.stringify(users));
    }
}
