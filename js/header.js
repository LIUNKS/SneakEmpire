function loadHeader() {
  // Cargar el archivo CSS externo
  const link = document.createElement("link");
  document.head.appendChild(link);

  // Crear el header
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `
      <div class="container">
        <div class="menu">
          <a href="inicio.html" class="contenedor-imagen">
            <img src="../img/logo.avif" alt="logo" class="imgLogo" />
          </a>
          <div class="menu-icono" id="menu-icono">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav class="navbar" id="navbar">
            <ul>
              <li style="--item-index: 0"><a href="inicio.html">Inicio</a></li>
              <li style="--item-index: 1"><a href="../html/nosotros.html">Nosotros</a></li>
              <li style="--item-index: 2"><a href="Contactanos.html">Contacto</a></li>
              <li style="--item-index: 3"><a href="RedesSociales.html">Redes</a></li>
              <li style="--item-index: 4">
                <a href="../html/login.html">
                  <button class="login-button" aria-label="Iniciar Sesión">Iniciar Sesión</button>
                </a>
              </li>
              <li style="--item-index: 5">
                <a href="carrito.html">
                  <button class="carrito-button" aria-label="Carrito de compras">
                    <img src="../img/carrito_compras.avif" alt="" class="carrito-icon">
                  </button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    `;

  document.body.prepend(header);

  /*// Lógica de interacción (como la que tenías antes)
  const menuIcono = document.getElementById("menu-icono");
  const navbar = document.querySelector(".navbar");
  const storedName = localStorage.getItem("name");

  // Mostrar mensaje de bienvenida si el nombre está almacenado
  if (storedName) {
    document.getElementById(
      "welcomeMessage"
    ).textContent = `Hola ${storedName.toUpperCase()}`;
    document.getElementById("welcomeMessage").style.display = "inline";
    document.getElementById("loginButton").style.display = "none";
  } else {
    document.getElementById("loginButton").style.display = "inline";
    document.getElementById("welcomeMessage").style.display = "none";
  }

  // Toggle de menú en pantallas pequeñas
  menuIcono.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuIcono.classList.toggle("active");
  });

  // Cerrar el menú si el clic no es sobre el menú ni el icono
  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target) && !menuIcono.contains(event.target)) {
      navbar.classList.remove("active");
    }
  });

  // Verificar si el usuario está logueado
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn) {
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("welcomeMessage").style.display = "inline";
  }*/
}
