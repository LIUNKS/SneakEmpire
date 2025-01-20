document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    const notification = document.getElementById('notification');

    // Validación del formulario
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Validación según el campo
        switch(fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa una dirección de correo válida';
                }
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Por favor, selecciona un asunto';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
        }

        if (!isValid) {
            formGroup.classList.add('error');
            errorElement.textContent = errorMessage;
        } else {
            formGroup.classList.remove('error');
            errorElement.textContent = '';
        }

        return isValid;
    };

    // Validación en tiempo real
    const fields = contactForm.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Mostrar notificación
    const showNotification = (message, type = 'success') => {
        const notificationMessage = notification.querySelector('.notification-message');
        notification.className = `notification ${type} show`;
        notificationMessage.textContent = message;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    };

    // Cerrar notificación
    const closeNotification = notification.querySelector('.close-notification');
    closeNotification.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // Envío del formulario
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar todos los campos
        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Por favor, revisa el formulario para corregir los errores', 'error');
            return;
        }

        // Mostrar estado de carga
        submitButton.disabled = true;
        buttonText.textContent = 'Enviando...';
        loadingSpinner.classList.remove('hidden');

        try {
            // Simular llamada a la API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Éxito
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
            contactForm.reset();
        } catch (error) {
            showNotification('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.', 'error');
        } finally {
            // Restablecer el estado del botón
            submitButton.disabled = false;
            buttonText.textContent = 'Enviar mensaje';
            loadingSpinner.classList.add('hidden');
        }
    });
    
    // Animación al desplazarse
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
