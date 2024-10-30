function sendLetter(event) {
    // Evitar que el formulario realice un reload
    event.preventDefault(); 

    // Obtener los valores del formulario
    const formnombre = document.getElementById('form-nombre').value;
    const formemail = document.getElementById('form-email').value;
    const formciudad = document.getElementById('form-ciudad').value;
    const formpais = document.getElementById('form-pais').value;
    const formcarta = document.getElementById('form-carta').value;

    // Obtener el usuario logueado desde localStorage
    const userLogged = JSON.parse(localStorage.getItem('userLogged')); 
    if (!userLogged || formemail !== userLogged.email) {
        alert('Debes iniciar sesión con el correo con el que te registraste.');
        return;
    }

    // Obtener los datos de todos los usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem('userData')) || [];

    // Encontrar el índice del usuario logueado
    const currentUserIndex = users.findIndex(user => user.username === userLogged.username);

    // Si no se encuentra el usuario, no se puede enviar la carta
    if (currentUserIndex === -1) {
        alert('El usuario actual no se encuentra registrado.');
        return;
    }

    // Agregar la nueva carta a la lista de cartas del usuario actual
    if (!users[currentUserIndex].cartas) {
        users[currentUserIndex].cartas = [];
    }
    users[currentUserIndex].cartas.push({
        nombre: formnombre,
        ciudad: formciudad,
        pais: formpais,
        carta: formcarta
    });

    // Actualizar los datos en localStorage
    localStorage.setItem('userData', JSON.stringify(users));

    // Vaciar los campos del formulario
    document.getElementById('form-nombre').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-ciudad').value = '';
    document.getElementById('form-pais').value = '';
    document.getElementById('form-carta').value = '';
    
    alert('Tu carta ha sido enviada con éxito.');
}
