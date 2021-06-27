import { Component, ViewChild, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from '../core/services/navbar.service';
import Swal from 'sweetalert2';
import { Product } from '../shared/models/product.model';
import { Discounts } from '../shared/models/discounts.model';
import { Totals } from '../shared/models/totals.model';
import { ProductService } from '../shared/services/product/product.service';
import { ErrorService } from '../core/services/error.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LocalstorageService } from '../shared/services/localstorage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public url: any;
  public products: any;
  public discounts: any;
  public numberCart: number;
  public discountApplied: any;
  public productCart: Product[];
  public discountCart: Discounts[];
  public totals: Totals;
  public mejorOferta: any;
  public bestOffer: any;
  public loadingDiscount: boolean;
  public loadingProduct: boolean;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  @ViewChild("content") modalContent: TemplateRef<any>;
  closeResult = '';
  suscription: any;
  processDiscount: any;
  constructor(
    private _navbarService: NavbarService,
    private _modalService: NgbModal,
    private _ProductService: ProductService,
    private _errorService: ErrorService,
    private _storageService: LocalstorageService
  ) {
    this.products = [];
    this.numberCart = 0;
    this.productCart = [];
    this.discountCart = [];
    this.mejorOferta = 0;
    this.bestOffer = [];
    this.discountApplied = [];
    this.loadingDiscount = false;
    this.loadingProduct = false;
  }

  ngOnInit(): void {
    if (this._storageService.validateStorage("objLocalStorage")) {
      const objLocalStorage = this._storageService.getStorage("objLocalStorage")
      this.numberCart = parseInt(objLocalStorage.numberCart);
      this.productCart = objLocalStorage.productCart;
      this.discountCart = objLocalStorage.discountCart;
    }
    //subscripciones
    this.suscription = this._navbarService.getNumberCart().subscribe((data: number) => {
      this.numberCart = data;
    });
    this.listProducts();
    this.listDiscount();
  }
  public listProducts() {
    this.loadingProduct = true;
    this._ProductService.ProductsList().subscribe(
      (resp: Product) => {
        this.loadingProduct = false;
        this.products = resp["products"];
      },
      error => {
        this.loadingProduct = false;
        this._errorService.error(error);
      }
    )
  }
  public listDiscount() {
    this._ProductService.DiscountsList().subscribe(
      (resp: Discounts) => {
        this.discounts = resp["discounts"];
      },
      error => {
        this._errorService.error(error);
      }
    )
  }
  public addCart(product: Product, showAlert = true) {


    //busco si la marca del producto agregado tiene descuento, si es asi, agrego el descuento al objeto
    let productDiscount: Discounts = this._ProductService.findProductDiscount(this.discounts, product, "brand");
    if (productDiscount) {
      product.discount = productDiscount.discount;
      product.threshold = productDiscount.threshold;
    }
    //Busco si ya existe el mismo producto en el carro, si existe agrego solo la cantidad
    let productQuantity: Product = this._ProductService.findProductCart(this.productCart, product, "id");
    let index = this.productCart.indexOf(productQuantity);
    if (productQuantity) {
      this.productCart[index].quantity++;
    } else {
      //si es un producto nuevo en el carro
      //agrego el producto agregado al objeto
      product.quantity = 1;
      this.productCart.push(product);
    }
    //busco la marca en el objeto de marcas y le descuento el precio al saldo
    let productBrandDiscount: Discounts = this._ProductService.findProductDiscount(this.discountCart, product, "brand");
    if (productBrandDiscount) {
      this.discountCart.find(x => x.brand == product.brand).balance -= product.price;
    } else {
      this.discountCart.push({
        brand: product.brand,
        threshold: product.threshold,
        discount: product.discount,
        balance: (product.threshold - product.price)
      })
    }
    if (showAlert) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
    //agrego el numero de producto al icono del carro
    this.numberCart = this.productCart.reduce((sum, current) => (sum + current.quantity), 0);
    this._navbarService.updateCartIcon(this.numberCart);
    //proceso descuentos
    this.procesarDescuentos();
  }

  public removeProductCart(product: Product) {
    Swal.fire({
      text: "¿Desea eliminar este prodcuto de su carro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#449d44',
      cancelButtonColor: '#d33',
      reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {

        //elimino el producto del carro
        this.productCart = this.productCart.filter(item => item.id !== product.id);
        //busco en el objeto de los descuento de marca
        let productBrandDiscount: Discounts = this._ProductService.findProductDiscount(this.discountCart, product, "brand");
        if (productBrandDiscount) {
          // si queda productos de esta marca en el carro, si ya no quedan la elimino del objeto de los descuentos de la marca
          let productCartFind: Product = this._ProductService.findProductCart(this.productCart, product, "brand");
          if (!productCartFind) {
            //al no quedar productos de la marca en el carro, la elimino del objeto de descuentos
            this.discountCart = this.discountCart.filter(item => item.brand !== product.brand);
          } else {
            //ya que existen productos de la misma marca, solo aplico la diferencia de limite para el descuento
            this.discountCart.find(x => x.brand == product.brand).balance += product.price;
          }
        }
        //descuento el numero en el icono del carro
        this.numberCart = this.productCart.reduce((sum, current) => (sum + current.quantity), 0);
        this._navbarService.updateCartIcon(this.numberCart);
        //proceso descuentos
        this.procesarDescuentos();
      }
    });
  }
  public deleteItemCart(product: Product) {

    //verifico si tiene mas de 1 cantidad
    if (product.quantity > 1) {

      //descuento la cantidad
      this.productCart.find(x => x.id == product.id).quantity--;
      //descuento el precio en el balance para aplicar descuento
      this.discountCart.find(x => x.brand == product.brand).balance += product.price;
      //descuento el numero en el icono del carro
      this.numberCart = this.productCart.reduce((sum, current) => (sum + current.quantity), 0);
      this._navbarService.updateCartIcon(this.numberCart);
      //proceso descuentos
      this.procesarDescuentos();
    } else {
      this.removeProductCart(product);
    }
  }
  openCart() {
    this.procesarDescuentos();
    this._modalService.open(this.modalContent, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
  }
  //Proceso para actualizar los descuentos del carro
  public procesarDescuentos(): void {
    this.loadingDiscount = true;
    this.totals = new Totals()
    setTimeout(() => {
      //busco si se llegó el minimo de compra de alguna marca para aplicar el descuento
      let desc;
      this.discountApplied = [];
      for (desc in this.discountCart) {
        if (this.discountCart[desc].balance <= 0) {
          this.discountApplied = this.discountCart[desc];
        }
      }
      //busco el mejor descuento de las marcas
      this.bestOffer = this.discountCart.reduce(function (prev, current) {
        if (+current.discount > +prev.discount) {
          return current;
        } else {
          return prev;
        }
      }, { discount: 0 });
      if (this.bestOffer.balance <= 0) {
        //aplico este descuento
        this.discountApplied = this.bestOffer;
      }
      if (this.discountApplied.length == 0) {
        //si no hay descuento por aplicar, seteo los valores en cero
        this.discountApplied = {
          brand: "",
          threshold: 0,
          discount: 0,
          balance: 0
        };
      }
      //calculo los totales

      const subtotal = this.productCart.reduce((sum, current) => (sum + current.price * current.quantity), 0);
      this.totals.subtotal = subtotal;
      this.totals.discount = this.discountApplied.discount;
      this.totals.total = this.totals.subtotal - this.totals.discount;
      this.loadingDiscount = false;
    }, 1000);
    //seteo valores en localstorage
    let objLocalStorage = {
      "productCart": this.productCart,
      "discountCart": this.discountCart,
      "numberCart": this.numberCart
    }
    this._storageService.setStorage('objLocalStorage', objLocalStorage);
  }
}
