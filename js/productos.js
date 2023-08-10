//ITEM ES LA CLASE DE TODOS MIS PRODUCTOS
const CarritoTienda = document.querySelector(".comprar");
const ventanaContenedor = document.querySelector(".ventanaContenedor");
const cantidadDeProductos= document.getElementsByClassName("contar-productos")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//FUNCION PARA AGREGAR AL CARRITO UN PRODUCTO Y SUMARLO A LAS CANTIDADES SI ES EL MISMO PRODUCTO
const agregarAlCarrito=(producto)=>{
  const repetirProducto= carrito.some((productoRepetido)=>productoRepetido.id === producto.id)
    if (repetirProducto){
        carrito.map ((losProductos)=>{
        if (losProductos.id === producto.id){
                losProductos.cantidad++;
            } 
    });

    }else{
          carrito.push(producto);
    }
contadorDeProductos();

GuardadoEnlocal(); 
}

//FETCH

const getProductos =async () => {
try{
    const respuesta= await fetch ("https://daianaherrerasir.github.io/ProyectoFinal-HerreraSir/data/productos.json");
    const data = await respuesta.json();
    const items = document.getElementsByClassName("item");
    

    // RECORRO LOS ELEMENTOS QUE HAY DENTRO DE MIS PRODUCTOS
Array.from(items).forEach((item, index) => {
  const producto = data[index];
  const productId= producto.id;
  const nombre= producto.nombre;
  const precio= producto.precio;
  const imagen= producto.imagen;

if (!isNaN(precio)) {
//AGREGE UN BOTON PARA AÑADIR AL CARRITO PRODUCTOS
    const botones = document.createElement("button");
    botones.innerText = "Agregar al carrito";
    botones.className = "botones";

  botones.addEventListener("click", () => {
      const productosParaAgregar = {
        id:productId,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1,
        
      };
  agregarAlCarrito(productosParaAgregar),
  //TOASTIFY PARA NOTIFICAR QUE SE AGREGO EL PRODUCTO
      Toastify({
        text: "Producto agregado",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #d1e7dd, #fff)",
          color: "#000"
          
        }
        }).showToast();
   
});
    
//AGREGO LOS BOTONES A MIS PRODUCTOS(CLASE ITEM)
 item.appendChild(botones);
    item.setAttribute("data-producto-id", producto.id);
  } else {
    console.log(`El precio "${precio}" no es un número válido.`);
  }
});
  } catch(error){
    return ("error al cargar los productos", error);
 }
};
getProductos()



//LOCALSTORAGE

const GuardadoEnlocal= () =>{
localStorage.setItem("carrito",JSON.stringify (carrito))
}


JSON.parse(localStorage.getItem("carrito"));





