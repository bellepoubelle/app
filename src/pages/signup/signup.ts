import { Operator } from '../../models/operator';
import { Account } from '../../models/account';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';
import { OperatorService } from '../../providers/operator-service';
import { LoginPage } from '../login/login';
import { PoubelleMapPage } from "../poubelle-map/poubelle-map";
//import { TabsPage } from '../tabs/tabs';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-account',
  templateUrl: 'signup.html'
})
export class SignupPage {

  HAS_LOGGED_IN: string = 'hasLoggedIn';

  account: Account = new Account();
  operators: Array<Operator> = new Array<Operator>();

  submitted: boolean = false;

  constructor(public navCtrl: NavController, public accountService: AccountService, public operatorService: OperatorService, public http: Http, public storage: Storage, public events: Events) {
  }

  ionViewDidLoad() {
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.navCtrl.push(PoubelleMapPage);
      } else {
        this.operatorService.getAll()
          .subscribe(
          result => {
            this.operators = result;
          });
      }
    });
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.account.role = "regUser";
      // var token = window.btoa(this.account.email + ":" + this.account.password);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = 'https://api.bellepoubelle.fr/rest/v1.0/accounts/';
      var sub = this.http.post(url, JSON.stringify(this.account), {
        headers: headers
      }).map(res => res.ok);
      sub.subscribe(
        (response) => {
          /**
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.storage.set('token', token);
          this.events.publish('account:signup');
          this.events.publish('account:login'); */
          this.navCtrl.push(LoginPage);
        },
        (err) => {
          this.navCtrl.pop;
        }
      );
    }
  }
}
