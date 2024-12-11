let currentImageIndex = 0;
const carouselimages = [
    'images/fabrica-juguetes1.jpg',
    'images/fabrica-juguetes2.jpg',
    'images/fabrica-juguetes3.jpg'
];
// Funcion para mostrar la imagen en el carrusel
function showImage(index) {
    const imageElement = document.getElementById('carousel-image');
    imageElement.src = carouselimages[index];
}
// Funcion para mostrar la imagen anterior
function prevImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : carouselimages.length - 1;
    showImage(currentImageIndex);
}
// Funcion para mostrar la imagen siguiente
function nextImage() {
    currentImageIndex = (currentImageIndex < carouselimages.length - 1) ? currentImageIndex + 1 : 0;
    showImage(currentImageIndex);
}