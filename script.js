// JavaScript para el scroll de las secciones y el 'active' link en la navbar

// Seleccionamos las secciones y los links de la navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};


// Opcional: Manejo del formulario de contacto
// Para que funcione, necesitas un backend o un servicio como Formspree.
// 1. Ve a formspree.io
// 2. Crea un nuevo formulario y obtén tu URL de endpoint.
// 3. Reemplaza '#' en el action del form HTML con tu URL.

const form = document.querySelector('.contact form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Esto es necesario para evitar la recarga de la página

    // Aquí es donde realmente envías los datos a Formspree usando JavaScript
    fetch(form.action, { // form.action obtendrá la URL de tu formulario de Formspree del HTML
        method: "POST",
        body: new FormData(e.target), // Envía todos los datos del formulario
        headers: {
            'Accept': 'application/json' // Esto es una buena práctica para Formspree
        }
    })
    .then(response => {
        // Formspree enviará una respuesta indicando si fue exitoso o no
        if (response.ok) {
            alert("¡Gracias por tu mensaje! Pronto me pondré en contacto contigo.");
            form.reset(); // Limpia los campos del formulario
        } else {
            // Si hay un error, puedes obtener más detalles de la respuesta de Formspree
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! Hubo un problema al enviar tu formulario.");
                }
            });
        }
    })
    .catch(error => { // Manejo de errores de red o del fetch en sí
        console.error('Error:', error);
        alert("Hubo un error de conexión al enviar tu mensaje. Inténtalo de nuevo más tarde.");
    });
});