import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User} from 'firebase/app';
import {AlertController} from 'ionic-angular';
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage implements OnInit{

  user: User;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
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
      let confirm = this.alertCtrl.create({
        title: 'Do you want to logout?',
        buttons: [
          {
            text: 'No',
            role:'cancel'
          },
          {
            text: 'Yes',
            handler: () => {
              this.authService.logout();
            }
          }
        ]
      });
      confirm.present();
  }
}
