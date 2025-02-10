const initSneakerDisplay = (config) => {
  const {
    containerId,
    jsonUrl = "../data/sneakers.json",
    cssPath = "../css/sneaker-display.css",
  } = config;

  // Estado global para los filtros
  const filterState = {
    brand: "all",
    priceRange: "all",
    sort: "default",
  };

  // Configuración de los filtros
  const filterConfig = {
    priceRanges: [
      { id: "all", label: "Todos los precios" },
      { id: "0-100", label: "Menos de $100" },
      { id: "100-200", label: "Entre $100 y $200" },
      { id: "200-plus", label: "Más de $200" },
    ],
    sortOptions: [
      { id: "default", label: "Destacados" },
      { id: "price-asc", label: "Precio: Menor a Mayor" },
      { id: "price-desc", label: "Precio: Mayor a Menor" },
      { id: "name-asc", label: "Nombre: A-Z" },
      { id: "name-desc", label: "Nombre: Z-A" },
    ],
  };

  // Cargar CSS
  const loadCSS = () => {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  };

  // Crear la estructura HTML
  const createStructure = () => {
    const container = document.getElementById(containerId);
    if (!container)
      throw new Error(`Container with id "${containerId}" not found`);

    container.innerHTML = `
            <div class="sd-filters-container">
                <div class="sd-filters-row">
                    <div class="sd-filters-group">
                        <label class="sd-filters-label">Marcas</label>
                        <div class="sd-filters" id="sd-brandFilters"></div>
                    </div>

                    <div class="sd-filters-group">
                        <label class="sd-filters-label">Precio</label>
                        <div class="sd-filters" id="sd-priceFilters">
                            ${filterConfig.priceRanges
                              .map(
                                (range) => `
                                <button class="sd-filter-btn ${
                                  range.id === "all" ? "active" : ""
                                }" 
                                        data-filter="priceRange" 
                                        data-value="${range.id}">
                                    ${range.label}
                                </button>
                            `
                              )
                              .join("")}
                        </div>
                    </div>

                    <div class="sd-filters-group">
                        <label class="sd-filters-label">Ordenar por</label>
                        <select class="sd-sort-select" data-filter="sort">
                            ${filterConfig.sortOptions
                              .map(
                                (option) => `
                                <option value="${option.id}">${option.label}</option>
                            `
                              )
                              .join("")}
                        </select>
                    </div>
                </div>

                <div class="sd-active-filters" id="sd-activeFilters">
                    <!-- Aquí se mostrarán los filtros activos -->
                </div>
            </div>
            <div id="sd-loadingState" class="sd-loading-state">
                <div class="sd-loading-spinner"></div>
                <p>Cargando colección...</p>
            </div>
            <div class="sd-grid" id="sd-sneakersGrid"></div>
        `;
  };

  // Crear una card individual
  const createSneakerCard = (sneaker) => {
    const hasDiscount = sneaker.discount > 0;
    const originalPrice = hasDiscount
      ? (sneaker.price / (1 - sneaker.discount / 100)).toFixed(2)
      : sneaker.price;
    const isPopular = Math.random() > 0.7; // Simulación de producto en tendencia
    const stockLevel = Math.random() > 0.8 ? "low" : "in"; // Simulación de nivel de stock

    return `
        <div class="sd-card" data-brand="${sneaker.brand.toLowerCase()}">
            <div class="sd-image-container">
                <div class="sd-image-overlay"></div>
                <div class="sd-size-badge">Tallas: ${Math.min(
                  ...sneaker.sizes
                )} - ${Math.max(...sneaker.sizes)}</div>
                ${
                  isPopular
                    ? '<div class="sd-popularity-badge">⚡️ En tendencia</div>'
                    : ""
                }
                <button class="sd-wishlist-btn" onclick="SneakerDisplay.toggleWishlist(this)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
                <img src="${sneaker.image}" alt="${
      sneaker.name
    }" class="sd-image" loading="lazy">
                <div class="sd-stock-status sd-stock-${stockLevel}">
                    <span class="sd-stock-dot"></span>
                    ${stockLevel === "low" ? "Stock limitado" : "Disponible"}
                </div>
            </div>
            <div class="sd-details">
                <span class="sd-brand">${sneaker.brand}</span>
                <h3 class="sd-name">${sneaker.name}</h3>
                <div class="sd-price-container">
                    <div class="sd-price">
                        $${sneaker.price}
                        ${
                          hasDiscount
                            ? `
                            <span class="sd-original-price">$${originalPrice}</span>
                            <span class="sd-discount-badge">-${sneaker.discount}%</span>
                        `
                            : ""
                        }
                    </div>
                </div>
                <div class="sd-actions">
                    <button class="sd-btn sd-btn-primary" onclick="SneakerDisplay.addToCart('${
                      sneaker.id
                    }')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-3h7a1 1 0 0 0 .962-.725l3-10A1 1 0 0 0 19 5H5.72l-.375-2H2"/>
                        </svg>
                        Añadir
                    </button>
                    <button class="sd-btn sd-btn-secondary" onclick="SneakerDisplay.viewDetails('${
                      sneaker.id
                    }')">
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    `;
  };

  // Namespace para funciones públicas
  window.SneakerDisplay = {
    toggleWishlist: (button) => {
      button.classList.toggle("active");
      showToast(
        button.classList.contains("active")
          ? "Añadido a favoritos"
          : "Eliminado de favoritos"
      );
    },

    addToCart: (sneakerId) => {
      showToast("Producto añadido al carrito");
    },

    viewDetails: (sneakerId) => {
      showToast("Cargando detalles...");
    },
  };

  // Funciones auxiliares
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "sd-toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "sd-slideOut 0.3s ease-in forwards";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  };

  const updateActiveFilters = () => {
    const activeFiltersContainer = document.getElementById("sd-activeFilters");
    const activeFilters = [];

    if (filterState.brand !== "all") {
      activeFilters.push({
        type: "brand",
        label: `Marca: ${filterState.brand}`,
      });
    }

    if (filterState.priceRange !== "all") {
      const priceRange = filterConfig.priceRanges.find(
        (r) => r.id === filterState.priceRange
      );
      if (priceRange) {
        activeFilters.push({
          type: "priceRange",
          label: priceRange.label,
        });
      }
    }

    if (activeFilters.length > 0) {
      activeFiltersContainer.innerHTML = `
                <div class="sd-active-filters-content">
                    ${activeFilters
                      .map(
                        (filter) => `
                        <span class="sd-active-filter">
                            ${filter.label}
                            <button class="sd-remove-filter" data-filter="${filter.type}">×</button>
                        </span>
                    `
                      )
                      .join("")}
                    <button class="sd-clear-filters">Limpiar filtros</button>
                </div>
            `;
      activeFiltersContainer.style.display = "block";
    } else {
      activeFiltersContainer.style.display = "none";
    }
  };

  const generateBrandFilters = (sneakers) => {
    const brands = [...new Set(sneakers.map((sneaker) => sneaker.brand))];
    const filtersHTML = brands
      .map(
        (brand) =>
          `<button class="sd-filter-btn" data-filter="brand" data-value="${brand.toLowerCase()}">${brand}</button>`
      )
      .join("");

    document.getElementById(
      "sd-brandFilters"
    ).innerHTML = `<button class="sd-filter-btn active" data-filter="brand" data-value="all">Todas las marcas</button>${filtersHTML}`;
  };

  const displaySneakers = (sneakersData) => {
    let filteredSneakers = [...sneakersData];

    // Filtro por marca
    if (filterState.brand !== "all") {
      filteredSneakers = filteredSneakers.filter(
        (sneaker) => sneaker.brand.toLowerCase() === filterState.brand
      );
    }

    // Filtro por rango de precios
    if (filterState.priceRange !== "all") {
      const [min, max] = filterState.priceRange.split("-").map(Number);
      filteredSneakers = filteredSneakers.filter((sneaker) => {
        if (filterState.priceRange === "200-plus") {
          return sneaker.price >= 200;
        }
        return sneaker.price >= min && sneaker.price <= (max || Infinity);
      });
    }

    // Aplicar ordenamiento
    switch (filterState.sort) {
      case "price-asc":
        filteredSneakers.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredSneakers.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredSneakers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredSneakers.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    const grid = document.getElementById("sd-sneakersGrid");
    if (filteredSneakers.length === 0) {
      grid.innerHTML = `
                <div class="sd-no-results">
                    <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
                    <button class="sd-btn sd-btn-secondary" onclick="location.reload()">Reiniciar filtros</button>
                </div>
            `;
    } else {
      grid.innerHTML = filteredSneakers
        .map((sneaker) => createSneakerCard(sneaker))
        .join("");
    }

    updateActiveFilters();
  };

  const setupFilterListeners = (sneakersData) => {
    // Event listeners para filtros de botón
    document
      .querySelectorAll(".sd-filter-btn[data-filter]")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          const filter = e.target.dataset.filter;
          const value = e.target.dataset.value;

          // Actualizar estado del filtro
          filterState[filter] = value;

          // Actualizar UI
          document
            .querySelectorAll(`[data-filter="${filter}"]`)
            .forEach((btn) => {
              btn.classList.remove("active");
            });
          e.target.classList.add("active");

          // Aplicar filtros
          displaySneakers(sneakersData);
        });
      });

    // Event listener para el select de ordenamiento
    document
      .querySelector(".sd-sort-select")
      .addEventListener("change", (e) => {
        filterState.sort = e.target.value;
        displaySneakers(sneakersData);
      });

    // Event listeners para remover filtros individuales
    document
      .getElementById("sd-activeFilters")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("sd-remove-filter")) {
          const filterType = e.target.dataset.filter;
          filterState[filterType] = "all";

          // Actualizar UI de los botones
          document
            .querySelectorAll(`[data-filter="${filterType}"]`)
            .forEach((btn) => {
              btn.classList.remove("active");
            });
          document
            .querySelector(`[data-filter="${filterType}"][data-value="all"]`)
            .classList.add("active");

          displaySneakers(sneakersData);
        } else if (e.target.classList.contains("sd-clear-filters")) {
          // Resetear todos los filtros
          Object.keys(filterState).forEach((key) => {
            filterState[key] = "all";
          });

          // Resetear UI
          document.querySelectorAll(".sd-filter-btn").forEach((btn) => {
            btn.classList.remove("active");
          });
          document.querySelectorAll('[data-value="all"]').forEach((btn) => {
            btn.classList.add("active");
          });
          document.querySelector(".sd-sort-select").value = "default";

          displaySneakers(sneakersData);
        }
      });
  };

  // Inicialización
  const init = async () => {
    try {
      await loadCSS();
      createStructure();

      const response = await fetch(jsonUrl);
      if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

      const data = await response.json();
      document.getElementById("sd-loadingState").style.display = "none";

      const sneakersArray = Array.isArray(data.sneakers)
        ? data.sneakers
        : Object.values(data.sneakers).flat();

      generateBrandFilters(sneakersArray);
      setupFilterListeners(sneakersArray);
      displaySneakers(sneakersArray);
    } catch (error) {
      console.error("Error inicializando SneakerDisplay:", error);
      document.getElementById("sd-loadingState").innerHTML = `
                <div class="sd-error-state">
                    <p>Error: ${error.message}</p>
                    <button class="sd-btn sd-btn-secondary" onclick="location.reload()">Reintentar</button>
                </div>
            `;
    }
  };

  init();
};
