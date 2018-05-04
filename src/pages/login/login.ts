import { Account } from '../../models/account';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Events, NavController } from 'ionic-angular';

import { AccountService } from '../../providers/account-service';
import { PoubelleMapPage } from "../poubelle-map/poubelle-map";
import { SignupPage } from '../signup/signup';
//import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-account',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  HAS_LOGGED_IN: string = 'hasLoggedIn';
  
  account: Account = new Account();
  
  submitted: boolean = false;
  
  translate: TranslateService;

  constructor(
    public navCtrl: NavController,
    public accountService: AccountService,
    public translateService: TranslateService,
    public events: Events
  ) {
    this.translate = translateService;
  }

  ionViewDidEnter() {
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.navCtrl.push(PoubelleMapPage);
      }
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.accountService.login(this.account.email, this.account.password);
      this.navCtrl.push(LoginPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
