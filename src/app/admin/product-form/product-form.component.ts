import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs/Observable';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).take(1).subscribe(p => this.product = p); // take(1) termina la subcripcion de un elemento
      console.log(this.product);
    }
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
    console.log(product);
  }

  ngOnInit() {
  }

}
