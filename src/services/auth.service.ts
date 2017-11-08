import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatabaseService } from './database.service';
import {Subject} from 'rxjs/Subject';
import {User} from 'firebase/app';

import 'rxjs/add/operator/take';
import 'rxjs/Observable';

@Injectable()
export class AuthService {

  userSubject: Subject<User> = new Subject<User>();
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
      }
    );
  }
  logout() {
    this.firebaseAuth.auth.signOut();
    this.user = null;
    this.userSubject.next(this.user);
  }

  getCurrentUserSubscription() {
    return this.userSubject;
  }

  getCurrentUser() {
    return this.user;
  }

  checkUser(user: User) {
    let usersRef = this.databaseService.getDataFrom('users/' + user.uid).subscribe(
      (obj) => {
      console.log(obj);
      if (obj) {
        console.log("Welcome back!");
      } else {
        console.log("New user");
        this.initializeUser(user);
      }
    });
  }

  initializeUser(user: User) {
    this.databaseService.updateDataAt('users/' + user.uid , 'balance', 0);
  }
}
