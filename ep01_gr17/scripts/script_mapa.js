const mymap = L.map('interactive_map', {center: [66.5,25.71], zoom: 6, minZoom: 4, maxZoom: 15});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(mymap);

var papaNoelIcon = L.icon({
    iconUrl: 'images/papa_noel_trineo_map_sin_fondo.png', 
    iconSize: [100, 100], // Tamaño del icono [ancho, alto]
});

const marcador = L.marker([66.5,25.71], { icon: papaNoelIcon }).addTo(mymap)
.bindPopup("¡Aquí está Papá Noel!");

L.marker([40.3324, -3.7655]).addTo(mymap)
    .bindPopup("¡Proximo destino!");

const lineCoordinates = [
    [66.5, 25.71],  // Coordenadas de Papá Noel
    [40.3324, -3.7655] // Coordenadas de UC3M
];

const linea = L.polyline(lineCoordinates, {
    color: 'red',    // Color de la línea
    weight: 3,        // Grosor de la línea
    opacity: 0.8,     // Opacidad de la línea
    dashArray: '5, 10',
}).addTo(mymap);

// Ajustar el mapa para mostrar los dos puntos y la línea
mymap.fitBounds(linea.getBounds());