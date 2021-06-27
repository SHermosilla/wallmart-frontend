import { Injectable } from '@angular/core';

const URL_LOCAL_SERVICE: string = "http://localhost:49522/";
const URL_TEST_SERVICE: string = "https://lmsgyn-backend.azurewebsites.net/";
const URL_PRODUCTION_SERVICE: string = "http://doggis-backend.capacitaciongyn.cl/";
const URL_SERVICE: string = URL_PRODUCTION_SERVICE;

@Injectable()
export class Constants {

  static BASE_URL: string = URL_SERVICE;
  static STORAGE_URL: string = 'https://ucorpentrerios.blob.core.windows.net/static';

  public MainConfig = class {
    public TEST_CONFIG: any = {
      TIPO_PREGUNTA_ALTERNATIVA: 'alter',        // Autogestion
      TIPO_PREGUNTA_SIMPLE: 1,                   // Libre
      TIPO_PREGUNTA_COMPLETACION: 2,
      NUMERO_INTENTO_MULTIMEDIA: 2,
      TIPO_CONTENIDO_TEXTO: 1,
      TIPO_CONTENIDO_AUDIO: 2,
      TIPO_CONTENIDO_IMAGEN: 3,
      TIPO_CONTENIDO_VIDEO: 4,
      TIEMPO_VERIFICACION_TEST: 60,
      TIEMPO_TEST: '2000-01-01 00:45:00',
      CONF_SHOW_ALL: false
    };
  }
};
