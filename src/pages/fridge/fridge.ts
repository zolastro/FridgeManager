import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { DatabaseService } from '../../services/database.service';
import {User} from 'firebase/app';
import {Product} from '../../models/product';
import {BalanceService} from '../../services/balance.service';
import {ToastController} from 'ionic-angular';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage implements OnInit{
  products = [];
  user: User;
  money: Number;
  productPage = ProductPage;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private balanceService: BalanceService,
    private toastCtrl: ToastController,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.authService.getCurrentUserSubscription().subscribe(
      (user: User) => {
        this.user = user;
        //Get real money
      }
    );
    this.products = this.productsService.getProducts();
  }

  isLoggedIn() {
    return this.user;
  }

  onLogin() {
    this.authService.login();
  }

  buyProduct(product: Product) {
    if (this.user) {
      this.balanceService.buyProduct(product, this.user);
    } else {
      let toast = this.toastCtrl.create({
        message: 'You must be logged in!',
        duration: 3000
      });
      toast.present();
    }
  }
}
