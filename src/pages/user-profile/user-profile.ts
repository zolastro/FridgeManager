import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Subject} from 'rxjs/Subject';
import {User} from 'firebase/app';
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage implements OnInit{

  user: User;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.authService.getCurrentUserSubscription().subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.user;
  }
}
