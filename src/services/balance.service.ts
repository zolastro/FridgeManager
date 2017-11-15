import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { DatabaseService } from "./database.service";
import { User } from "firebase/app";
import {Product} from '../models/product';
import {ToastController} from 'ionic-angular';

@Injectable()
export class BalanceService {

  constructor(
    private databaseSercice: DatabaseService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  withdraw(amount: number, user: User) {
    this.getBalance(user).take(1).subscribe(
      (obj) => {
        let balance: number = obj['balance'];
        console.log((balance - amount));
        if (balance - amount < 0) {
          let toast = this.toastCtrl.create({
            message: 'Not enough money!',
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        } else {
          this.setBalance((balance - amount), user);
        }
      }
    );
  }

  setBalance(amount: number, user: User) {
    this.authService.getUserData(user).take(1).subscribe(
      (data) => {
        data['balance'] = amount.toFixed(2);
        this.databaseSercice.pushDataAt("users/" + user.uid, data);
      }
    );
  }

  getBalance(user: User) {
    return this.databaseSercice.getDataFrom("users/" + user.uid);
  }

  buyProduct(product: Product, user: User) {
    this.withdraw(product.price, user);
  }
}
