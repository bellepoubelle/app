import {Alert} from "../../models/alert";
import {Image} from '../../models/image';
import {Poubelle} from "../../models/poubelle";
import {AccountService} from "../../providers/account-service";
import {AlertService} from "../../providers/alert-service";
import {ImageService} from '../../providers/image-service';
import {PoubelleService} from "../../providers/poubelle-service";
import {LoginPage} from "../login/login";
import {NavController} from 'ionic-angular';
import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

@Component({
  selector: 'page-alert-voting',
  templateUrl: 'alert-voting.html'
})
export class AlertVotingPage {
  @ViewChild('swing') swingStack: SwingStackComponent;
  @ViewChildren('alertVotings') swingCards: QueryList<SwingCardComponent>;

  alerts: Array<Alert>;

  alert: Alert = new Alert();
  alertImage: Image = new Image();
  poubelle: Poubelle = new Poubelle();

  stackConfig: StackConfig;

  constructor(private http: Http, public alertService: AlertService, public navCtrl: NavController, public accountService: AccountService, public imageService: ImageService, public poubelleService: PoubelleService) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ionViewDidEnter() {
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      if (!hasLoggedIn) {
        this.navCtrl.push(LoginPage);
      }
    });


    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.alertService.getAllForVoting()
      .subscribe(
      (alerts: Array<Alert>) => {
        this.alerts = alerts;
        this.setAlert();
      });
  }

  confirm(decision: boolean) {
    if (decision) {
      this.alert.voted = false;
      this.alertService.update(this.alert);
    } else {
      this.alert.voted = true;
      this.alert.votes = this.alert.votes + 1;
      this.alertService.update(this.alert);
    }
    this.setAlert();
  }

  setAlert() {
    let alert: Alert = this.alerts.pop();
    if (alert != null) {
      this.imageService.get(alert.image)
        .subscribe(
        result => {
          this.alertImage = result;
        });
      this.poubelleService.get(alert.poubelle)
        .subscribe(
        poubelle => {
          this.poubelle = poubelle;
        });
    }
    this.alert = alert;
  }

  // Called whenever we drag an element
  onItemMove(element: any, x: any, y: any, r: any) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  decimalToHex(d: any, padding: any) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

}
