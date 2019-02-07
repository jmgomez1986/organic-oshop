// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductService } from 'src/app/product.service';
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs';
//
// @Component({
//   selector: 'app-admin-products',
//   templateUrl: './admin-products.component.html',
//   styleUrls: ['./admin-products.component.css']
// })
// export class AdminProductsComponent implements OnInit, OnDestroy {
//   products: {title: string}[];
//   fiteredProducts: any[];
//   subscription: Subscription;
//
//   constructor(private productService: ProductService) {
//     this.subscription = this.productService.getAll()
//       .subscribe(products => this.products = this.fiteredProducts = products);
//   }
//
//   filter(query: string) {
//     this.fiteredProducts = (query) ?
//       this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
//       this.products;
//   }
//
//   ngOnInit() {
//   }
//
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
//
// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'] })

  export class AdminProductsComponent implements OnInit, OnDestroy {
    products: Product[];
    filteredProducts: Product[];
    subscription: Subscription;

    constructor(private productService: ProductService) {
      this.subscription = this.productService.getAll()
          .subscribe((products: Product[]) => this.filteredProducts = this.products = products);
      }

      ngOnInit() {   }

      ngOnDestroy() {
        this.subscription.unsubscribe();
      }

      filter(query: string) {
        this.filteredProducts = (query) ?
        this.products.filter(p => p['title'].toLowerCase().includes(query.toLowerCase())) :
        this.products;
      } }
