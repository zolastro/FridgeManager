import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Product } from "../models/product";

@Injectable()
export class ProductsService {
    products = [
        new Product('KitKat', 0.9, 'A delicious snack'),
        new Product('KitKat Elite', 1.2, 'A delicious snack'),
        new Product('KitKat PRO', 3.4, 'A delicious snack'),
    ];
    constructor(
        private databaseService: DatabaseService
    ) {}

    public getProducts() : Product[] {
        return this.products;
    }
}