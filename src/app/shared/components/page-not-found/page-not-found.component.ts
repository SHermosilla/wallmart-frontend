import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../../core/services/navbar.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  routes: string;
  constructor(
    private _router: Router,
    private _navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.routes = this._router.url;
  }

}
