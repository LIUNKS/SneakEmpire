document.addEventListener("DOMContentLoaded", function () {
  // Efecto de desvanecimiento al hacer scroll
  const fadeElements = document.querySelectorAll(".fade-in"); // Selecciona los elementos con la clase 'fade-in'
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si el elemento es visible en la pantalla
          entry.target.classList.add("visible"); // Agrega la clase 'visible' para aplicar el efecto
        }
      });
    },
    {
      threshold: 0.1, // Porcentaje del elemento que debe ser visible para activar el efecto
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element); // Observa cada elemento seleccionado
  });

  // Animar estadísticas
  const stats = document.querySelectorAll(".stat-number"); // Selecciona los elementos de estadísticas
  let animated = false; // Bandera para evitar repetir la animación

  const animateStats = () => {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target")); // Obtiene el valor objetivo desde el atributo 'data-target'
      const duration = 2000; // Duración de la animación en milisegundos
      const step = target / (duration / 16); // Incremento por cuadro (60fps)
      let current = 0; // Valor inicial de la animación

      const updateValue = () => {
        current += step; // Incrementa el valor actual
        if (current < target) {
          // Si no se ha alcanzado el objetivo
          stat.textContent = Math.floor(current); // Actualiza el valor mostrado
          requestAnimationFrame(updateValue); // Continua la animación en el siguiente cuadro
        } else {
          stat.textContent = target; // Asegura que el valor final sea el objetivo exacto
        }
      };

      updateValue(); // Inicia la animación
    });
  };

  // Animar estadísticas cuando estén visibles en la pantalla
  const statsSection = document.querySelector(".stats-section"); // Selecciona la sección que contiene las estadísticas
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          // Si la sección es visible y aún no ha sido animada
          animateStats(); // Inicia la animación
          animated = true; // Marca la animación como realizada
        }
      });
    },
    {
      threshold: 0.5, // La mitad de la sección debe ser visible para activar la animación
    }
  );

  statsObserver.observe(statsSection); // Observa la sección de estadísticas

  // Desplazamiento suave para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento por defecto del enlace
      const target = document.querySelector(this.getAttribute("href")); // Selecciona el destino del enlace
      if (target) {
        target.scrollIntoView({
          behavior: "smooth", // Desplazamiento suave
          block: "start", // Alinea el destino al inicio de la pantalla
        });
      }
    });
  });

  // Animación en tarjetas de valor al pasar el mouse
  const valueCards = document.querySelectorAll(".value-card"); // Selecciona las tarjetas con la clase 'value-card'
  valueCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"; // Eleva la tarjeta al pasar el mouse
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"; // Restaura la posición de la tarjeta al quitar el mouse
    });
  });
});
