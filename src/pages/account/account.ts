import {Image} from '../../models/image';
import {Operator} from '../../models/operator';
import {Account} from '../../models/account';
import {ImageService} from '../../providers/image-service';
import {OperatorService} from '../../providers/operator-service';
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {NavController, ActionSheetController} from 'ionic-angular';

import {AccountService} from '../../providers/account-service';
import {AccountEditPage} from '../account-edit/account-edit';
import {AccountPasswordPage} from '../account-password/account-password';
import {LoginPage} from '../login/login';
import {Camera} from '@ionic-native/camera';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  account: Account = new Account();
  operator: Operator = new Operator();
  role: string;

  image: Image = new Image();
  base64Image: string;

  selectImageSource: string;
  loadFromLibrary: string;
  useCamera: string;
  cancel: string;

  constructor(public navCtrl: NavController, public accountService: AccountService, public operatorService: OperatorService, public imageService: ImageService, public translateService: TranslateService,
    private camera: Camera, public actionSheetCtrl: ActionSheetController) {
    this.translateService.get('SELECT IMAGE SOURCE').subscribe(value => {this.selectImageSource = value;});
    this.translateService.get('LOAD FROM LIBRARY').subscribe(value => {this.loadFromLibrary = value;});
    this.translateService.get('USE CAMERA').subscribe(value => {this.useCamera = value;});
    this.translateService.get('CANCEL').subscribe(value => {this.cancel = value;});
  }

  ionViewDidEnter() {
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.accountService.get()
          .subscribe(
          result => {
            this.account = result;
            if (this.account.image != null) {
              this.imageService.get(this.account.image)
                .subscribe(
                result => {
                  this.image = result;
                });
            }
            this.operatorService.get(this.account.operator)
              .subscribe(
              result => {
                this.operator = result;
              });
            if (this.account.role === "regUser") {
              this.translateService.get('REGUSER').subscribe(
                value => {
                  this.role = value;
                }
              )
            } else if (this.account.role === "manager") {
              this.translateService.get('MANAGER').subscribe(
                value => {
                  this.role = value;
                }
              )
            } else if (this.account.role === "admin") {
              this.translateService.get('ADMIN').subscribe(
                value => {
                  this.role = value;
                }
              )
            }
          });
      } else {
        this.navCtrl.push(LoginPage);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  goToAccountEdit() {
    this.navCtrl.push(AccountEditPage);
  }

  goToAccountPassword() {
    this.navCtrl.push(AccountPasswordPage);
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
      cameraDirection: this.camera.Direction.FRONT
    };

    this.camera.getPicture(options).then((imageData) => {
      this.image = new Image();
      this.base64Image = imageData;
      this.image.file = this.base64Image;
      this.imageService.createAndGet(this.image).subscribe(
        result => {
          this.account.image = result.id;
          this.accountService.update(this.account);
        });
    }, (err) => {
      console.log('Error while selecting image.');
    });
  }
}
