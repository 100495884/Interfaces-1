let currentImageIndex = 0;
const carouselimages = [
    'images/fabrica-juguetes1.jpg',
    'images/fabrica-juguetes2.jpg',
    'images/fabrica-juguetes3.jpg'
];

function showImage(index) {
    const imageElement = document.getElementById('carousel-image');
    imageElement.src = carouselimages[index];
}

function prevImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : carouselimages.length - 1;
    showImage(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex < carouselimages.length - 1) ? currentImageIndex + 1 : 0;
    showImage(currentImageIndex);
}