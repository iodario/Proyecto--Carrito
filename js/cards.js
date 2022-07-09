//Yo ya se que el content es un array de objetos  por que me lo dice la documentacion de la API
//Esta funcion crea una tarjeta para cada producto que me llega por parametro.
//Ademas tenemos todos los elementos de la card "modularizados" en pequeñas funciones. Esta funcion se encarga de "organizar" la tarjeta.
export const createBootstrapCard = (content = {}) => {
    // Reviso si el content no tiene propiedades y lanzo un error si es asi.
    if (Object.keys(content).length === 0) {
      console.error("No se puede crear una tarjeta sin contenido");
      return;
    }
  
    //Genero un numero random como review de estrellas.
    const stars = Math.random() * 5;
  
    // Desestructuro el contenido. Yo ya se como viene el contenido por que lo leo de la documentación de la API.
    const {id, title, price, category, description, image} = content;
  
    // Crear el elemento, el contenedor general del card
    const cardContainer = getCardContainter();
    cardContainer.setAttribute("id", id);
    // Creo el wrapper especifico para la card.
    const card = getCard();
    //Agrego el wrapper al contenedor del card
    cardContainer.appendChild(card);
    //Creo la imagen del producto
    const cardImg = getCardImg(image, title);
    card.appendChild(cardImg);
  
    //Creo el body, que esta misma funciona se encarga de llamar a las funciones que completan el body
    const cardBody = getCardBody(title, price, description, stars);
    card.appendChild(cardBody);
  
    const cardFooter = getCardFooter(id);
    card.appendChild(cardFooter);
  
    return cardContainer;
  };
  
  const getCardContainter = () => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-lg-3","col-md-4" ,"col-sm-6" ,"px-2","mb-4");
  
    return cardContainer;
  };
  
  const getCard = () => {
    const card = document.createElement("div");
    card.classList.add("card","h-100", "shadow-lg", "border-0");
  
    return card;
  };
  
  //Me devuelve un elemento image con sus atributos.
  const getCardImg = (imageUrl = "", imageAlt = "Nothing") => {
    //Si la imagen no tiene URL no quiero que haga nada. Lanzo un error por consola y retorno un elemento vacio.
    if (imageUrl === "") {
      console.error("No se puede crear una tarjeta sin imagen");
      return;
    }
  
    //Si no tiene alt, dejo que la funcion siga pero lanzo un warning.
    if (imageAlt === "Nothing") {
      console.warn(
        "Atención, una tarjeta sin atributo alt personalizado no es una buena práctica."
      );
    }
  
    const image = document.createElement("img");
    image.setAttribute("src", imageUrl);
    image.setAttribute("alt", imageAlt);
    image.classList.add("img-thumbnail","img-fluid");
    return image;
  };
  
  // Creo funcion que me devuelve el body. Desde aca voy a llamar a todas las funciones que me vallan armando el body entero.
  const getCardBody = (title, price, description, stars) => {
    if (!title) {
      console.error("No se puede crear una tarjeta sin titulo");
      return;
    }
  
    if (!price) {
      console.error("No se puede crear una tarjeta sin precio");
      return;
    }
  
    if (!description) {
      console.error("No se puede crear una tarjeta sin descripción");
      return;
    }
  
    if (!stars) {
      console.error("No se puede crear una tarjeta sin estrellas");
      return;
    }
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body","row");
  
    const cardTitle = getCardTitle(title);
    cardBody.appendChild(cardTitle);
  
    const cardPrice = getCardPrice(price);
    cardBody.appendChild(cardPrice); 

    const cardReviewsStars = getCardReviewsStars(stars);
    cardBody.appendChild(cardReviewsStars);
  
    return cardBody;
  };
  
  const getCardTitle = (title) => {
    if (!title) {
      console.error("No se puede crear un titulo sin un título.");
      return;
    }
  
    const cardTitleContainer = document.createElement("div");
    cardTitleContainer.classList.add();
  
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("fw-bolder","text-center", "align-middle","col");
    cardTitle.textContent = title;
    cardTitleContainer.appendChild(cardTitle);
  
    return cardTitleContainer;
  };
  
  const getCardPrice = (price) => {
    //Si no me llega ningun precio (puede ser undefined por ejemplo) lanzo error.
    if (!price) {
      console.error("No se puede crear un contenedor sin precio");
    }
  
    //Si me llega un precio, pero el número es negativo lanzo error.
    if (price < 0) {
      console.error("No se puede crear un precio negativo");
    }
  
    const cardPrice = document.createElement("div");
    cardPrice.classList.add("text-center","h3","col",
    "align-self-center","justify-content-center","text-success");
    // Si el precio es 0 ASUMO que es gratuito el producto.
    if (price === 0) {
      cardPrice.appendChild(document.createTextNode(`FREE`));
    }
  
    cardPrice.appendChild(document.createTextNode(`$${price}`));
  
    return cardPrice;
  };
  
  
  
  const getCardReviewsStars = (stars = 1) => {
    //Si no tiene reviews en estrellas no quiero que haga nada.
    if (+stars === 0) {
      return;
    }
  
    //Si tiene estrellas o sea es mayor a 0
    // Creo el elemento contenedor
    const starsContainer = document.createElement("div");
    starsContainer.classList.add(
      "d-flex",
      "justify-content-center",
      "col",
      "align-self-center",
      "text-warning"
    );
  
    // Creo el elemento de las estrellas segun la cantidad de estrellas que tenga el producto
    for (let index = 0; index < stars; index++) {
      let star = document.createElement("div");
      star.classList.add("bi-star-fill");
      starsContainer.appendChild(star);
    }
    return starsContainer;
  };
  
  const getCardFooter = (id) => {
    // category = category.charAt(0).toUpperCase() + category.slice(1);
  
    //Creo el elemento contenedor del footer
    const cardFooter = document.createElement("div");
    cardFooter.classList.add(
      "card-footer",
      "p-4",
      "pt-0",
      "border-top-0",
      "bg-transparent"
    );
  
    // Creo el elemento contenedor del texto del footer.
    const cardFooterTextContainer = document.createElement("div");
    cardFooterTextContainer.classList.add("text-center");
  
    // Elemento anchor de HMTL.
    const cardButton = document.createElement("button");
    cardButton.classList.add("btn", "btn-outline-dark", "mt-auto");
    cardButton.setAttribute("id", id);
    cardButton.textContent = "Agregar al carrito";
    cardFooter.appendChild(cardFooterTextContainer);
    cardFooterTextContainer.appendChild(cardButton); 

        // Retorno el footer.
    return cardFooter;
  };
  




  /*
        REPRESENTACION EN HTML DEL CODIGO DE ARRIBA
    
    <!-- Esta a modo de ejemplo, todo esto lo va a rellenar JavaScript automaticamente. -->
            <div class="col mb-5">
              <div class="card h-100">
                <!-- Product image-->
                <img
                  class="card-img-top"
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="..."
                />
                <!-- Product details-->
                <div class="card-body p-4">
                  <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">Special Item</h5>
                    <!-- Product reviews-->
                    <div class="d-flex justify-content-center small text-warning mb-2">
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                    </div>
                    <!-- Product price-->
                    <span class="text-muted text-decoration-line-through">$20.00</span>
                    $18.00
                  </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
                  </div>
                </div>
  
                <!--  -->
    */
  