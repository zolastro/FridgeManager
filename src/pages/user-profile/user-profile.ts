import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
    this.user = this.authService.getUser();
    this.authService.getUserSubscription().subscribe(
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
}
