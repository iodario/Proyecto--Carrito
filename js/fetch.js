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


