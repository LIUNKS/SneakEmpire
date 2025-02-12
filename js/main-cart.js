function updatePrice() {
  const precioTotal = document.querySelector('.precioTotal');
  precioTotal.innerHTML = "S/ " + calcularPrecioTotal();
}