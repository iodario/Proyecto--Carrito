export const APIURL = "https://fakestoreapi.com/products";

//Llamada a mi api

export const fetchAPI = async (URL) => {
  const result = await fetch(URL);
  const data = await result.json();
  return data;
};

export const getAllProducts = async () => {
  return await fetchAPI(APIURL);
};

// //Este a modo de ejemplo para que vean como se puede transformar una URL de una api. En este proyecto quiero que mi array de productos contenga también los productos que el usuario agrega.
export const getProductById = async (id) => {
  const product = await fetchAPI(`${APIURL}/${id}`);
  return product;
};
