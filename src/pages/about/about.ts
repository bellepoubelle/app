import { Image } from '../../models/image';
import { Operator } from '../../models/operator';
import { Account } from '../../models/account';
import { ImageService } from '../../providers/image-service';
import { Component } from '@angular/core';
import { PopoverController, NavController } from 'ionic-angular';

import { OperatorService } from '../../providers/operator-service';
import { AccountService } from '../../providers/account-service';
import { AboutEditPage } from '../about-edit/about-edit';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  account: Account = new Account();
  image: Image = new Image();
  operator: Operator = new Operator();

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public operatorService: OperatorService, public accountService: AccountService, public imageService: ImageService) {
  }

  ionViewDidLoad() {
    this.accountService.get()
      .subscribe(
      (account: Account) => {
        this.account = account;
        this.operatorService.get(account.operator)
          .subscribe(
          (operator: Operator) => {
            this.operator = operator;
            this.imageService.get(operator.logo)
              .subscribe(
              (image: Image) => {
                this.image = image;
              });
          });
      });
  }
    
  goToAboutEdit(id: number) {
    this.navCtrl.push(AboutEditPage, id);
  }

}
