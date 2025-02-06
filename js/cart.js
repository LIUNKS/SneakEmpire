document.addEventListener('DOMContentLoaded', function() {
    insertarDatosArtificial();
});
let totalPagar = 0;
let cantProductos = 0;
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
        <button type="button" class="deleteButton">
            <img src="../img/trash.webp" alt="" class="iconDelete" />
        </button>          
        <div class="size">Talla: ${size}</div>
        <div></div> 
        <input type="number" min="1" max="${stock}" step="1" class="amount" value="1"/>
        </div>
        `;

    return card;
}

function addEventListener() {
    const nav = document.getElementById(`slideCart`)
    const buttonClose = document.getElementById(`buttonCloseSlide`);
    buttonClose.addEventListener(`click`, () => {
        nav.style.visibility = `hidden`;
    })
}
  
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
    addEventListener();
}

function insertCard(card) {
    const container = document.getElementById(`containerCard`)
    container.appendChild(card);
}

function calcularPrecio() {
  mockProducts.forEach(product => {
    totalPagar += product.price;
  });
}

function insertarDatosArtificial() {
    mockProducts.forEach(product => {
        const card = generateCard(product.name, product.price, product.color, product.size, product.stock, product.imageSrc, product.linkDetails);
        insertCard(card);
    });
}

let product = [];


const mockProducts = [
    {
      "name": "Zapatillas Air Max 97",
      "price": 120,
      "color": "Blanco/Plata",
      "size": "42, 43, 44, 45",
      "stock": 10,
      "imageSrc": "../img/zapatilla_1.avif",
      "linkDetails": "",
      "detalles": "Parte superior de piel resistente con velcros y de color blanco.",
    },
    {
      "name": "Zapatillas Nike Air Force 1",
      "price": 100,
      "color": "Negro/Blanco",
      "size": "40, 41, 42, 43",
      "stock": 15,
      "imageSrc": "../img/zapatilla_2.avif",
      "linkDetails": "/product/air-force-1",
      "detalles": "Zapatilla Adidas Samba negra con detalles blancos y suela de goma.",
    },
    {
      "name": "Zapatillas Adidas Ultraboost",
      "price": 180,
      "color": "Azul/Blanco",
      "size": "41, 42, 43, 44",
      "stock": 5,
      "imageSrc": "../img/zapatilla_3.avif",
      "linkDetails": "/product/ultraboost",
      "detalles": "Zapatilla deportiva en tonos grises con suela beige y detalles blancos."
    },
    {
      "name": "Zapatillas Puma RS-X3",
      "price": 95,
      "color": "Rojo/Negro",
      "size": "40, 41, 42, 44, 45",
      "stock": 8,
      "imageSrc": "../img/zapatilla_4.avif",
      "linkDetails": "/product/rs-x3",
      "detalles": "Calzado deportivo negro con suela de goma marrón y diseño minimalista.",
    },
    {
      "name": "Zapatillas New Balance 990v5",
      "price": 160,
      "color": "Gris/Negro",
      "size": "42, 43, 44, 45",
      "stock": 12,
      "imageSrc": "../img/zapatilla_5.avif",
      "linkDetails": "/product/990v5",
      "detalles": "Zapatilla urbana verde y negra y detalles en paneles superpuestos."
    },
    {
      "name": "Zapatillas Vans Old Skool",
      "price": 70,
      "color": "Blanco/Negro",
      "size": "38, 39, 40, 41",
      "stock": 25,
      "imageSrc": "../img/zapatilla_6.avif",
      "linkDetails": "/product/old-skool",
      "detalles": "Zapatilla urbana blanca, suela gruesa marrón y paneles superpuestos."
    },
    {
      "name": "Zapatillas Nike React Element 55",
      "price": 130,
      "color": "Gris/Amarillo",
      "size": "40, 41, 42, 43, 44",
      "stock": 18,
      "imageSrc": "../img/zapatilla_7.avif",
      "linkDetails": "/product/react-element-55",
      "detalles": "Zapatilla blanca, diseño bajo y cordones blancos."
    },
    {
      "name": "Zapatillas Jordan 1 Retro",
      "price": 200,
      "color": "Rojo/Blanco/Negro",
      "size": "42, 43, 44, 45",
      "stock": 6,
      "imageSrc": "../img/zapatilla_8.avif",
      "linkDetails": "/product/jordan-1-retro",
      "detalles": "Zapatillas deportivas azules con logo que simboliza la marca."
    },
    {
      "name": "Zapatillas Saucony Jazz Original",
      "price": 85,
      "color": "Azul/Gris",
      "size": "38, 39, 40, 41, 42",
      "stock": 20,
      "imageSrc": "../img/zapatilla_9.avif",
      "linkDetails": "/product/jazz-original",
      "detalles": "Zapatillas urbanas blancas con tonos rojos y de caña baja."
    },
    {
      "name": "Zapatillas Reebok Classic Leather",
      "price": 90,
      "color": "Blanco/Beige",
      "size": "40, 41, 42, 43",
      "stock": 10,
      "imageSrc": "../img/zapatilla_10.avif",
      "linkDetails": "/product/classic-leather",
      "detalles": "Zapatillas urbanas negras con cordones blancos de caña media."
    },
    {
      "name": "Zapatillas Under Armour HOVR Phantom",
      "price": 150,
      "color": "Negro/Gris",
      "size": "41, 42, 43, 44",
      "stock": 7,
      "imageSrc": "../img/zapatilla_11.avif",
      "linkDetails": "/product/hover-phantom",
      "detalles": "Zapatillas completamente negras de caña baja."
    }
  ];
