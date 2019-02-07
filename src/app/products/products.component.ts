import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<any>;

  constructor(productService: ProductService) {
    this.products$ = productService.getAll();
  }


}
