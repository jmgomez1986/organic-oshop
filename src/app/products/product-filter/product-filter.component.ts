import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<any[]>;
  @Input('category') category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
   }

}
