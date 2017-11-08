import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { DatabaseService } from "./database.service";
import { User } from "firebase/app";

@Injectable()
export class BalanceService {
    constructor(
        private authService: AuthService,
        private databaseSercice: DatabaseService
    ) {}

    withdraw(amount: number) {
        
    }

    getBalance(user: User) {
        return this.databaseSercice.getDataFrom("users/" + user.uid + "/balance");
    }
}