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

function insertSlideCard(card) {
    const container = document.getElementById(`containerCard`)
    container.appendChild(card);
}

function updatePrice() {
    const precioTotal = document.getElementById('estimatedTotal');
    precioTotal.innerHTML = "S/ " + calculateTotalPrice();
}