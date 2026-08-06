//Array de sabores 
const helados = [
  { sabor: "Chocolate", descripcion: "Clásico helado de chocolate cremoso.", precio: 140, imagen: "./assets/chocolate.jpg" },
  { sabor: "Frutilla", descripcion: "Helado de frutilla con leche.", precio: 140, imagen: "./assets/frutilla.jpg" },
  { sabor: "Crema", descripcion: "Helado suave y delicado, perfecto para combinar.", precio: 140, imagen: "./assets/crema.jpg" },
  { sabor: "Dulce de leche", descripcion: "Nuestro clásico más pedido.", precio: 150, imagen: "./assets/dulce-de-leche.jpg" },
  { sabor: "Limón", descripcion: "Sabor ácido y fresco, ideal para el verano.", precio: 120, imagen: "./assets/limon.jpg" },
  { sabor: "Frutilla al agua", descripcion: "Refrescante y liviano, sin leche.", precio: 120, imagen: "./assets/frutilla-agua.jpg" }
];
//Se inicializan las funciones 
document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
});
function mostrarModal(mensaje) {
  const divContenido = document.getElementById("contenido-modal");
  const divOverlay = document.getElementById("overlay-confirmacion");

  divContenido.innerHTML = `
    <p>${mensaje}</p>
    <button type="button" id="btn-cerrar-confirmacion">Aceptar</button>
  `
  divOverlay.classList.add("active")
}
function templateLista(array) {
  let templateListaSabores = "";
  array.forEach(element => {
    templateListaSabores += ` 
           <div class="card-sabor" data-sabor = "${element.sabor}" data-precio ="${element.precio}">
             <h3>${element.sabor}</h3>
             <img src=${element.imagen} alt="Helado artesanal">
             <p class="descripcion">${element.descripcion}</p>
             <p class="precio">${element.precio}</p>
             <button type="button" class="btn-comprar">Comprar</button>
           </div>
           `
  });
  document.getElementById("lista-sabores").innerHTML = templateListaSabores;
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
  document.getElementById("btn-sabores")?.addEventListener("click", () => templateLista(helados));
  let inputMin = document.querySelector("#inp-min")
  let inputMax = document.querySelector("#inp-max")
  document.querySelector("#btn-filtrar").addEventListener("click", (e) => {
    e.preventDefault()
    let valorMinimo = Number(inputMin.value)
    let valorMaximo = Number(inputMax.value)
    let resultadoFiltrado = filtrarPorPrecio(valorMinimo, valorMaximo, helados)
    if (resultadoFiltrado?.length > 0) {
      templateLista(resultadoFiltrado)
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
    const saborEncontrado = helados.find(helado => helado.sabor.toLowerCase() === inputValor);
    let divResultadoBusqueda = document.getElementById("resultado-busqueda");
    //operador ternario: valor input coincide con algun elemento del array
    divResultadoBusqueda.innerHTML = saborEncontrado ? `<p>¡Sí contamos con ${saborEncontrado.sabor} a tan solo ${saborEncontrado.precio}! </p>` : `<p>Lo sentimos, ese sabor no está disponible.</p>`;
    inputValor = "";
  });
  // Eventos: Comprar y Cierre de Modal
  /* Delegacion de Eventos / Burbujeo -> event bubbling.
   Se escucha el evento globalmente en 'document' para evitar fugas de memoria y poder manejar elementos dinamicos (se agregan o quitan del DOM)*/
  document.addEventListener("click", (e) => {
     //validacion -> por clase (.contains) o id (.id ===) : que sea el elemento boton que se clickeo
    if (e.target.classList.contains("btn-comprar")) {
      //e.taget -> identifica el elemento que dispara el evento (ej: en que el usuario hacer click)
      const tarjeta = e.target.closest(".card-sabor");
      const { sabor, precio } = tarjeta.dataset;
      mostrarModal(`Tu elección: <strong>${sabor}</strong>. Precio: <strong>$${precio}</strong>.<br>¡Compra realizada con éxito! 🍨`);
    }
    if (e.target.id === "btn-cerrar-confirmacion") {
      document.getElementById("overlay-confirmacion").classList.remove("active");
    }
  });
}
