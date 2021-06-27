import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private addNumberCart: BehaviorSubject<number>;

  constructor() {
    this.addNumberCart = new BehaviorSubject(0);
  }

  public getNumberCart(): Observable<number> {
    return this.addNumberCart.asObservable();
  }
  public updateCartIcon(n: number): void { n; this.addNumberCart.next(n); }
}
