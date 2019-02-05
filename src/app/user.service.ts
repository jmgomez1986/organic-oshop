import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable()
=======
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
>>>>>>> 2adf649155a70ed4a88105fa8201bb3ae8830e62
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }
<<<<<<< HEAD

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
=======
>>>>>>> 2adf649155a70ed4a88105fa8201bb3ae8830e62
}
