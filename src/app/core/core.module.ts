import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { AuthenticationService } from './services/authentication.service';
import { ErrorService } from './services/error.service';
import { Constants } from './constants.class';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [
    Constants
    , AuthenticationService
    , NavbarService
    , ErrorService
  ]
})
export class CoreModule { }
