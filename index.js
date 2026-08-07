//Array globales
const sabores = [
  { id: "sab-1", sabor: "Chocolate", descripcion: "Clásico helado de chocolate cremoso.", imagen: "./assets/chocolate.jpg" },
  { id: "sab-2", sabor: "Frutilla", descripcion: "Helado de frutilla con leche.", imagen: "./assets/frutilla.jpg" },
  { id: "sab-3", sabor: "Crema", descripcion: "Helado suave y delicado, perfecto para combinar.", imagen: "./assets/crema.jpg" },
  { id: "sab-4", sabor: "Dulce de leche", descripcion: "Nuestro clásico más pedido.", imagen: "./assets/dulce-de-leche.jpg" },
  { id: "sab-5", sabor: "Limón", descripcion: "Sabor ácido y fresco, ideal para el verano.", imagen: "./assets/limon.jpg" },
  { id: "sab-6", sabor: "Frutilla al agua", descripcion: "Refrescante y liviano, sin leche.", imagen: "./assets/frutilla-agua.jpg" }
];
const presentaciones = [
  { id: "opt-1", opcion: "una bocha", precio: 120, sabores: 1, presentacion: "cucurucho", imagen:"./assets/unaBocha.jpg"},
  { id: "opt-2", opcion: "dos bochas", precio: 180, sabores: 2, presentacion: "cucurucho", imagen:"./assets/dosBochas.jpg"},
  { id: "opt-3", opcion: "tres bochas", precio: 240, sabores: 3, presentacion: "vaso", imagen:"./assets/tresBochas.jpg"},
  { id: "opt-4", opcion: "cuarto kilo", precio: 180, sabores: 1, presentacion: "vaso", imagen:"./assets/cuartoKilo.jpg"},
  { id: "opt-5", opcion: "medio kilo", precio: 300, sabores: 2, presentacion: "vaso", imagen:"./assets/medioKilo.jpg"},
  { id: "opt-6", opcion: "un kilo", precio: 600, sabores: 3, presentacion: "vaso", imagen:"./assets/kilo.jpg"}
];
//Se inicializan las funciones 
document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
});
//Funcion plantilla para mostrar el modal
function mostrarModal(mensaje) {
  const divContenido = document.getElementById("contenido-modal");
  const divOverlay = document.getElementById("overlay-confirmacion");
  divContenido.innerHTML = `
    <p>${mensaje}</p>
    <button type="button" id="btn-cerrar-confirmacion" aria-label="aceptar la informacion y cerrar cartel informativo">Aceptar</button>
  `
  divOverlay.classList.add("active")
}
//Funcion para crear cada card de la lista de sabores
function templateSabores(array) {
  let templateListaSabores = "";
  array.forEach(element => {
    const {sabor, imagen, descripcion} = element
    templateListaSabores += ` 
           <div class="card" data-sabor = "${sabor}">
             <h3>${sabor}</h3>
             <img src=${imagen} alt='helado artesanal de ${sabor}'>
             <p class="descripcion">${descripcion}</p>
             <button type="button" class= "btn-presentaciones" aria-label="Ver y elegir presentacion">Ver presentaciones</button>
           </div>
           `
  });
  document.getElementById("lista-sabores").innerHTML = templateListaSabores;
}
//Funcion para crear cada card de la lista de tipos de presentaciones
function templatePresentaciones(array) {
  let templateListaPresentaciones = "";
  array.forEach(element => {
    const { precio, presentacion, imagen, sabores, opcion} = element
    templateListaPresentaciones += ` 
           <div class="card" data-presentacion = "${opcion}">
             <h3>${presentacion}</h3>
             <img src=${imagen} alt='Presentacion de compra de ${opcion}'>
             <p class="descripcion">Con capacidad de elegir sabores hasta: ${sabores}</p>
             <button type="button" class= "btn-carrito" aria-label="Agregar al carrito">Agregar al carrito</button>
           </div>
           `
  });
  document.getElementById("lista-presentaciones").innerHTML = templateListaPresentaciones;
}
//Funcion: logica para fitrar por rango min y max de precio 
function filtrarPorPrecio(min, max, array) {
  //primer validacion: si los valores ingresados no son numeros, se muestra un alert y se corta la ejecucion de la funcion
  if (isNaN(min) || isNaN(max)) return
  //segunda validacion: si el valor minimo es mayor que el maximo, se muestra un alert y se corta la ejecucion de la funcion
  if (min > max || max == 0) return
  //logica de filtrado: se filtra el array de helados por precio, devolviendo un nuevo array con los elementos que cumplen la condicion
  return array.filter(element => element.precio >= min && element.precio <= max);
}
//Funcion dedicada a la escucha de eventos
function configurarEventos() {
  //Evento: filtrado de productos por rango
  document.getElementById("btn-sabores")?.addEventListener("click", () => templateSabores(sabores));
  let inputMin = document.querySelector("#inp-min")
  let inputMax = document.querySelector("#inp-max")
  document.querySelector("#form-filtrar").addEventListener("submit", (e) => {
    e.preventDefault()
    let valorMinimo = Number(inputMin.value)
    let valorMaximo = Number(inputMax.value)
    let resultadoFiltrado = filtrarPorPrecio(valorMinimo, valorMaximo, presentaciones)
    if (resultadoFiltrado?.length > 0) {
      templatePresentaciones(resultadoFiltrado)
      inputMax.value = "";
      inputMin.value = "";
    } else {
      mostrarModal("Lo sentimos, no contamos con helados en ese rango establecido")
      inputMax.value = "";
      inputMin.value = "";
    }
  });
  //Evento: busqueda por sabor
  document.getElementById("form-busqueda").addEventListener("submit", (e) => {
    e.preventDefault()
    let inputBusqueda = document.getElementById("inp-busqueda");
    let inputValor = inputBusqueda.value.trim().toLowerCase(); //minusculas y sin espacios al incio y al final
    const saborEncontrado = sabores.find(s => s.sabor.toLowerCase().includes(inputValor)); // buscar por nombre exacto o fragmento de la palabra/nombre del sabor
    let divResultadoBusqueda = document.getElementById("resultado-busqueda");
    //operador ternario: valor input coincide con algun elemento del array
    divResultadoBusqueda.innerHTML = saborEncontrado ? `
    <p>¡Sí contamos con ${saborEncontrado.sabor} descubre la variedad de presentaciones con las que contamos!</p>
    <button type="button" class= "btn-presentaciones" aria-label="Ver y elegir presentacion">Ver presentaciones</button>
    ` : `
    <p>Lo sentimos, ese sabor no está disponible.</p>
    `;
    inputBusqueda.value = "";
  });
  //evento del nav -> anchor presentaciones | y  del boton ver presentaciones en las card sabores
  document.addEventListener("click", (e)=>{
    if(e.target.id === "a-presentaciones" || e.target.classList.contains("btn-presentaciones") ){
      templatePresentaciones(presentaciones)
       document.getElementById("opciones").classList.add("active")
       window.location.href = "index.html#opciones"
      }
    });
    // Cerrar modal al hacer clic en "Aceptar" 
  document.addEventListener("click", (e) => {
  if (e.target.id === "btn-cerrar-confirmacion" || e.target.id === "overlay-confirmacion") {
    document.getElementById("overlay-confirmacion").classList.remove("active");
  }
  });
  }
  /*
  Pendiente: 
  0 . Funcionalidad anchor "Inicio" del nav -> Resetear/refrescar la vista inicial sin perder los datos en memoria
  1-  Al hacer clic en "agregar al carrito" sobre una presentación, abrir el modal mostrando la lista de sabores, y establecer el limite permitidos según presentaciones.sabores de esa presentación y dar al usuario la opción(boton) de "Seguir comprando" o "Finalizar pedido".
   2- Manejar la lógica de boton nav "carrito", actualizar la vista del carrito

  */
  
  /* 
  Apuntes personales -> aprendizaje tecnico
  Delegacion de Eventos / Burbujeo -> event bubbling.

   Se escucha el evento globalmente en 'document' para evitar fugas de memoria y poder manejar elementos dinamicos (se agregan o quitan del DOM)
    - validacion -> por clase (classList.contains) o id (.id ===) : que sea el elemento boton que se clicke
    - e.taget -> identifica el elemento que dispara el evento (ej: en que el usuario hacer click
   */
  