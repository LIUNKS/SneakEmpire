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

        <img src="" alt="Zapatilla deportiva" class="shoe-image">

        <div class="content">
            <h1 class="title">¡Pisa fuerte con estilo!</h1>
            <div class="divider"></div>
            <p class="subtitle">¡Descuentos imperdibles en zapatillas para hombres! Renueva tu estilo urbano con las mejores opciones</p>
        </div>
    </div>
    `;

    // Crear un contenedor específico para el banner
    const bannerContainer = document.createElement('div');
    bannerContainer.className = "banner-container";
    bannerContainer.innerHTML = bannerHTML;

    // Insertar el contenedor en el body
    document.body.appendChild(bannerContainer);
}
