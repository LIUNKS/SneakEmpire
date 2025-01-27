// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Crear el header
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `
      <div class="container">
          <div class="menu">
              <a href="inicio.html" class="contenedor-imagen">
                  <img src="../img/logo.avif" alt="logo" class="imgLogo" />
              </a>
              <nav class="navbar" id="navbar">
                  <ul>
                      <li style="--item-index: 0"><a href="inicio.html">Inicio</a></li>
                      <li style="--item-index: 1"><a href="../html/nosotros.html">Nosotros</a></li>
                      <li style="--item-index: 2"><a href="../html/contacto.html">Contacto</a></li>
                      <li style="--item-index: 3"><a href="../html/redes.html">Redes</a></li>
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
              <button class="hamburger" aria-label="Menú">
                  <span></span>
                  <span></span>
                  <span></span>
              </button>
          </div>
      </div>
  `;

  // Agregar el header al body
  document.body.prepend(header);

  // Crear el overlay
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  // Ahora que los elementos están creados, podemos seleccionarlos
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const navOverlay = document.querySelector('.nav-overlay');

  // Verificar que los elementos existan
  if (!hamburger || !navbar || !navOverlay) {
      console.error('No se encontraron los elementos necesarios');
      return;
  }

  // Función para alternar el menú
  function toggleMenu() {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
  }

  // Agregar event listeners
  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer click en enlaces
  document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
          if (navbar.classList.contains('active')) {
              toggleMenu();
          }
      });
  });

  // Manejar resize de ventana
  let resizeTimer;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768 && navbar.classList.contains('active')) {
              toggleMenu();
          }
      }, 250);
  });
});