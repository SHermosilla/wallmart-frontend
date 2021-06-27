const BASE_URL: string = "http://localhost:8080";
export const environment = {
  production: true,
  CartConfig: {
    LISTADO_PRODUCTOS: BASE_URL + '/api/products/list',
    LISTADO_DESCUENTOS: BASE_URL + '/api/discounts/list'
  },
  StorageConfig: {
    SECRET_KEY: '$eCretKeY'
  },
};
