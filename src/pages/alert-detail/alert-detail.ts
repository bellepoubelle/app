import {Image} from '../../models/image';
import {Alert} from '../../models/alert';
import {Account} from '../../models/account';
import {ImageService} from '../../providers/image-service';
import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {AccountService} from '../../providers/account-service';
import {AlertService} from "../../providers/alert-service";


@Component({
  selector: 'page-alert-detail',
  templateUrl: 'alert-detail.html'
})
export class AlertDetailPage {

  id: number;
  alert: Alert = new Alert();
  account: Account = new Account();
  image: Image = new Image();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertService: AlertService, public accountService: AccountService, public imageService: ImageService) {
  }

  ionViewDidEnter() {
    this.id = this.navParams.get('id');
    if (this.navParams.get('id')) {
      this.alertService.get(this.id)
        .subscribe(
        result => {
          this.alert = result;
          if (this.alert.image != null) {
            this.imageService.get(this.alert.image)
              .subscribe(
              result => {
                this.image = result;
              });
          }
        });
      this.accountService.get()
        .subscribe(
        result => {
          this.account = result;
        });
    }
  }
}
