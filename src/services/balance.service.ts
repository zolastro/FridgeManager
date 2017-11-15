import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { DatabaseService } from "./database.service";
import { User } from "firebase/app";
import {Product} from '../models/product';

@Injectable()
export class BalanceService {
    constructor(
        private authService: AuthService,
        private databaseSercice: DatabaseService
    ) {}

    withdraw(amount: number, user: User) {

    }

    deposit(amount: number, user: User) {
      this.databaseSercice.updateDataAt("users/" + user.uid, 'balance', amount);
    }

    getBalance(user: User) {
        return this.databaseSercice.getDataFrom("users/" + user.uid);
    }

    buyProduct(product: Product, user: User) {
      this.getBalance(user).subscribe(
        (obj) => {
          let currentBalance = obj['balance'];
          if(product.price <= currentBalance) {
            console.log('Enjoy your buy!');
          } else {
            console.log('Not enough money!');
          }
        }
      );
    }
}
