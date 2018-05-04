import { Image } from '../../models/image';
import { Operator } from '../../models/operator';
import { Account } from '../../models/account';
import { ImageService } from '../../providers/image-service';
import { OperatorService } from '../../providers/operator-service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AccountService } from '../../providers/account-service';
import { AboutPage } from '../about/about';
import { Camera } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-about-edit',
  templateUrl: 'about-edit.html'
})
export class AboutEditPage {

  id: number;
  submitted: boolean = false;
  account: Account = new Account();
  image: Image = new Image();
  operator: Operator = new Operator();
  base64Image: string;

  selectImageSource: string;
  loadFromLibrary: string;
  useCamera: string;
  cancel: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imageService: ImageService, public accountService: AccountService, public operatorService: OperatorService, public translateService: TranslateService,
    private camera: Camera, public actionSheetCtrl: ActionSheetController) {
    this.translateService.get('SELECT IMAGE SOURCE').subscribe(value => { this.selectImageSource = value; });
    this.translateService.get('LOAD FROM LIBRARY').subscribe(value => { this.loadFromLibrary = value; });
    this.translateService.get('USE CAMERA').subscribe(value => { this.useCamera = value; });
    this.translateService.get('CANCEL').subscribe(value => { this.cancel = value; });
  }

  ionViewDidEnter() {
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

  saveDetail(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.operatorService.update(this.operator);
      this.navCtrl.push(AboutPage);
    }
  }

  cancelDetail(form: NgForm) {
    this.navCtrl.push(AboutPage);
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
      this.image = new Image();
      this.base64Image = imageData;
      this.image.file = this.base64Image;
      this.imageService.createAndGet(this.image).subscribe(
        result => {
          this.operator.logo = result.id;
          this.operatorService.update(this.operator);
        });
    }, (err) => {
      console.log('Error while selecting image.');
    });
  }
}
