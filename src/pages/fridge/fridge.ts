import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import {User} from 'firebase/app';

@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage implements OnInit{
  products = [];
  user: User;
  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.authService.getCurrentUserSubscription().subscribe(
      (user: User) => {
        this.user = user;
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
}
