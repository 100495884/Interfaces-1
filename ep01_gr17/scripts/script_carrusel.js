let currentImageIndex = 0;
const images = [
    'images/fabrica-juguetes1.jpg',
    'images/fabrica-juguetes2.jpg',
    'images/fabrica-juguetes3.jpg'
];

function showImage(index) {
    const imageElement = document.getElementById('carousel-image');
    imageElement.src = images[index];
}

function prevImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
    showImage(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
    showImage(currentImageIndex);
}