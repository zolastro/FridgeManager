import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  product : Product;


  constructor(public navParams: NavParams) {
    this.product = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
