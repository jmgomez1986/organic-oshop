import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();

  }

  private populateProducts() {

    this.productService
      .getAll()
      .switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();

      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(product => product.category === this.category) :
      this.products;
  }

}
