// Opcional: Script para el manejo del formulario de contacto
// Este script usa la API Fetch para enviar el formulario de forma asíncrona (sin recargar la página)
// hacia Formspree, que espera un formato JSON.

const form = document.querySelector('.contact form');

// Solo ejecuta esto si el formulario existe en la página
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detiene el envío HTML por defecto y la recarga de la página

        const formData = new FormData(e.target);
        const jsonData = {};
        // Convierte FormData a un objeto JSON, usando los 'name' de tus inputs
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        try {
            const response = await fetch(form.action, {
                method: "POST",
                // ¡IMPORTANTE! Estos headers le indican a Formspree que estás enviando JSON
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData) // Convierte tu objeto JavaScript a una cadena JSON
            });

            if (response.ok) {
                alert("¡Gracias por tu mensaje! Pronto me pondré en contacto contigo.");
                form.reset(); // Limpia los campos del formulario
            } else {
                // Si la respuesta no es OK (ej. error 4xx o 5xx), intenta leer el mensaje de error de Formspree
                const data = await response.json();
                if (data && data.errors) {
                    alert("Oops! Hubo un problema: " + data.errors.map(error => error.message).join(", "));
                } else {
                    alert("Oops! Hubo un problema al enviar tu formulario.");
                }
            }
        } catch (error) {
            // Este catch maneja errores de red o cualquier problema con la solicitud fetch
            console.error('Error al enviar el formulario:', error);
            alert("Hubo un error de conexión al enviar tu mensaje. Inténtalo de nuevo más tarde.");
        }
    });
}

// Otros scripts de tu página (ej. para la navegación, animaciones, etc.) irían aquí debajo
// Por ejemplo, si tienes código para el desplazamiento suave de la navegación o animaciones.

document.addEventListener('DOMContentLoaded', function() {
    // Lógica para los carruseles de las tarjetas de proyectos
    const carousels = document.querySelectorAll('.card-carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el evento se propague a elementos padres
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            showSlide(currentSlide);
        });

        // Inicializa el carrusel
        showSlide(currentSlide);
    });
});