let currentIndex = 1; // Comenzamos en el primer slide original
const slides = document.querySelectorAll('.carousel .slide');
const totalSlides = slides.length;
const slideInterval = 5000;
const carouselImages = document.querySelector('.carousel-images');

function updateSlidePosition(transition = true) {
    // Controla la transición para saltos de slides duplicados sin animación
    carouselImages.style.transition = transition ? 'transform 1s ease' : 'none';
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showNextSlide() {
    currentIndex++;
    updateSlidePosition();

    // Si está en el último duplicado, salta al primer slide original sin transición
    if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
            currentIndex = 1; // Primer slide original
            updateSlidePosition(false);
        }, 1000); // Tiempo de transición
    }
}

function showPrevSlide() {
    currentIndex--;
    updateSlidePosition();

    // Si está en el primer duplicado, salta al último slide original sin transición
    if (currentIndex === 0) {
        setTimeout(() => {
            currentIndex = totalSlides - 2; // Último slide original
            updateSlidePosition(false);
        }, 1000);
    }
}

// Funciones para botones
function nextSlide() {
    clearInterval(autoSlide);
    showNextSlide();
    autoSlide = setInterval(showNextSlide, slideInterval);
}

function prevSlide() {
    clearInterval(autoSlide);
    showPrevSlide();
    autoSlide = setInterval(showNextSlide, slideInterval);
}

// Desplazamiento automático
let autoSlide = setInterval(showNextSlide, slideInterval);
document.addEventListener('DOMContentLoaded', () => updateSlidePosition(false));

function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const isOpen = element.classList.contains('active');
    
    // Cerrar todas las respuestas abiertas
    document.querySelectorAll('.faq-question').forEach((question) => {
        question.classList.remove('active');
        question.nextElementSibling.style.maxHeight = null;
    });

    // Si no estaba abierto, abrirlo
    if (!isOpen) {
        element.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

// Detecta el desplazamiento de la página
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) { // Ajusta el valor según cuando quieras que cambie
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});