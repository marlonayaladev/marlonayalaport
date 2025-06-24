const form = document.querySelector('.contact form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Esto detiene el envío HTML por defecto

    // Crea un objeto FormData con los datos del formulario
    const formData = new FormData(e.target);
    // Convierte el FormData a un objeto JSON simple
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch(form.action, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // ¡IMPORTANTE! Esto le dice a Formspree que envías JSON
            'Accept': 'application/json'
        },
        body: JSON.stringify(jsonData) // Convierte el objeto JSON a una cadena JSON
    })
    .then(response => {
        if (response.ok) {
            alert("¡Gracias por tu mensaje! Pronto me pondré en contacto contigo.");
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! Hubo un problema al enviar tu formulario.");
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error de conexión al enviar tu mensaje. Inténtalo de nuevo más tarde.");
    });
});