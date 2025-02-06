
// Función para mostrar la información del producto
function mostrarProducto(producto) {
    const imagenProducto = document.querySelector(".image-section img");
    const nombreProducto = document.querySelector(".detalles h1");
    const precioProducto = document.querySelector(".detalles .price");
    const categoriaProducto = document.querySelector(".detalles h6");
    const codigoProducto = document.querySelector(".detalles h6:nth-of-type(2)");
    const descripcionProducto = document.querySelector(".descripcion b");
    const detallesProducto = document.querySelector(".descripcion ul");

    imagenProducto.src = producto.imagen;
    nombreProducto.textContent = producto.nombre;
    precioProducto.textContent = `S/. ${producto.precio.toFixed(2)}`;
    categoriaProducto.innerHTML = `<font color="gray">${producto.categoria}</font>`;
    codigoProducto.innerHTML = `<font color="gray">${producto.codigo}</font>`;
    descripcionProducto.textContent = producto.descripcion;

    detallesProducto.innerHTML = "";
    
    producto.detalles.forEach(detalle => {
        const li = document.createElement("li");
        li.textContent = detalle;
        detallesProducto.appendChild(li);
    });
}

