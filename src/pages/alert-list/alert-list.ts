import { Alert } from '../../models/alert';
import { Account } from '../../models/account';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AlertService } from '../../providers/alert-service';
import { AccountService } from '../../providers/account-service';
import { PoubelleReportPage } from '../poubelle-report/poubelle-report';
import { AlertDetailPage } from '../alert-detail/alert-detail';
import { PoubelleScannerPage } from "../poubelle-scanner/poubelle-scanner";


@Component({
  selector: 'page-alert-list',
  templateUrl: 'alert-list.html'
})
export class AlertListPage {
  alerts: Array<Alert> = new Array<Alert>();
  account: Account = new Account();
  
  constructor(public navCtrl: NavController, public alertService: AlertService, public accountService: AccountService) { }

  ionViewDidEnter() {
    this.accountService.get()
      .subscribe(
      (result: Account) => {
        this.account = result;
      });
    this.alertService.getAll()
      .subscribe(
      result => {
        this.alerts = result;
      });
  }

  goToAlertDetail(id: number) {
    this.navCtrl.push(AlertDetailPage, id);
  }

  goToAlertScanner() {
    this.navCtrl.push(PoubelleScannerPage);
  }
}
