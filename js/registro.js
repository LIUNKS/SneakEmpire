// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene los elementos necesarios del DOM
    const signupForm = document.getElementById("signupForm"); // Formulario de registro
    const togglePassword = document.getElementById("togglePassword"); // Botón para mostrar/ocultar contraseña
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword"); // Botón para mostrar/ocultar confirmación de contraseña
    const passwordInput = document.getElementById("password"); // Campo de contraseña
    const confirmPasswordInput = document.getElementById("confirmPassword"); // Campo de confirmación de contraseña
    const errorMessage = document.getElementById("signupError"); // Contenedor de mensaje de error
    const errorText = document.getElementById("errorText"); // Texto del mensaje de error
  
    // Función para alternar la visibilidad de las contraseñas
    function togglePasswordVisibility(button, input) {
      // Cambia el tipo del campo entre "password" y "text"
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
  
      // Actualiza el ícono dependiendo del estado de visibilidad
      const eyeIcon = button.querySelector("svg");
      if (type === "password") {
        // Ícono de ojo cerrado
        eyeIcon.innerHTML =
          '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
      } else {
        // Ícono de ojo abierto
        eyeIcon.innerHTML =
          '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>';
      }
    }
  
    // Eventos para alternar la visibilidad de las contraseñas
    togglePassword.addEventListener("click", () =>
      togglePasswordVisibility(togglePassword, passwordInput)
    );
    toggleConfirmPassword.addEventListener("click", () =>
      togglePasswordVisibility(toggleConfirmPassword, confirmPasswordInput)
    );
  
    // Maneja el envío del formulario
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // Evita que el formulario se envíe por defecto
  
      // Obtiene los valores de los campos del formulario
      const fullName = document.getElementById("fullName").value; // Nombre completo
      const email = document.getElementById("email").value; // Correo electrónico
      const password = passwordInput.value; // Contraseña
      const confirmPassword = confirmPasswordInput.value; // Confirmación de contraseña
  
      // Validación básica de las contraseñas
      if (password.length < 8) {
        showError("La contraseña debe tener al menos 8 caracteres"); // Error si la contraseña es demasiado corta
        return;
      }
  
      if (password !== confirmPassword) {
        showError("Las contraseñas no coinciden"); // Error si las contraseñas no coinciden
        return;
      }

      const result = await register(fullName, email, password);
      if (!result) {
        showError("El usuario ya existe");
        return;
      }

      // Almacena los datos del usuario en el almacenamiento local (solo para demostración)
      const userData = {
        fullName,
        email,
        password,
      };
  
      // Agrega los nuevos datos al almacenamiento existente
      localStorage.setItem(
        "users",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("users") || "[]"),
          userData,
        ])
      );
  
      // Redirige a la página de inicio de sesión
      window.location.href = "login.html";
    });
  
    // Función para mostrar mensajes de error
    function showError(message) {
      errorText.textContent = message; // Muestra el mensaje en el contenedor de errores
      errorMessage.classList.remove("hidden"); // Hace visible el mensaje de error
  
      // Oculta el mensaje de error después de 3 segundos
      setTimeout(() => {
        errorMessage.classList.add("hidden");
      }, 3000);
    }
  });
  