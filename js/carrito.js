
const detalleDelCarrito = () =>{
//VENTANA DONDE APARECE EL CARRITO CON LOS PRODUCTOS
    ventanaContenedor.innerHTML= ""
    ventanaContenedor.style.display="flex"
const ventanaCarrito = document.createElement("div");
ventanaCarrito.className = "ventana-carrito";
ventanaCarrito.innerHTML = '<h1 class="ventana-titulo">Carrito</h1>';

ventanaContenedor.append(ventanaCarrito);
//BOTON DEL CIERRE DEL LA VENTANA DE CARRITO

const ventanaBoton = document.createElement("span");
ventanaBoton.innerText =  "✖️";
ventanaBoton.className = "ventana-boton";

ventanaBoton.addEventListener("click",() =>{
    ventanaContenedor.style.display= "none"
});

ventanaCarrito.append(ventanaBoton);

//MUESTRO CARRITO VACIO SI NO HAY PRODUCTOS
if (carrito.length === 0) {
        const carritoVacio = document.createElement("div");
        carritoVacio.className = "ventana-contenedor-";
        carritoVacio.innerHTML = `<h2>Carrito vacío</h2>`;
        ventanaContenedor.append(carritoVacio);
    } else {
        
//EL CONTENIDO DEL CARRITO
carrito.forEach(producto => {
    const contenidoDelCarrito = document.createElement("div");
    contenidoDelCarrito .className = "ventana-contenedor";
    contenidoDelCarrito .innerHTML = `
    <img class="imagen" src="${producto.imagen}" alt="${producto.nombre}">
    <h3 class="nombre">${producto.nombre}</h3>
    <p class= "precio">$ ${producto.precio}</p>
    <button class="restar"> - </button>
    <p class= "cantidad"> ${producto.cantidad}</p>
    <button class="sumar"> + </button>
    <button class= "eliminar"> Eliminar </button>
    <p class= "total"> total: $ ${producto.cantidad * producto.precio}</p>
    
    `;

ventanaContenedor.append(contenidoDelCarrito );


//BOTON  RESTAR CANTIDADES
let restar = contenidoDelCarrito.querySelector(".restar");

restar.addEventListener("click", () => {
    if(producto.cantidad !== 1){
    producto.cantidad --;
}

actualizarCarrito();

});
//BOTON DE SUMAR CANTIDADES

let sumar = contenidoDelCarrito.querySelector(".sumar");
sumar.addEventListener("click", () => {
    producto.cantidad ++;
    actualizarCarrito()

});

/*BOTON PARA ELIMINAR PRODUCTOS*/ 

 let eliminar = contenidoDelCarrito.querySelector(".eliminar");

 eliminar.addEventListener("click", ()=>{
    eliminarPorductos(producto.id)

 });
});




/*TOTAL DE LOS PRODUCTOS*/
const total = carrito.reduce((acc, el) => acc + parseFloat(el.precio)* el.cantidad, 0);

const TotalProductos = document.createElement("div");
TotalProductos.className = "total-productos";
TotalProductos.innerHTML = `Total: $${total.toFixed(2)}`;

ventanaContenedor.append(TotalProductos);

}};


CarritoTienda.addEventListener("click",  detalleDelCarrito);


//FUNCION PARA ELIMINAR LOS PRODUCTOS DEL CARRITO
const eliminarPorductos = (id) => {
    const encontrarId = carrito.find((elemento) => elemento.id === id);
// SWEETALERT
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará el producto del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
     
    if (result.isConfirmed) {
        carrito = carrito.filter((carritoId) => carritoId !== encontrarId);
        actualizarCarrito();
    } else {

    }
    });


actualizarCarrito()
};
//CONTADOR DE PRODUCTOS 

const contadorDeProductos = () => {
    const cantidadDeProductos = document.getElementsByClassName("contar-productos")[0];

    cantidadDeProductos.style.display = "block";

    const carritoLength= carrito.length; 
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadDeProductos.innerHTML = JSON.parse(localStorage.getItem("carritoLength"))
} 

contadorDeProductos();



//FUNCION PARA ACTUALIZAR CARRITO
const actualizarCarrito = () =>{
    GuardadoEnlocal();
    detalleDelCarrito();
    contadorDeProductos();
};
