import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order: any) {
    console.log('Order to Firebase: ', order);
    return this.db.list('/orders').push(order);
  }
}
