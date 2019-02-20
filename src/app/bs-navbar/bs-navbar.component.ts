import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart = this.shoppingCartService.getCart();
    cart.then( cart$ => {
      cart$
        .snapshotChanges()
        .subscribe(cartsub => {
          this.shoppingCartItemCount = 0 ;
          for (const productId in cartsub.payload.val().items) {
              this.shoppingCartItemCount += cartsub.payload.val().items[productId].quantity;
          }
        });
      }
    );
  }

}
