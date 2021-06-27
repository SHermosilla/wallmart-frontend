import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Product } from '../../models/product.model';
import { Discounts } from '../../models/discounts.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private _http: HttpClient,
  ) { }

  public ProductsList(): Observable<any> {
    return this._http.get(environment.CartConfig.LISTADO_PRODUCTOS, {})
      .pipe(
        map(response => { return response; })
      );
  }

  public DiscountsList(): Observable<any> {
    return this._http.get(environment.CartConfig.LISTADO_DESCUENTOS, {})
      .pipe(
        map(response => { return response; })
      );
  }
  public findProductCart(productArr: Product[], product: Product, method: string) {
    let r;
    switch (method) {
      case "id": {
        r = productArr.find(x => x.id == product.id);
        break;
      }
      case "brand": {
        r = productArr.find(x => x.brand == product.brand);
        break;
      }
    }
    return r;

  }
  public findProductDiscount(discountArr: Discounts[], product: Product, method: string) {
    let r;
    switch (method) {
      case "brand": {
        r = discountArr.find(x => x.brand == product.brand);
        break;
      }
    }
    return r;


  }
}
