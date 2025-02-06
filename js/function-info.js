// Función para mostrar la información del producto
function mostrarProducto(producto) {
    //Devuelve el primer elemento del documento (info.html)
    const imagenProducto = document.querySelector(".image-section img");
    const nombreProducto = document.querySelector(".detalles h1");
    const precioProducto = document.querySelector(".detalles .price");
    const categoriaProducto = document.querySelector(".detalles h6");
    const codigoProducto = document.querySelector(".detalles h6:nth-of-type(2)");
    const descripcionProducto = document.querySelector(".descripcion b");
    const detallesProducto = document.querySelector(".descripcion ul");

    imagenProducto.src = producto.imagen;
    nombreProducto.textContent = producto.nombre;
    //${} Valor dinamico
    precioProducto.textContent = `S/. ${producto.precio.toFixed(2)}`;
    //Cambia contenido HTML de un elemento
    categoriaProducto.innerHTML = `<font color="gray">${producto.categoria}</font>`;
    codigoProducto.innerHTML = `<font color="gray">${producto.codigo}</font>`;
    descripcionProducto.textContent = producto.descripcion;

    detallesProducto.innerHTML = "";
    
    
    //Recorre cada elemento de un arreglo y ejecutar una funcion para cada uno
    producto.detalles.forEach(detalle => {
        const li = document.createElement("li");
        li.textContent = detalle;
        //Agrega un nodo al final de la lista
        detallesProducto.appendChild(li);
    });
}

