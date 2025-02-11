function loadSlideCart() {
    const nav = document.createElement("nav");
    nav.id = "slideCart"
    nav.innerHTML = `
        <div id="title">
        <h2>Mi carrito de compras</h2>
        <button id="buttonCloseSlide">X</button>
        </div>
        <div id="containerCard">
                
        </div>
        <div id="purchaseSummary">
        <table id="purchaseInformation">
            <tr>
            <td>
                <p>Costo de envio</p>
            </td>
            <td>
                <p id="shippingCost">Por calcular</p>
            </td>
            </tr>
            <tr>
            <td>
                <p>Total estimado</p>
            </td>
            <td>
                <p id="estimatedTotal">S/ 0.00</p>
            </td>
            </tr>
        </table>
        <button type="button" id="buttonContinuarCompra">
            <strong>CONTINUAR COMPRA</strong>
        </button>
        <a href="../html/cart.html" id="verCarrito"><strong>VER CARRITO</strong></a>
        <p></p>
        </div>    
        `;
    document.body.appendChild(nav);   

    // ADDEVENTLISTENER

    // Detectar clics fuera del carrito
    /*document.addEventListener('click', (event) => {
        if (!slideCart.contains(event.target) && slideCart.style.visibility === 'visible') {
            slideCart.style.visibility = 'hidden';
        }            
    });*/

    const buttonClose = document.getElementById(`buttonCloseSlide`);
    buttonClose.addEventListener(`click`, () => {
        nav.style.visibility = `hidden`;
    })
}

function insertCard(card) {
    const container = document.getElementById(`containerCard`)
    container.appendChild(card);
}

function renderizar() {
    const container = document.getElementById(`containerCard`)
    container.innerHTML = ``;
    console.log("renderizar")
    cartUser.forEach(cartProduct => {
        const index = findIndexProduct(cartProduct.productId);

        const productId = cartProduct.productId;       
        const size = cartProduct.size; 
        const amount = cartProduct.amount;

        const name = store[index].name; 
        const price = store[index].price;      
        const color = store[index].color;        
        // !!!!!!!!!!CAMBIAR MAS TARDE !!!!!!!!!!!!!!           
        const stock = 100;          
        //-----------------------  
        const imageSrc = store[index].imageSrc; 
        const linkDetails = store[index].linkDetails; 

        const card = generateCard(productId, name, price, color, size, stock, amount, imageSrc, linkDetails);
        insertCard(card);
    });
    updatePrice()
}

function updatePrice() {
    const precioTotal = document.getElementById('estimatedTotal');
    precioTotal.innerHTML = "S/ " + calculateTotalPrice();
}