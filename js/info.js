let store = [];

// JSON
async function loadJson() {
    try {
        const response = await fetch('../data/sneakers.json');

        if (!response.ok) {
            throw new Error(`Error al cargar el JSON: ${response.status}`);
        }

        const data = await response.json();

        store = Array.isArray(data.sneakers)? data.sneakers: Object.values(data.sneakers).flat();    
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para cargar los datos de una zapatilla
function loadSneakerData(sneaker) {
    loadJson()
    console.log(sneaker)
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

function iniciar(){
    // Cargar la primera zapatilla por defecto
    loadJson().then(()=>{
        //15 ES UN VALOR DE PRUEBA, PUEDE SER 0 HASTA 30 CREO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        loadSneakerData(store[15]);
    })
}

function findIndexProduct(productId) {
    return store.findIndex(
        product => product.id === productId
    );
}

iniciar()