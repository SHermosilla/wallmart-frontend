import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { LocalstorageService } from '../../shared/services/localstorage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  visibility: boolean;
  suscription: any;
  user: any;
  faShoppingCart = faShoppingCart;
  public numberCart: number;
  @Output() verCarro: EventEmitter<number>;
  constructor(
    private _router: Router
    , private _navbarService: NavbarService
    , private _storageService: LocalstorageService
  ) {
    this.verCarro = new EventEmitter();
  }

  ngOnInit() {
    this.suscription = this._navbarService.getNumberCart().subscribe((data: number) => {
      this.numberCart = data;
    });
    if (this._storageService.validateStorage("objLocalStorage")) {
      const objLocalStorage = this._storageService.getStorage("objLocalStorage");
      this.numberCart = parseInt(objLocalStorage.numberCart);
    }
  }
  ngOnDestroy() {
    //this.suscription.unsubscribe();
  }
  detailCart() {
    this.verCarro.emit();
  }
}
