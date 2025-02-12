//VARIABLES GLOBALES

let cartUser = []; 
let store = [];

loadJson();
// FUNCIONES GENERALES PARA EL CARRITO DE COMPRAS
function addProduct(productId, size, render) {    
    const index = cartUser.findIndex(
        cartProduct => cartProduct.productId === productId && cartProduct.size === size
    );   
    // oJo       NO OLVIDAR!!!!!!
    // !!!!!AGRGAR LA VALIDACION DE STOCK!!!!!!!!!!!!
    if (index !== -1) {
        cartUser[index].amount ++;
        render();
        return;
    };

    const cartProduct = {
        productId: productId,
        size: size,
        amount: 1
    };

    cartUser.push(cartProduct);
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

function modifyAmount(productId, size, amount) {
    if (amount < 1) {
        return;
    }
    const index = cartUser.findIndex(
        cartProduct => cartProduct.productId === productId && cartProduct.size === size
    );

    if (index !== -1) {
        cartUser[index].amount = amount;
    }
}

function calculateTotalPrice() {
    let totalPrice = cartUser.reduce((total, cartProduct) => 
        total + (store[findIndexProduct(cartProduct.productId)].price * cartProduct.amount), 0 );
    return parseFloat(totalPrice).toFixed(2);
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
        <input type="number" min="1" max="${stock}" step="1" class="amount" value="${amount}"/>
        </div>
        `;

    // Agregar el eventListener para detectar el click al botón de eliminar
    const deleteButton = card.querySelector('.deleteButton');

    deleteButton.addEventListener('click', function() {
        deleteProduct(productId, size, updatePrice);
        card.remove(); 
    });

    // Agregar el eventListener para detectar cambios en el input
    const amountInput = card.querySelector('.amount');

    amountInput.addEventListener('input', function() {
        modifyAmount(productId, size, amountInput.value);
        updatePrice();
    });
    return card;
}

// INTERACCION CON LOS DATOS
function saveCartUser() {
    localStorage.setItem('cartUser', JSON.stringify(cartUser));
}

function loadData() {
    if (localStorage.getItem('cartUser') !== null) {
        cartUser = JSON.parse(localStorage.getItem('cartUser'));
    }
}

function findIndexProduct(prodcutId) {
    return store.findIndex(
        product => product.id === prodcutId
    );
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
