import { Product } from './../models/product';

export interface ShoppingCartItem {
  product: Product,
  quantity: number
}
