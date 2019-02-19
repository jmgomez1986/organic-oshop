import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<any>;

  constructor(private shoppingCartService: ShoppingCartService ) {
   }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    console.log(this.cart$);
  }

}
