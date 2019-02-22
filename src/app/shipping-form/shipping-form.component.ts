import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../shared/models/order';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userId: string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    console.log(this.shipping);
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
    console.log('Resultado de push a Firebase', result);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
