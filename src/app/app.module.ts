import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../enviroments/enviroment';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { ProductPage } from '../pages/product/product';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FridgePage} from '../pages/fridge/fridge';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import {AuthService} from '../services/auth.service';
import {DatabaseService} from '../services/database.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ProductsService } from '../services/products.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { OverflowPipe } from '../pipes/overflow.pipe';
import {BalanceService} from '../services/balance.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    FridgePage,
    UserProfilePage,
    OverflowPipe,
    ProductPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    FridgePage,
    UserProfilePage,
    ProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    DatabaseService,
    BalanceService,
    ProductsService,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
