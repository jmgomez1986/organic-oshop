import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .map((action: any) => {
        const items = action.payload.val().items;
        console.log('items: ', items);
        return new ShoppingCart(items);
      });
  }

  async addToCart(product: Product) {
    console.log('Product (shopping-cart.service): ', product);
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    console.log('product.$key: ', product.key);
    const item$ = this.getItem(cartId, product.key);

    item$
      .snapshotChanges()
      .take(1)
      .subscribe(item => {
        item$.update({
          title: product.title,
          imageUrl : product.imageUrl,
          price: product.price,
          quantity:
            (item.payload.exists() ? item.payload.val().quantity : 0) + change
        });
      });
  }

}
