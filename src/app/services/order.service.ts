import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: any) {
    // console.log('Order to Firebase: ', order);
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart(); // Puede fallar la coneccion con Firebase, se usa Transacciones
                                          // para que se hagan las dos cosas, o son correctas las dos o fallan las dos
    return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    // return this.db.list('/orders', query => {
    //   return query.orderByChild('userId').equalTo(userId);
    // });
    // return this.db.list<any>('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
    return this.db.list('/orders',
      ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
