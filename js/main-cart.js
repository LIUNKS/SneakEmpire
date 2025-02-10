
function insertCard(card) {
  const containerCard = document.querySelector('.containerCard');
  containerCard.appendChild(card);
}

function updatePrice() {
  const precioTotal = document.querySelector('.precioTotal');
  precioTotal.innerHTML = "S/ " + calcularPrecioTotal();
}