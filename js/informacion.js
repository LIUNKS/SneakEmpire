// product-detail.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Mostrar toast
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // Cargar detalles del producto
    async function loadProductDetails() {
        try {
            const response = await fetch('../data/sneakers.json');
            if (!response.ok) throw new Error('Error cargando los datos');
            
            const data = await response.json();
            let selectedProduct = null;

            // Buscar el producto en todas las marcas
            for (const brand in data.sneakers) {
                const product = data.sneakers[brand].find(p => p.id === productId);
                if (product) {
                    selectedProduct = product;
                    break;
                }
            }

            if (selectedProduct) {
                displayProductDetails(selectedProduct);
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            showToast('Error al cargar el producto');
            console.error('Error:', error);
        }
    }

    // Mostrar detalles del producto
    function displayProductDetails(product) {
        // Imagen principal
        const mainImage = document.getElementById('mainImage');
        mainImage.src = product.image;
        mainImage.alt = product.name;

        // Información básica
        document.getElementById('brandTag').textContent = product.brand;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('productDescription').textContent = product.description;

        // Estado de stock
        const stockBadge = document.getElementById('stockBadge');
        stockBadge.textContent = product.stock > 0 ? 'En stock' : 'Últimas unidades';
        stockBadge.className = `stock-badge ${product.stock > 0 ? 'in-stock' : 'low-stock'}`;

        // Detalles adicionales
        document.getElementById('productModel').textContent = product.model || 'N/A';
        document.getElementById('productColorway').textContent = product.colorway || 'N/A';
        document.getElementById('productRelease').textContent = formatDate(product.releaseDate);
        document.getElementById('productCategory').textContent = product.category || 'N/A';

        // Generar tallas
        generateSizeGrid(product.sizes);

        // Inicializar eventos
        initializeEvents(product);
    }

    // Generar grid de tallas
    function generateSizeGrid(sizes) {
        const sizeGrid = document.getElementById('sizeGrid');
        sizeGrid.innerHTML = '';
        
        sizes.forEach(size => {
            const sizeButton = document.createElement('div');
            sizeButton.className = 'size-option';
            sizeButton.textContent = `EU ${size}`;
            sizeButton.onclick = () => selectSize(sizeButton);
            sizeGrid.appendChild(sizeButton);
        });
    }

    // Seleccionar talla
    function selectSize(element) {
        document.querySelectorAll('.size-option').forEach(el => {
            el.classList.remove('selected');
        });
        element.classList.add('selected');
    }

    // Formatear fecha
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Inicializar eventos
    function initializeEvents(product) {
        // Evento para añadir al carrito
        document.querySelector('.add-to-cart').addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-option.selected');
            if (!selectedSize) {
                showToast('Por favor selecciona una talla');
                return;
            }
            
            addToCart(product, selectedSize.textContent);
        });

        // Evento para wishlist
        document.querySelector('.add-to-wishlist').addEventListener('click', () => {
            toggleWishlist(product);
        });
    }

    // Añadir al carrito
    function addToCart(product, size) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            image: product.image,
            quantity: 1
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        showToast('Producto añadido al carrito');
    }

    // Toggle wishlist
    function toggleWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.findIndex(item => item.id === product.id);

        if (index === -1) {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            showToast('Producto añadido a favoritos');
        } else {
            wishlist.splice(index, 1);
            showToast('Producto eliminado de favoritos');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Función para volver atrás
    window.goBack = function() {
        window.history.back();
    }

    // Iniciar carga de detalles
    loadProductDetails();
});