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

    // Obtener los datos del usuario desde localStorage
    const users = JSON.parse(localStorage.getItem('userData')) || {};

    // Verificar si el usuario actual existe en los datos guardados
    const currentUser = users[userLogged.username] || { cartas: [] };

    // Agregar la nueva carta a la lista de cartas del usuario
    currentUser.cartas.push({
        nombre: formnombre,
        ciudad: formciudad,
        pais: formpais,
        carta: formcarta
    });

    // Actualizar los datos del usuario en localStorage
    users[userLogged.username] = currentUser;
    localStorage.setItem('userData', JSON.stringify(users));

    // Vaciar los campos del formulario
    document.getElementById('form-nombre').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-ciudad').value = '';
    document.getElementById('form-pais').value = '';
    document.getElementById('form-carta').value = '';
    
    alert('Tu carta ha sido enviada con éxito.');
}
