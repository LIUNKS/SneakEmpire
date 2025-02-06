document.addEventListener('DOMContentLoaded', function() {
  recepcionDatos(mockProducts);
  comprar();
  //addEventListenerTrash();
});

//CLASES
class Calzado {
  constructor(name, price, color, size, stock, info, imageSrc, linkDetails) {
      this.name = name;          
      this.price = price;        
      this.color = color;       
      this.size = size;          
      this.stock = stock;   
      this.info = info;     
      this.imageSrc = imageSrc;  
      this.linkDetails = linkDetails;  
  }
}

function renderizarSlideCart() {
  const containerCard = document.getElementById('containerCard');
  containerCard.innerHTML = '';
  for (let i = 0; i < cartUser.length; i++) {
    let card = generateCard(
      cartUser[i].name, 
      cartUser[i].price, 
      cartUser[i].color, 
      cartUser[i].size, 
      cartUser[i].stock, 
      cartUser[i].imageSrc, 
      cartUser[i].linkDetails
    );
    insertSlideCard(card);
  }
  actualizarPrecioSlide()
}

function insertSlideCard(card) {
  const container = document.getElementById(`containerCard`)
  container.appendChild(card);
}

function actualizarPrecioSlide() {
  const precioTotal = document.getElementById('estimatedTotal');
  precioTotal.innerHTML = "S/ " + calcularPrecioTotal();
}

function renderizarCart() {
  const containerCard = document.querySelector('.containerCard');
  containerCard.innerHTML = '';
  recepcionDatos(mockProducts);
  comprar();
  for (let i = 0; i < cartUser.length; i++) {
    let card = generateCard(
      cartUser[i].name, 
      cartUser[i].price, 
      cartUser[i].color, 
      cartUser[i].size, 
      cartUser[i].stock, 
      cartUser[i].imageSrc, 
      cartUser[i].linkDetails
    );
    insertCard(card);
  }
  actualizarPrecioCart()
}

function insertCard(card) {
  const containerCard = document.querySelector('.containerCard');
  containerCard.appendChild(card);
}

function actualizarPrecioCart() {
  const precioTotal = document.querySelector('.precioTotal');
  console.log(cartUser)
  console.log(calcularPrecioTotal())
  precioTotal.innerHTML = "S/ " + calcularPrecioTotal();
}

let cartUser = [];
function addProduct(product, amount) {
  if(product.stock >= amount) {
    for (let i = 0; i < amount; i++) {
      cartUser.push(product);  
    } 
  }   
}

// Si amount recibe como parametro cero se procedera a borrar todo
function deleteProduct(product, amount) {
  if(amount === 0) {
    for (let i = 0; i < cartUser.length; i++) {
      if (cartUser[i].name === product.name && cartUser[i].color === product.color && cartUser[i].size === product.size) {
        cartUser.splice(indice[i], 1);      
      } 
    }
  }
  let indice = [];
  for (let i = 0; i < cartUser.length; i++) {
    if (cartUser[i].name === product.name && cartUser[i].color === product.color && cartUser[i].size === product.size) {
      indice.push(i);
    } 
  }
  if (indice.length >= amount) {
    for (let i = 0; i < indice.length; i++) {
      cartUser.splice(indice[i], 1);      
    }
  } else {
    console.error("no se puede borrar el prodcuto porque la cantidad que desea borrar execede el que hay en el carrito")
  }
}

function calcularPrecioTotal() {
  let precioTotal = 0;
  for (let i = 0; i < cartUser.length; i++) {
    precioTotal += cartUser[i].price;    
  }
  return precioTotal;
}

// ESTA FUNCION SIMULA QUE EL CLIENTE ESTA COMPRANDO
function comprar() {
  // -2 Porque no quiero que compre toda la tienda xd
  for (let i = 0; i < almacen.length -2; i++) {
    addProduct(almacen[i],1);
  }
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
/*
function addEventListenerTrash() {
  const buttonTrash = document.querySelector(`.deleteButton`);
  console.log("A")

  if (buttonTrash) {    
    console.log("A")

    buttonTrash.addEventListener(`click`, () => {
      console.log("A")
      for (let i = 0; i < buttonTrash.classList.length; i++) {
        console.log(i)
        buttonTrash.classList[i]
        
      }
      //let product = new Calzado();
      //deleteProduct(product, 0);
      //renderizarCart();
      //renderizarSlideCart();
    });
  } else {
    console.error('No se encontró el botón de eliminar');
  }
}*/

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
  addEventListenerClose();
}

function addEventListenerClose() {
  const nav = document.getElementById(`slideCart`)
  const buttonClose = document.getElementById(`buttonCloseSlide`);
  buttonClose.addEventListener(`click`, () => {
      nav.style.visibility = `hidden`;
  })
} 

let almacen = [];
// Como parametro recibe un json
function recepcionDatos(products) {
  for (let i = 0; i < products.length; i++) {
    let calzado = new Calzado(
      products[i].name, 
      products[i].price, 
      products[i].color, 
      products[i].size, 
      products[i].stock, 
      products[i].info, 
      products[i].imageSrc, 
      products[i].linkDetails)

      almacen.push(calzado);
  }
}

// SIMULACION DE BASE DE DATOS
const mockProducts = [
    {
      "name": "Zapatillas Air Max 97",
      "price": 120,
      "color": "Blanco/Plata",
      "size": "42, 43, 44, 45",
      "stock": 10,
      "imageSrc": "../img/zapatilla_1.avif",
      "linkDetails": "",
      "info": "Parte superior de piel resistente con velcros y de color blanco.",
    },
    {
      "name": "Zapatillas Nike Air Force 1",
      "price": 100,
      "color": "Negro/Blanco",
      "size": "40, 41, 42, 43",
      "stock": 15,
      "imageSrc": "../img/zapatilla_2.avif",
      "linkDetails": "",
      "info": "Zapatilla Adidas Samba negra con detalles blancos y suela de goma.",
    },
    {
      "name": "Zapatillas Adidas Ultraboost",
      "price": 180,
      "color": "Azul/Blanco",
      "size": "41, 42, 43, 44",
      "stock": 5,
      "imageSrc": "../img/zapatilla_3.avif",
      "linkDetails": "",
      "info": "Zapatilla deportiva en tonos grises con suela beige y detalles blancos."
    },
    {
      "name": "Zapatillas Puma RS-X3",
      "price": 95,
      "color": "Rojo/Negro",
      "size": "40, 41, 42, 44, 45",
      "stock": 8,
      "imageSrc": "../img/zapatilla_4.avif",
      "linkDetails": "",
      "info": "Calzado deportivo negro con suela de goma marrón y diseño minimalista.",
    },
    {
      "name": "Zapatillas New Balance 990v5",
      "price": 160,
      "color": "Gris/Negro",
      "size": "42, 43, 44, 45",
      "stock": 12,
      "imageSrc": "../img/zapatilla_5.avif",
      "linkDetails": "",
      "info": "Zapatilla urbana verde y negra y detalles en paneles superpuestos."
    },
    {
      "name": "Zapatillas Vans Old Skool",
      "price": 70,
      "color": "Blanco/Negro",
      "size": "38, 39, 40, 41",
      "stock": 25,
      "imageSrc": "../img/zapatilla_6.avif",
      "linkDetails": "",
      "info": "Zapatilla urbana blanca, suela gruesa marrón y paneles superpuestos."
    },
    {
      "name": "Zapatillas Nike React Element 55",
      "price": 130,
      "color": "Gris/Amarillo",
      "size": "40, 41, 42, 43, 44",
      "stock": 18,
      "imageSrc": "../img/zapatilla_7.avif",
      "linkDetails": "",
      "info": "Zapatilla blanca, diseño bajo y cordones blancos."
    },
    {
      "name": "Zapatillas Jordan 1 Retro",
      "price": 200,
      "color": "Rojo/Blanco/Negro",
      "size": "42, 43, 44, 45",
      "stock": 6,
      "imageSrc": "../img/zapatilla_8.avif",
      "linkDetails": "",
      "info": "Zapatillas deportivas azules con logo que simboliza la marca."
    },
    {
      "name": "Zapatillas Saucony Jazz Original",
      "price": 85,
      "color": "Azul/Gris",
      "size": "38, 39, 40, 41, 42",
      "stock": 20,
      "imageSrc": "../img/zapatilla_9.avif",
      "linkDetails": "",
      "info": "Zapatillas urbanas blancas con tonos rojos y de caña baja."
    },
    {
      "name": "Zapatillas Reebok Classic Leather",
      "price": 90,
      "color": "Blanco/Beige",
      "size": "40, 41, 42, 43",
      "stock": 10,
      "imageSrc": "../img/zapatilla_10.avif",
      "linkDetails": "",
      "info": "Zapatillas urbanas negras con cordones blancos de caña media."
    },
    {
      "name": "Zapatillas Under Armour HOVR Phantom",
      "price": 150,
      "color": "Negro/Gris",
      "size": "41, 42, 43, 44",
      "stock": 7,
      "imageSrc": "../img/zapatilla_11.avif",
      "linkDetails": "",
      "info": "Zapatillas completamente negras de caña baja."
    }
  ];
