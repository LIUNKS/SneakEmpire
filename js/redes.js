document.addEventListener("DOMContentLoaded", function () {
  const socialFeed = document.getElementById("socialFeed");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("postModal");
  let currentPage = 1;
  let currentFilter = "all";

  // Datos simulados para publicaciones en redes sociales
  const mockPosts = [
    {
      id: 1,
      type: "news",
      image: "../img/post-1.webp?height=400&width=600",
      avatar: "../img/avatar.webp?height=100&width=100",
      author: "Sneak Empire",
      date: "Hace 2 horas",
      content:
        "¡Noticias emocionantes! Nuestra última colección de zapatillas de edición limitada llega este fin de semana. ¡Estén atentos para más detalles! 🔥👟",
      tags: ["Lanzamiento", "SneakerDrop", "Limitado"],
      likes: 245,
      comments: 58,
    },
    {
      id: 2,
      type: "releases",
      image: "../img/post-2.webp?height=400&width=600",
      avatar: "../img/avatar.webp?height=100&width=100",
      author: "Sneak Empire",
      date: "Hace 1 día",
      content:
        "¡La colección Air Max está de vuelta! Consigue la tuya antes de que se agoten de nuevo. Disponible en todas las tallas.",
      tags: ["AirMax", "Reabastecimiento", "Imperdible"],
      likes: 189,
      comments: 42,
    },
    {
      id: 3,
      type: "community",
      image: "../img/post-3.webp?height=400&width=600",
      avatar: "../img/avatar-cliente.webp?height=100&width=100",
      author: "John Quispe",
      date: "Hace 2 días",
      content:
        "¡Acabo de recoger mis nuevas zapatillas de Sneak Empire! ¡El mejor servicio al cliente! 🙌",
      tags: ["SneakerFam", "ClienteFeliz"],
      likes: 156,
      comments: 23,
    },
  ];

  // Show notification function
  const showNotification = (message, type = "success") => {
    const notification = document.getElementById("notification");
    const notificationMessage = notification.querySelector(
      ".notification-message"
    );
    notification.className = `notification ${type} show`;
    notificationMessage.textContent = message;

    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  };

  // Close notification
  const closeNotification = document.querySelector(".close-notification");
  closeNotification.addEventListener("click", () => {
    document.getElementById("notification").classList.remove("show");
  });

  //HTML para la publicación
  function createPostHTML(post) {
    return `
            <div class="post-card" data-type="${
              post.type
            }" data-id="${post.id}">
                <img src="${
                  post.image
                }" alt="Imagen de la publicación ${post.id}" class="post-image">
                <div class="post-content">
                    <div class="post-header">
                        <img src="${
                          post.avatar
                        }" alt="Avatar ${post.author}" class="post-avatar">
                        <div class="post-info">
                            <h3>${post.author}</h3>
                            <span class="post-date">${post.date}</span>
                        </div>
                    </div>
                    <p class="post-text">${post.content}</p>
                    <div class="post-tags">
                        ${post.tags
                          .map((tag) => `<span class="post-tag">#${tag}</span>`)
                          .join("")}
                    </div>
                    <div class="post-actions">
                        <button class="action-btn like-btn" data-post-id="${
                          post.id
                        }">
                            ❤️ <span class="like-count">${post.likes}</span>
                        </button>
                        <button class="action-btn comment-btn" data-post-id="${
                          post.id
                        }">
                            💬 <span class="comment-count">${
                              post.comments
                            }</span>
                        </button>
                        <button class="action-btn share-btn" data-post-id="${
                          post.id
                        }">
                            📤 Compartir
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  // Cargar publicaciones
  function loadPosts(filter = "all", page = 1) {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    let filteredPosts = mockPosts;

    if (filter !== "all") {
      filteredPosts = mockPosts.filter((post) => post.type === filter);
    }

    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    if (page === 1) {
      socialFeed.innerHTML = "";
    }

    postsToShow.forEach((post) => {
      socialFeed.insertAdjacentHTML("beforeend", createPostHTML(post));
    });

    // Ocultar botón de cargar más si no hay más publicaciones
    loadMoreBtn.style.display =
      endIndex >= filteredPosts.length ? "none" : "block";

    // Configurar interacciones en publicaciones
    setupPostInteractions();
  }

  // Configurar interacciones
  function setupPostInteractions() {
    // Botone de "Me gusta"
    document.querySelectorAll(".like-btn").forEach((btn) => {
      if (!btn.hasListener) {
        btn.hasListener = true;
        btn.addEventListener("click", function () {
          const likeCount = this.querySelector(".like-count");
          const currentLikes = parseInt(likeCount.textContent);

          if (this.classList.contains("liked")) {
            likeCount.textContent = currentLikes - 1;
            this.classList.remove("liked");
          } else {
            likeCount.textContent = currentLikes + 1;
            this.classList.add("liked");
          }
        });
      }
    });

    // Botones de comentarios
    document.querySelectorAll(".comment-btn").forEach((btn) => {
      if (!btn.hasListener) {
        btn.hasListener = true;
        btn.addEventListener("click", function () {
          const postId = this.getAttribute("data-post-id");
          const post = mockPosts.find((p) => p.id === parseInt(postId));
          showModal(post);
        });
      }
    });

    // Botones de compartir
    document.querySelectorAll(".share-btn").forEach((btn) => {
      if (!btn.hasListener) {
        btn.hasListener = true;
        btn.addEventListener("click", function () {
          showNotification("¡Función de compartir disponible pronto!", "info");
        });
      }
    });
  }

  // Filtrar publicaciones
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Actualizar estado activo
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Reiniciar y cargar publicaciones filtradas
      currentPage = 1;
      currentFilter = filter;
      loadPosts(filter, currentPage);
    });
  });

  // Cargar más publicaciones
  loadMoreBtn.addEventListener("click", function () {
    this.disabled = true;
    const spinner = this.querySelector(".loading-spinner");
    const buttonText = this.querySelector(".button-text");

    spinner.classList.remove("hidden");
    buttonText.textContent = "Cargando...";

    // Simular retraso de carga
    setTimeout(() => {
      currentPage++;
      loadPosts(currentFilter, currentPage);

      this.disabled = false;
      spinner.classList.add("hidden");
      buttonText.textContent = "Cargar más";
    }, 1000);
  });

  // Mostrar modal
  function showModal(post) {
    const modalBody = modal.querySelector(".modal-body");
    modalBody.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="Avatar" class="post-avatar">
                <div class="post-info">
                    <h3>${post.author}</h3>
                    <span class="post-date">${post.date}</span>
                </div>
            </div>
            <img src="${
              post.image
            }" alt="Imagen de la publicación" style="width: 100%; margin: 1rem 0; border-radius: 10px;">
            <p class="post-text">${post.content}</p>
            <div class="post-tags">
                ${post.tags
                  .map((tag) => `<span class="post-tag">#${tag}</span>`)
                  .join("")}
            </div>
        `;
    modal.classList.add("show");
  }

  // Cerrar modal
  const closeModal = modal.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Cerrar modal al hacer clic fuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Carga inicial
  loadPosts();
});
