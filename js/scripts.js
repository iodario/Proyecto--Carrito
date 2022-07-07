import {createBootstrapCard} from "./cards.js";
import {getAllProducts, getProductById, APIURL} from "./fetch.js";

//Atajo para el método querySelector
const $ = (selector) => document.querySelector(selector);
const domElements = {
  productsContainer: $("#cards-container"),
};

const renderProducts = (products = []) => {
  //Primero reviso si mi parámetro es un array. Si no lo es, lanzo un error.
  //Aunque por default le puse que me parámetro sea un array, puede ser que no sea un array y me de el error.
  if (!Array.isArray(products)) {
    console.error("El parametro products debe ser un array");
    return;
  }

  //Si es un array, genial, voy a verificar que no este vacio y sino lanzo un error.
  //Esto es una forma de validar que el array no este vacio y solo lo verifico si ya previamente valide que fuera un array.
  if (products.length === 0) {
    console.error("No hay productos para mostrar");
    return;
  }

  //Si es un array y no esta vacio, voy a recorrer el array y voy a crear una tarjeta para cada producto.
  products.forEach((product) => {
    const result = createBootstrapCard(product);
    domElements.productsContainer.appendChild(result);
  });
  return;
};

//Funcion anónima que se auto-ejecuta. Esta bueno para una funcion que no necesita parámetros y es inicializadora de la app.

(() => {
  fetch(APIURL)
    .then((response) => response.json())
    .then((data) => {
      renderProducts(data);
      console.log(data);
    })
    .catch((err) => console.error(err));
})();

//Si llegamos por tiempos... aca algun ejemplo mas de fetch e ideas:

// const productsArray = (await getAllProducts()) || [];

// renderProducts(productsArray);

// const producto = await getProductById(1);

// renderProducts([producto]);
