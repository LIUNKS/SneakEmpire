const sneakers = {
    "adidas": [
        {
            "id": "ad001",
            "name": "Yeezy Boost 350 V2 Onyx",
            "price": 299.99,
            "brand": "adidas",
            "model": "Yeezy Boost 350 V2",
            "colorway": "Onyx/Onyx/Onyx",
            "sizes": [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
            "description": "El icónico diseño Yeezy en un elegante colorway negro total",
            "category": "Lifestyle",
            "image": "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Onyx-Product.jpg",
            "inStock": true,
            "releaseDate": "2024-01-15"
        },
        {
            "id": "ad002",
            "name": "Samba OG Red Leopard",
            "price": 129.99,
            "brand": "adidas",
            "model": "Samba OG",
            "colorway": "Red/Leopard Print",
            "sizes": [36, 37, 38, 39, 40, 41],
            "description": "Una versión única del clásico Samba con print de leopardo",
            "category": "Lifestyle",
            "image": "https://images.stockx.com/images/adidas-Samba-OG-Preloved-Red-Leopard-Womens-Product.jpg",
            "inStock": true,
            "releaseDate": "2024-02-01"
        },
        {
            "id": "ad003",
            "name": "Campus 00s",
            "price": 109.99,
            "brand": "adidas",
            "model": "Campus 00s",
            "colorway": "Core Black/White",
            "sizes": [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
            "description": "Versión moderna del clásico Campus",
            "category": "Lifestyle",
            "image": "https://images.stockx.com/images/adidas-Campus-00s-Core-Black-Product.jpg",
            "inStock": true,
            "releaseDate": "2024-01-20"
        },
    ]
}


// Función para cargar los datos de una zapatilla
function loadSneakerData(sneaker) {
    // Actualizar la imagen principal
    document.getElementById('sneaker-image').src = sneaker.image;
    document.getElementById('sneaker-image').alt = sneaker.name;

    // Actualizar el nombre
    document.getElementById('sneaker-name').textContent = sneaker.name;

    // Actualizar el precio
    document.getElementById('sneaker-price').textContent = `$${sneaker.price.toFixed(2)}`;

    // Actualizar la marca y el colorway
    document.getElementById('sneaker-brand').textContent = `Marca: ${sneaker.brand}`;
    document.getElementById('sneaker-colorway').textContent = `Color: ${sneaker.colorway}`;

    // Actualizar la imagen del color
    document.getElementById('sneaker-color-image').src = sneaker.image;

    // Actualizar las tallas disponibles
    const sizeSelect = document.getElementById('size');
    sizeSelect.innerHTML = ''; // Limpiar opciones anteriores
    sneaker.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    // Actualizar la descripción
    const descriptionList = document.getElementById('sneaker-description');
    descriptionList.innerHTML = `
        <li>Modelo: ${sneaker.model}</li>
        <li>Colorway: ${sneaker.colorway}</li>
        <li>Categoría: ${sneaker.category}</li>
        <li>Fecha de lanzamiento: ${sneaker.releaseDate}</li>
    `;
}

// Cargar la primera zapatilla por defecto
loadSneakerData(sneakers.adidas[0]);