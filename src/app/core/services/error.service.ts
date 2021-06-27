import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private _router: Router
  ) { }

  public error(error: any, title: string = 'Error'): void {
    console.error(error);


    switch (error.status) {
      case 400: // Bad Request
        let message = (!error.error.Message) ? "Lo sentimos, tenemos problemas con el servidor. Si el error persiste pongase en contacto con el administrador del sitio." : error.error.Message;
        swal.fire({
          icon: 'error',
          text: message
        });
        break;
      case 401: // Unauthorized
        swal.fire({
          icon: 'error',
          title: 'Solicitud denegada',
          text: 'Esta solicitud requiere su autenticación, por favor inicie sesión.'
        }).then((result) => {
          if (result.value) {
            this._router.navigate(['Home'], { queryParams: { returnUrl: this._router.url } });
          }
        });
        break;
      case 403: // Forbidden
        swal.fire({
          title: title,
          text: error.error
        });
        break;
      case 404: // Not Found
        if (error.error) {
          swal.fire({
            text: error.error
          });
        } else {
          swal.fire({
            title: 'Error 404',
            text: 'Lo sentimos, no se ha encontrado el recurso en el servidor.'
          });
        }
        break;
      case 412: // PreConditionFailed
        swal.fire({
          title: 'Error de configuración',
          text: 'Se ha detectado una configuración faltante. Si el error persiste pongase en contacto con el administrador del sitio.'
        }).then((result) => {
          if (result.value) {
            this._router.navigate(['Home'], { queryParams: { returnUrl: this._router.url } });
          }
        });
        break;
      case 500: // Internal Server Error
        swal.fire({
          icon: 'error',
          title: 'Error innesperado',
          text: 'Lo sentimos, tenemos problemas con el servidor. Si el error persiste pongase en contacto con el administrador del sitio.'
        });
        break;
      case 503: // Service unavailable
        swal.fire({
          title: 'Mantenimiento en proceso',
          text: 'Lo sentimos, el servidor se encuentra actualmente en mantenimiento, por favor intentelo más tarde.'
        });
        break;
      default: // Otros errores
        swal.fire({
          icon: 'error',
          title: 'Error innesperado',
          text: 'Lo sentimos, tenemos problemas con el servidor. Si el error persiste pongase en contacto con el administrador del sitio.'
        });
    }

  }
}
