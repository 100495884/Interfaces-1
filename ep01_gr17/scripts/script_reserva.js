function mostrarFabrica() {
    document.getElementById('reserva-experiencias').style.display = 'none';
    document.getElementById('fabrica-juguetes').style.display = 'block';
}


function volverReserva() {
    document.getElementById('fabrica-juguetes').style.display = 'none';
    document.getElementById('reserva-experiencias').style.display = 'block';
}

function abrirPopupReserva() {
    document.getElementById('popup-reserva').style.display = 'flex';
}

function cerrarPopupReserva() {
    document.getElementById('popup-reserva').style.display = 'none';
}
// Funcion para pago de fabrica de juguetes
function abrirPopupPago() {
    document.getElementById('popup-pago').style.display = 'flex';
}

function cancelarPopupPago() {
    document.getElementById('popup-pago').style.display = 'none';
    // Elimina la información de la reserva del localStorage
    localStorage.removeItem('reserva');
}
function cerrarPopupPago() {
    document.getElementById('popup-pago').style.display = 'none';
}
//Funcion para pago de videollamadas
function abrirPopupPago2() {
    document.getElementById('popup-pago2').style.display = 'flex';
}
function cancelarPopupPago2() {
    document.getElementById('popup-pago2').style.display = 'none';
    // Elimina la información de la reserva del localStorage
    localStorage.removeItem('videollamada');
}
function cerrarPopupPago2() {
    document.getElementById('popup-pago2').style.display = 'none';
    // Elimina la información de la reserva del localStorage
}


function calcularPrecio() {
    const numPersonas = document.getElementById('num-personas').value;
    const precioTotal = numPersonas * 15;
    document.getElementById('precio').value = `${precioTotal}€`;
}

function pagarReserva() {
    const fechaInput = document.getElementById('fecha-visita').value;
    const fechaSeleccionada = new Date(fechaInput);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha

    const numPersonas = document.getElementById('num-personas').value;
    const nombreComprador = document.getElementById('nombre-comprador').value;
    const correo = document.getElementById('correo-visita').value;
    const precio = document.getElementById('precio').value;

    let errorMessage = '';




    if (nombreComprador.trim() === '') {
        errorMessage += 'El nombre del comprador no puede estar vacío.\n';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        errorMessage += 'Tiene que ser un correo valido.\n';
    }
    if (!fechaInput) {
        errorMessage += 'La fecha es obligatoria.\n';
    } else if (fechaSeleccionada < fechaActual) {
        errorMessage += 'La fecha no puede ser menor a la fecha actual.\n';
    }  
    if (numPersonas <= 0) {
        errorMessage += 'El número de personas debe ser mayor que 0.\n';
    }
  
    if (errorMessage) {
        alert(errorMessage);
    }   else {

        // Guarda la información en el localStorage
        const reserva = {
            fecha: fechaInput,
            numPersonas: numPersonas,
            nombreComprador: nombreComprador,
            correo: correo,
            precio: precio
        };
        localStorage.setItem('reserva', JSON.stringify(reserva));

        // Cierra el popup de reserva y abre el popup de pago
        cerrarPopupReserva();
        abrirPopupPago();
        }
}

function confirmarPago() {
    const numTarjeta = document.getElementById('num-tarjeta').value;
    const cvv = document.getElementById('cvv').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;

    const fechaExpiracionDate = new Date(fechaExpiracion + '-01'); // Convertir a fecha
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha

    let errorMessage = '';

    if (numTarjeta.length !== 16 || isNaN(numTarjeta)) {
        errorMessage += 'El número de tarjeta debe tener 16 dígitos.\n';
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        errorMessage += 'El CVV debe tener 3 dígitos.\n';
    }
    if (!fechaExpiracion) {
        errorMessage += 'La fecha de expiración es obligatoria.\n';
    } else if (fechaExpiracionDate < fechaActual) {
        errorMessage += 'La fecha de expiración no puede ser anterior a la fecha actual.\n';
    }

    if (numTarjeta.trim() === '' || cvv.trim() === '' || fechaExpiracion.trim() === '') {
        errorMessage += 'Todos los campos son obligatorios.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
    } else {
        // Implementa la lógica para manejar la confirmación del pago
        alert('Pago confirmado con éxito');
        cerrarPopupPago();
    }
}

function confirmarPago2() {
    const numTarjeta = document.getElementById('num-tarjeta2').value;
    const cvv = document.getElementById('cvv2').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion2').value;

    const fechaExpiracionDate = new Date(fechaExpiracion + '-01'); // Convertir a fecha
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha

    let errorMessage = '';

    if (numTarjeta.length !== 16 || isNaN(numTarjeta)) {
        errorMessage += 'El número de tarjeta debe tener 16 dígitos.\n';
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        errorMessage += 'El CVV debe tener 3 dígitos.\n';
    }
    if (!fechaExpiracion) {
        errorMessage += 'La fecha de expiración es obligatoria.\n';
    
    } else if (fechaExpiracionDate < fechaActual) {
        errorMessage += 'La fecha de expiración no puede ser anterior a la fecha actual.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
    } else {
        // Implementa la lógica para manejar la confirmación del pago
        alert('Pago confirmado con éxito');
        cerrarPopupPago2();
    }
}

function abrirPopupVideollamada() {
    document.getElementById('popup-videollamada-texto').style.display = 'flex';
}

function cerrarPopupVideollamada() {
    document.getElementById('popup-videollamada-texto').style.display = 'none';
    document.getElementById('popup-videollamada-formulario').style.display = 'none';
}

function entendidoVideollamada() {
    cerrarPopupVideollamada();
    document.getElementById('popup-videollamada-formulario').style.display = 'flex';
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function confirmarVideollamada() {
    const nombre = document.getElementById('nombre-videollamada').value;
    const correo = document.getElementById('correo-videollamada').value;
    const fechaInput = document.getElementById('fecha-videollamada').value;
    const horaInput = document.getElementById('hora-videollamada').value;


    const fechaSeleccionada = new Date(fechaInput);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha


    let errorMessage = '';

    if (nombre.trim() === '') {
        errorMessage += 'El nombre no puede estar vacío.\n';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        errorMessage += 'Tiene que ser un correo valido.\n';
    }

    if (!fechaInput) {
        errorMessage += 'La fecha es obligatoria.\n';
    } else if (fechaSeleccionada.getTime() === fechaActual.getTime()) {
        // Si la fecha seleccionada es la misma que la actual, validar la hora
        const horaActual = new Date();
        const [horaSeleccionada, minutosSeleccionados] = horaInput.split(':').map(Number);

        if (horaSeleccionada < horaActual.getHours() || 
            (horaSeleccionada === horaActual.getHours() && minutosSeleccionados < horaActual.getMinutes())) {
            errorMessage += 'La hora no puede ser menor a la hora actual.\n';
        }
    }
     else if (fechaSeleccionada < fechaActual) {
        errorMessage += 'La fecha no puede ser menor a la fecha actual.\n';
    }  
    
    if (!horaInput) {
        errorMessage += 'La hora es obligatoria.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
    } else {
        const videollamada = {
            nombre: nombre,
            correo: correo,
            fecha: fechaInput,
            hora: horaInput
        };
        localStorage.setItem('videollamada', JSON.stringify(videollamada));

        cerrarPopupVideollamada();
        abrirPopupPago2();
    }
}
