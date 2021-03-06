import {Image} from '../../models/image';
import {Alert} from '../../models/alert';
import {ImageService} from '../../providers/image-service';
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavController, NavParams, ActionSheetController} from 'ionic-angular';

import {AlertService} from '../../providers/alert-service';
import {AlertListPage} from '../alert-list/alert-list';
import { PoubelleMapPage } from "../poubelle-map/poubelle-map";
import {Camera} from '@ionic-native/camera';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'page-poubelle-report',
  templateUrl: 'poubelle-report.html'
})
export class PoubelleReportPage {

  id: number;

  alert: Alert = new Alert();
  submitted: boolean = false;
  image: Image = new Image();
  base64Image: string;

  selectImageSource: string;
  loadFromLibrary: string;
  useCamera: string;
  cancel: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertService: AlertService, public imageService: ImageService, public translateService: TranslateService,
    private camera: Camera, public actionSheetCtrl: ActionSheetController) {
    this.translateService.get('SELECT IMAGE SOURCE').subscribe(value => {this.selectImageSource = value;});
    this.translateService.get('LOAD FROM LIBRARY').subscribe(value => {this.loadFromLibrary = value;});
    this.translateService.get('USE CAMERA').subscribe(value => {this.useCamera = value;});
    this.translateService.get('CANCEL').subscribe(value => {this.cancel = value;});
  }

  ionViewDidEnter() {
    this.id = this.navParams.get('id');
  }

  saveDetail(form: NgForm) {
    this.submitted = true;
    
    // set default type for all alerts
    this.alert.alertType = 1;
    
    if (form.valid) {
      if (this.base64Image == null || this.base64Image == "") {
        this.alert.poubelle = this.id;
        this.alertService.create(this.alert);
        this.navCtrl.push(PoubelleMapPage);
      } else {
        this.image.file = this.base64Image;
        this.imageService.createAndGet(this.image).subscribe(
          result => {
            this.alert.image = result.id;
            this.alert.poubelle = this.id;
            this.alertService.create(this.alert);
            this.navCtrl.push(PoubelleMapPage);
          });
      }
    }
  }

  cancelDetail(form: NgForm) {
    this.navCtrl.push(PoubelleMapPage);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.selectImageSource,
      buttons: [
        {
          text: this.loadFromLibrary,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: this.useCamera,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: this.cancel,
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private takePicture(sourceType: any) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 1000,
      targetHeight: 1000,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      cameraDirection: this.camera.Direction.BACK
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = imageData;
    }, (err) => {
      console.log('Error while selecting image.');
    });
  }

}