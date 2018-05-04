import { Account } from '../../models/account';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AccountService } from '../../providers/account-service';
import { AccountPage } from '../account/account';
import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-account-password',
  templateUrl: 'account-password.html'
})
export class AccountPasswordPage {

  account: Account = new Account();
  passwords = {password1: "", password2:""}
  submitted: boolean = false;

  constructor(public navCtrl: NavController, public accountService: AccountService, public storage: Storage) {
  }

  ionViewDidEnter() {
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.accountService.get()
          .subscribe(
          result => {
            this.account = result;
          });
      } else {
        this.navCtrl.push(LoginPage);
      }
    });
  }
  
  saveDetail(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.account.password = this.passwords.password1;  
      this.accountService.update(this.account);
      var token = window.btoa(this.account.email + ":" + this.account.password);
      this.storage.set('token', token);
      this.navCtrl.push(AccountPage);
    }
  }

  cancelDetail(form: NgForm) {
    this.navCtrl.push(AccountPage);
  }
}
