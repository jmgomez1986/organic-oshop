import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  categories$: Observable<any>;

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    this.categories$ = this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      return this.categories$;
    }
}
