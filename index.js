//Array de sabores 
const helados = [
  {sabor:"Chocolate", descripcion:"Clásico helado de chocolate cremoso.", precio:"140", imagen:"/assets/chocolate.jpg"},
   {sabor:"Frutilla", descripcion:"Helado de frutilla con leche.", precio:"140", imagen:"/assets/frutilla.jpg"}, 
   {sabor:"Crema", descripcion:"Helado suave y delicado, perfecto para combinar.", precio:"140", imagen:"/assets/crema.jpg"}, 
   {sabor:"Dulce de leche", descripcion:"Nuestro clásico más pedido.", precio:"150", imagen:"/assets/dulce-de-leche.jpg"}, 
   {sabor:"Limón", descripcion:"Sabor ácido y fresco, ideal para el verano.", precio:"120", imagen:"/assets/limon.jpg"}, 
   {sabor:"Frutilla al agua", descripcion:"Refrescante y liviano, sin leche.", precio:"120", imagen:"/assets/frutilla-agua.jpg"}
];
//Se inicializan las funciones 
document.addEventListener("DOMContentLoaded", ()=>{
    showResultadoBusqueda();
    showLista();
  });
//Funcion que cea cada card con data  almacenada en el array
//DOM:funcionalidad del boton para mostrar cada card
function showLista(){
  document.getElementById("btn-sabores").addEventListener("click", ()=>{
    let templateListaSabores = "";
    helados.forEach(helado => {
         templateListaSabores += ` 
           <div class="card-sabor" data-sabor = "${helado.sabor}" data-precio ="${helado.precio}">
             <h3>${helado.sabor}</h3>
             <img src=${helado.imagen} alt="Helado artesanal">
             <p class="descripcion">${helado.descripcion}</p>
             <p class="precio">${helado.precio}</p>
             <button type="button" class="btn-comprar">Comprar</button>
           </div>
           `
          });
           document.getElementById("lista-sabores").innerHTML = templateListaSabores;
           confirmarEleccion(); //funcionalidad boton comprar
      });
};

//Funcion para mostrar resultado de la busqueda, si se tiene el sabor consultado
function showResultadoBusqueda(){
    //DOM
    let formBusqueda = document.getElementById("form-busqueda");
    let divResultadoBusqueda = document.getElementById("resultado-busqueda");
    let inputBusqueda = document.getElementById("inp-busqueda");
    
    formBusqueda.addEventListener("submit", (e)=> {
      e.preventDefault()
        let inputValor = inputBusqueda.value.toLowerCase(); //minusculas para comparar
        const saborEncontrado = helados.find(helado => helado.sabor.toLowerCase() === inputValor);
        //operador ternario: valor input coincide con algun elemento del array
        divResultadoBusqueda.innerHTML = saborEncontrado ? `<p>¡Sí contamos con ${saborEncontrado.sabor} a tan solo ${saborEncontrado.precio}! </p>` : `<p>Lo sentimos, ese sabor no está disponible.</p>`;
        inputValor = "";
    });
};

//Muestra la confirmacion de la compra
function confirmarEleccion(){
    //selecciona todos los botones comprar de cada tarjeta
    //DOM
    let btnsComprar = document.querySelectorAll(".btn-comprar");
    let divContenido = document.getElementById("contenido-modal");
    let overlay = document.getElementById("overlay-confirmacion");

    btnsComprar.forEach(btn => {
      //funcionalidad a cada boton de comprar de cada tarjeta
      btn.addEventListener("click", ()=>{
        //Inyeccion de HTML 
        let tarjeta = btn.closest(".card-sabor"); 
        let sabor = tarjeta.dataset.sabor;
        let precio = tarjeta.dataset.precio;
        divContenido.innerHTML = `
        <p>Tu elección: <strong>${sabor}</strong>. Precio: <strong>${precio}</strong>.</p>
        <p>¡Compra realizada con éxito! 🍨</p>
        <button type="button" id="btn-cerrar-confirmacion">Aceptar</button>
        `;
        //agrega la clase de css para mostrar el modal
        overlay.classList.add("active");
        // se quita la clase con el boton de aceptar
        document.getElementById("btn-cerrar-confirmacion").addEventListener("click", ()=>{
        overlay.classList.remove("active");
      });
      });
    });
};