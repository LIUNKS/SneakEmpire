//VARIABLES GLOBALES3

    // Se puede mejorar la forma como se guardan los productos con un segundo array que lleve el conteo 
    // de la cntidad de productos, en vez simplemente agregar un div mas xd.
    let cartUser = []; 

// FUNCIONES GENERALES PARA EL CARRITO DE COMPRAS
function addProduct(product) {
    cartUser.push(product); 
}

function deleteProduct(product) {  
    const index = cartUser.findIndex(
        item => item.name === product.name && item.color === product.color && item.size === product.size
    );

    if (index !== -1) {
        cartUser.splice(index, 1);
        return true;
    }
    
    return false;
}

function deleteAllProduct(product) {
    cartUser = cartUser.filter(
        cartProduct => !(cartProduct.name === product.name && cartProduct.color === product.color && cartProduct.size === product.size)
    );
}

function calculateTotalPrice() {
    return cartUser.reduce((total, cartProduct) => total + cartProduct.price, 0);
}

function generateCard(name, price, color, size, stock, imageSrc, linkDetails) {
    const card = document.createElement(`div`);
    card.classList.add(`card`);
    card.innerHTML = `
        <div>
        <a href=${linkDetails}>
            <img src=${imageSrc} alt="" class="imageCard" />
        </a>
        </div>
        <div class="productInformation">
        <div class="name"><strong>${name}</strong></div>
        <div class="price"><strong>S/${price}</strong></div>
        <div class="color">Color: ${color}</div>
        <button type="button" class="deleteButton" class=${name} class=${color} class=${size}>
            <img src="../img/trash.webp" alt="" class="iconDelete" />
        </button>          
        <div class="size">Talla: ${size}</div>
        <div></div> 
        <input type="number" min="1" max="${stock}" step="1" class="amount" value="1"/>
        </div>
        `;
    return card;
}

// Esta funcion simula la compra del cliente
function simulacionCompra() {
    // -3 porque no quiero que compre toda la tienda XD
    for (let i = 0; i < store.length -3; i++) {
        
    }
}

