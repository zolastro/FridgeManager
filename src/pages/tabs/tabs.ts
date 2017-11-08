import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import {FridgePage} from '../fridge/fridge';
import {UserProfilePage} from '../user-profile/user-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FridgePage;
  tab2Root = AboutPage;
  tab3Root = UserProfilePage;

  constructor() {

  }
}
