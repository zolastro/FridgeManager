import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatabaseService } from './database.service';
import {Subject} from 'rxjs/Subject';
import {User} from 'firebase/app';

import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  userSubject: Subject<User> = new Subject<User>();
  userData: Observable<any> = new Observable<any>();
  user: User;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private databaseService: DatabaseService
  ) {}

  login() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      () => {
        this.user = this.firebaseAuth.auth.currentUser;
        this.checkUser(this.user);
        this.userSubject.next(this.user);
        this.userData = this.getUserData(this.user);
      }
    );
  }
  logout() {
    this.firebaseAuth.auth.signOut();
    this.user = null;
    this.userSubject.next(this.user);
  }

  getUserSubscription() {
    return this.userSubject;
  }

  getUser() {
    return this.user;
  }

  checkUser(user: User) {
    this.getUserData(user).subscribe(
      (obj) => {
      if (obj) {
      } else {
        this.initializeUser(user);
      }
    });
  }

  initializeUser(user: User) {
    this.databaseService.updateDataAt('users/' + user.uid , 'balance', 0);
  }

  getUserData(user: User) {
    return this.databaseService.getDataFrom('users/' + user.uid);
  }


}
