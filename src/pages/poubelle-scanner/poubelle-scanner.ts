import { PoubelleReportPage } from "../poubelle-report/poubelle-report";
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-poubelle-scanner',
  templateUrl: 'poubelle-scanner.html',
})
export class PoubelleScannerPage {
  
  text: string;
  poubelleId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public qrScanner: QRScanner) {
  }

  ionViewDidEnter() {

    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned', text);
            this.text = text;
            var splitted = text.split(":", 2);
            if (splitted != null && splitted[0] == "poubelle") {
              this.poubelleId = Number(splitted[1]);
            }
            console.log("Poubelle", this.poubelleId);
            
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            
            this.navCtrl.push(PoubelleReportPage, {id: this.poubelleId});
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));

  }
}
