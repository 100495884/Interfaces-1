const mymap = L.map('interactive_map', {center: [66.5,25.71], zoom: 6, minZoom: 4, maxZoom: 15});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(mymap);

const papaNoelIcon = L.icon({
    iconUrl: '../images/papa_noel_trineo_mapa.png', // URL de la imagen de Papá Noel
    iconSize: [100, 100], // Tamaño del icono [ancho, alto]
});

const marcador = L.marker([66.5,25.71], { icon: papaNoelIcon }).addTo(mymap)
.bindPopup("¡Aquí está Papá Noel!");