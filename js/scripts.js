import { crearTarjeta } from "./tarjetas.js";
import { getAllProducts, getProductById, APIURL, fetchAPI } from "./fetch.js";

//declaracion variables y constantes, inicializaciones.

let carrito = []
let productos = {}
let cantproduc = 0;
const templateCarrito = document.getElementById('template-carrito').content;
let btnCarrito = document.getElementById('cantCarrito');
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById('template-footer').content;
const items = document.getElementById('items');


//obtenemos elementos del Dom y los guardamos en un objeto
const domElements = {
    productsContainer: document.querySelector('#cards-container')
};

//funcion que renderiza la pagina y carga los productos
const renderProducts = (products = []) => {

    // Primero reviso si mi parámetro es un array. Si no lo es, lanzo un error.
    // Aunque por default le puse que me parámetro sea un array, puede ser que no sea un array y me de el error.
    if (!Array.isArray(products)) {
        console.error("El parametro products debe ser un array");
        return;
    }

    //Verificar que el array no este vacio.
    //Esto es una forma de validar que el array no este vacio y solo lo verifico si ya previamente valide que fuera un array.
    if (products.length === 0) {
        console.error("No hay productos para mostrar");
        domElements.productsContainer.innerHTML = "";
        return;
    }
    console.log(products);
    domElements.productsContainer.innerHTML = "";
    //Si es un array y no esta vacio, voy a recorrer el array y voy a crear una tarjeta para cada producto.
    products.forEach((product) => {
        const result = crearTarjeta(product);
        domElements.productsContainer.appendChild(result);
    });
    return;
};

//Funcion anónima que se auto-ejecuta. Esta bueno para una funcion que no necesita parámetros y es inicializadora de la app.

(() => {

    fetch(APIURL)
        .then((response) => response.json())
        .then((data) => {
            productos = data;
            renderProducts(data);
            // console.log(data);
        })
        .catch((err) => console.error(err));
})();


//paso 2) utilizamos DOMContentLoaded cuando toda la pagina esta cargada 
document.addEventListener('DOMContentLoaded', () => {
    let data = fetchAPI(APIURL);
    //if (localStorage.getItem('carrito')) {       //11-a) si existe dentro del localStorage una clave 'carrito'
    // carrito = JSON.parse(localStorage.getItem('carrito'));   //asignar a carrito, el parse a Objeto de localStorage.getItem
    renderProducts(data);                          //mostrar carrito en el Dom
}
)


domElements.productsContainer.addEventListener('click', (e) => {
    addCarrito(e)
    Swal.fire('Producto agregado con exito')
})


const addCarrito = e => {
    // console.log(e.target)    
    // console.log(e.target.classList.contains('btn-dark'))     // valida si el elemento contiene la propiedad que pasamos por parametro
    if (e.target.classList.contains('btn-outline-dark')) {   //detectamos el boton y utilizamos el producto.id
        // console.log(e.target.parentElement) //parentElement me muestra el elemento padre, en este caso el div padre
        setCarrito(e.target.id);
    }
    e.stopPropagation()   //detenemos la propagacion del evento 

}


function setCarrito(id) {
    let productoSeleccionado = productos.find(element => element.id == id);

    let producto = {
        id: productoSeleccionado.id,   //identifica el id del elemento clickeado
        title: productoSeleccionado.title,     // el ttulo
        precio: productoSeleccionado.price,       // el precio
        cantidad: 1                                            // la cantidad la dejamos en 1, luego aumentara
    }

    //4-e) aumentar el numero de productos en el carrito, al presionar Comprar       //Carrito es toda nuestra coleccion de objetos. Estamos accediendo sólo al elemento que se está repitiendo. Una vez que accedemos, accedemos solamente a la cantidad, y la aumentamos en 1. Si este producto no exixte, por defecto la cantidad sera 1. 
    if (carrito.hasOwnProperty(producto.id)) {
        console.log(producto);
        producto.cantidad = carrito[producto.id].cantidad + 1

    }
    cantproduc += 1;
    //una vez que tenemos el objeto tenemos que pushearlo al carrito. Estamos haciendo una coleccion de objetos indexados. 
    carrito[producto.id] = { ...producto }    //spread operator, aqui estamos haciendo una 'copia' de producto
    pintarCarrito();
}

const pintarCarrito = () => {
    console.log(btnCarrito)
    btnCarrito.textContent = cantproduc;
    items.innerHTML = ' '    //5-d) items debe partir vacio por cada vez que ejecutamos pintar Carrito(0)

    carrito.forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id  //editando contenido de tag 'th'
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        //clonando el carrito, utilizamos el fragment
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone);   // ?
    })
    // 5-c)Pintamos la informacion
    items.appendChild(fragment)

    pintarFooter()   //6)

    //localStorage.setItem('carrito',JSON.stringify(carrito))    //11-b)
}




// 6)template-footer
// 6-a) generamos los template, vamos a buscar el id guardado
const pintarFooter = () => {
    footer.innerHTML = ''    //iniciamos footer en 0
    //debemos preguntar si nuetro carrito esta vacio, si es true entra el if:

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = ` <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return   //no olvidar return para que se salga de la funcion
    }
    //7) si no esta vacio pintamos footer, sumando cantidades y totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)    //este acumuldador, por cada iteracion va a ir acumulando lo que nosotros hagamos como suma
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    console.log(nPrecio)
    // console.log(nCantidad)

    //8) pintamos la ultima funcionalidad en el footer(suma de cantidades y totales)
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    //9) Evento vaciar carrito
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = [];
        cantproduc = 0;   //vaciamos el objeto carrito
        pintarCarrito();
    })
}

var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('comprar')

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
    alertTrigger.addEventListener('click', function () {
        alert('Nice, you triggered this alert message!', 'success')
    })
}

function buscar(q) { // FILTRA LOS PRODUCTOS POR EL PARAMENTRO q

    let resultado = productos.filter(producto => producto.title.toLowerCase().includes(q.toLowerCase()));

    renderProducts(resultado);
}

//BUSCADOR
document.querySelector('#buscar').addEventListener('keyup', () => {

    let q = document.querySelector('#buscar').value;

    if (q.length >= 2) { // FILTRA CUANDO HAY AL MENOS DOS LETRAS EN EL BUSCADOR


        buscar(q);

    } else if (q.length === 0) {

        // SI NO HAY PARAMETRO DE FILTRO MUESTRA TODOS LOS PRODUCTOS        

        renderProducts(productos);
    }

})


//5-a) creamos evento para capturar click de botones de aumentar y disminuir  //no se por que lo saco de items
items.addEventListener('click', (e) => {
    btnAccion(e)
})
//10) botones aumentar y disminuir cantidad. Usaremos Event Delegation
//10-a) buscamos los id de los botones y vemos donde se guardaron  b)creamos funcion de accion
const btnAccion = e => {
    console.log(e.target)  //vemos la info de los elementos en consola al presionar cualquier cosa 
    //Accion de aumentar
    if (e.target.classList.contains('btn-info')) {    //utilizamos objetos indexados
        console.log(carrito[e.target.dataset.id])    //esto que sale en console.log lo asigno a const producto
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++ // aumentamos la cantidad en 1.
        // ahora decimos 'este carrito' , en su id, va a ser una 'copia' de producto
        carrito[e.target.dataset.id] = { ...producto }    //con esto se van agregando elementos a productos

        pintarCarrito();
    }

    //Accion de disminuir
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        //cuando la cantidad sea 0, eliminar el elemento 
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito();
    }
    e.stopPropagation();
}














