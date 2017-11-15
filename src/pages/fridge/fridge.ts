import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import {User} from 'firebase/app';
import {Product} from '../../models/product';
import {BalanceService} from '../../services/balance.service';
import {AlertController, ToastController} from 'ionic-angular';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage implements OnInit{
  products = [];
  user: User;
  productPage = ProductPage;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private balanceService: BalanceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
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

  onBuyProduct(product: Product) {
    if (this.user) {
      this.confirmPurchase(product);
    } else {
      let toast = this.toastCtrl.create({
        message: 'You must be logged in!',
        duration: 2000
      });
      toast.present();
    }
  }

  confirmPurchase(product: Product) {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to buy' + product.name +'?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancel',
          role:'cancel',
          handler: () => {
            console.log('Purchase Cancelled');
          }
        },
        {
          text: 'Go ahead',
          handler: () => {
            this.balanceService.buyProduct(product, this.user);
            console.log('Purchase Adquired');
          }
        }
      ]
    });
    confirm.present();
  }
}
