import { Account } from '../../models/account';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AccountService } from '../../providers/account-service';
import { AccountPage } from '../account/account';
import { LoginPage } from '../login/login';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html'
})
export class AccountEditPage {

  account: Account = new Account();
  submitted: boolean = false;
  oldEmail: string;

  constructor(public navCtrl: NavController, public accountService: AccountService) {
  }

  ionViewDidEnter() {
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.accountService.get()
          .subscribe(
          result => {
            this.account = result;
            this.oldEmail = this.account.email;
          });
      } else {
        this.navCtrl.push(LoginPage);
      }
    });
  }
  
  saveDetail(form: NgForm) {
    this.submitted = true;
    if (form.valid) {

      if (this.account.email != this.oldEmail) {
        this.account.newEmail = this.account.email;
        this.account.email = this.oldEmail;
      }

      this.accountService.update(this.account);
      this.navCtrl.push(AccountPage);
    }
  }

  cancelDetail(form: NgForm) {
    this.navCtrl.push(AccountPage);
  }
}
