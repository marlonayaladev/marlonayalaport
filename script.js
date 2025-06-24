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
    // Evita que la página se recargue
    e.preventDefault();

    // Puedes agregar una lógica para enviar el formulario vía fetch a tu endpoint de Formspree
    // fetch(form.action, {
    //     method: "POST",
    //     body: new FormData(e.target),
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    // }).then(response => {
    //     if (response.ok) {
    //         alert("¡Gracias por tu mensaje!");
    //         form.reset();
    //     } else {
    //         alert("Oops! Hubo un problema al enviar tu formulario.");
    //     }
    // });

    // Mensaje de confirmación simple si no usas backend
    alert('¡Gracias! Tu mensaje ha sido "enviado".');
    form.reset();
});