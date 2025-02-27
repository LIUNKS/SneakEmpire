document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("loginError");
  const submitButton = document.getElementById("submitButton");
  const buttonText = submitButton.querySelector(".button-text");
  const loadingSpinner = submitButton.querySelector(".loading-spinner");

  //Cambiar visibilidad de la contraseña
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    //Actualizar icono dependiendo de la visibilidad de la contraseña
    const eyeIcon = this.querySelector("svg");
    if (type === "password") {
      eyeIcon.innerHTML =
        '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
    } else {
      eyeIcon.innerHTML =
        '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>';
    }
  });

  //Presentación de formularios
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    //Mostrar el estado de carga
    submitButton.disabled = true;
    buttonText.textContent = "Iniciando sesión...";
    loadingSpinner.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    try {
      const result = await login(email, password);
      if (!result) {
        throw new Error("Credenciales inválidas");
      }
      // Simular una llamada a la API con un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validación de ejemplo (reemplazar con una llamada real a la API)
      if (email === "demo@example.com" && password === "password") {
        // Almacenar el estado de autenticación
        if (remember) {
          localStorage.setItem("isAuthenticated", "true"); // Guardar en almacenamiento local si el usuario selecciona "recordar"
        } else {
          sessionStorage.setItem("isAuthenticated", "true"); // Guardar en la sesión si no selecciona "recordar"
        }

        // Redirigir a la página principal
        window.location.href = "/";
      } else {
        throw new Error("Credenciales inválidas"); // Lanzar un error si las credenciales no son válidas
      }
    } catch (error) {
      // Mostrar el mensaje de error si ocurre una excepción
      errorMessage.classList.remove("hidden");

      // Ocultar el mensaje de error después de 5 segundos
      setTimeout(() => {
        errorMessage.classList.add("hidden");
      }, 5000);
    } finally {
      // Restablecer el estado del botón
      submitButton.disabled = false; // Habilitar el botón de inicio de sesión
      buttonText.textContent = "Iniciar Sesión"; // Restaurar el texto del botón
      loadingSpinner.classList.add("hidden"); // Ocultar el indicador de carga
    }
  });

  // Verificar si el usuario ya está autenticado
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") ||
    sessionStorage.getItem("isAuthenticated");
  if (isAuthenticated === "true") {
    window.location.href = "/"; // Redirigir automáticamente si el usuario ya está autenticado
  }

  // Agregar estilos de enfoque para mejorar la accesibilidad
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused"); // Agregar clase cuando el campo esté enfocado
    });
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused"); // Quitar clase cuando el campo pierda el enfoque
    });
  });
});
