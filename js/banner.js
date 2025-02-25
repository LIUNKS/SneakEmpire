function loadBanner() {
  const bannerHTML = `
     <div class="banner">
        <div class="new-product">
            <svg viewBox="0 0 100 100">
                <defs>
                    <path id="circle-text" d="M50,10 A40,40 0 0,1 50,90 A40,40 0 0,1 50,10" fill="none"/>
                </defs>
                <path d="M50,0 A50,50 0 0,1 50,100 A50,50 0 0,1 50,0" fill="none" stroke="white"/>
                <text fill="white" font-size="8" aria-hidden="true">
                    <textPath xlink:href="#circle-text">
                        • NEW PRODUCT • NEW PRODUCT • NEW PRODUCT • NEW PRODUCT
                    </textPath>
                </text>
            </svg>
        </div>

        <div class="discount-badge">
            <div class="discount-text">20%<br>OFF</div>
        </div>

        <img src="../img/banner_imagen.webp" alt="Imagen de Portada" class="shoe-image">

        <div class="content">
            <h1 class="title">¡Pisa fuerte con estilo!</h1>
            <div class="divider"></div>
            <p class="subtitle">¡Descuentos imperdibles en zapatillas para hombres! Renueva tu estilo urbano con las mejores opciones</p>
        </div>
    </div>
    `;

  // Crear Contenedor
  const bannerContainer = document.createElement("div");
  bannerContainer.className = "banner-container";
  bannerContainer.innerHTML = bannerHTML;

  // Insertar el contenedor en el body
  document.body.appendChild(bannerContainer);

  // Añadir interactividad a la imagen
  const shoeImage = document.querySelector(".shoe-image");
  shoeImage.addEventListener("mouseover", function () {
    this.style.filter = "brightness(1.1)";
  });

  shoeImage.addEventListener("mouseout", function () {
    this.style.filter = "brightness(1)";
  });

  // Añadir interactividad al badge de descuento
  const discountBadge = document.querySelector(".discount-badge");
  discountBadge.addEventListener("mouseover", function () {
    this.style.backgroundColor = "#ff0000";
    this.querySelector(".discount-text").style.color = "white";
  });

  discountBadge.addEventListener("mouseout", function () {
    this.style.backgroundColor = "white";
    this.querySelector(".discount-text").style.color = "black";
  });
}

function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Tamaño aleatorio
  const size = Math.random() * 5 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Posición inicial aleatoria
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;

  // Opacidad aleatoria
  particle.style.opacity = Math.random() * 0.5 + 0.3;

  // Añadir al contenedor
  container.appendChild(particle);

  // Animar la partícula
  animateParticle(particle);
}
