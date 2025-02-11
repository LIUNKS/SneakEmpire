//VARIABLES GLOBALES

let cartUser = []; 
let store = [];

loadJson();
// FUNCIONES GENERALES PARA EL CARRITO DE COMPRAS
function addProduct(productId, size, render) {
    
    const index = cartUser.findIndex(
        cartProduct => cartProduct.productId === productId && cartProduct.size === size
    );

    if (index !== -1) {
        cartUser[index].amount ++;
        render()
        return;
    };

    const cartProduct = {
        productId: productId,
        size: size,
        amount: 1
    };

    cartUser.push(cartProduct);
    console.log("antes del render ")
    render();
}

function deleteProduct(productId, size, render) {
    const index = cartUser.findIndex(
        cartProduct => cartProduct.productId === productId && cartProduct.size === size
    );

    if (index !== -1) {
        cartUser.splice(index, 1);
        render();
        return true;
    }
    
    return false;
}

function modifyAmount(productId, size, amount, render) {
    if (amount < 1) {
        return;
    }
    const index = cartUser.findIndex(
        cartProduct => cartProduct.productId === productId && cartProduct.size === size
    );

    if (index !== -1) {
        cartUser[index].amount = amount;
    }

    render();
}

function calculateTotalPrice() {
    return cartUser.reduce((total, productId) => total + productId.price, 0);
}

function generateCard(productId, name, price, color, size, stock, amount, imageSrc, linkDetails) {
    const card = document.createElement(`div`);
    card.id = productId;
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
        <button type="button" class="deleteButton">
            <img src="../img/trash.webp" alt="" class="iconDelete" />
        </button>          
        <div class="size">Talla: ${size}</div>
        <div></div> 
        <input type="number" min="1" max="${stock}" step="1" class="amount"/>
        </div>
        `;
    return card;
}

function findIndexProduct(prodcutId) {
    let index = store.findIndex(
        product => product.id === prodcutId
    );
    return index
}

// LOCAL STORAGE
function saveCartUser() {
    localStorage.setItem('cartUser', JSON.stringify(cartUser));
}

function loadData() {
    if (localStorage.getItem('cartUser') !== null) {
        cartUser = JSON.parse(localStorage.getItem('cartUser'));
    }
}

// JSON
async function loadJson() {
    try {
        const response = await fetch('../data/sneakers.json');

        if (!response.ok) {
            throw new Error(`Error al cargar el JSON: ${response.status}`);
        }

        const data = await response.json();

        store = Array.isArray(data.sneakers)
        ? data.sneakers
        : Object.values(data.sneakers).flat();
    } catch (error) {
        console.error('Error:', error);
    }
}
