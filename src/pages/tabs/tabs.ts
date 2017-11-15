import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import {FridgePage} from '../fridge/fridge';
import {UserProfilePage} from '../user-profile/user-profile';
import {AuthService} from '../../services/auth.service';
import {User} from 'firebase';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  user: User;
  isAdmin: boolean;
  fridgePage = FridgePage;
  aboutPage = AboutPage;
  userProfilePage = UserProfilePage;

  constructor(
    public authService: AuthService
  ) {
    this.isAdmin = false;
    this.user = this.authService.getUser();
    this.authService.getUserSubscription().subscribe(
      (user) => {
        this.user = user;
        console.log(user);
        if(user) {
          this.checkIfAdmin(user);
        } else {
          this.isAdmin = false;
        }
      }
    );
  }



  checkIfAdmin(user: User) {
    this.authService.getUserData(user).subscribe(
      (obj) => {
        this.isAdmin = obj['admin'] != null;
      }
    );
  }
}
