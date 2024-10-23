function sendLetter() {

    const formnombre = document.getElementById('form-nombre').value;
    const formemail = document.getElementById('form-email').value;
    const formciudad = document.getElementById('form-ciudad').value;
    const formpais = document.getElementById('form-pais').value;
    const formcarta = document.getElementById('form-carta').value;

    const userLogged = JSON.parse(localStorage.getItem('userLogged')); // Simula el estado de login
    if (formemail !== userLogged.email) {
        alert('Debes iniciar sesión con el correo con el que te registraste.');
        return;
    }

    // Guardar la carta en localStorage
    const cartas = JSON.parse(localStorage.getItem('cartas')) || [];
    cartas.push({ formnombre, formciudad, formpais, formcarta });
    localStorage.setItem('cartas', JSON.stringify(cartas));

    // Vaciar los campos del formulario manualmente
    document.getElementById('form-nombre').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-ciudad').value = '';
    document.getElementById('form-pais').value = '';
    document.getElementById('form-carta').value = '';
    
    alert('Tu carta ha sido enviada con éxito.');
    
};
