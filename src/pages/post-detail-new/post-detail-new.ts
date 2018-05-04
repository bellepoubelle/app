import { Image } from '../../models/image';
import { Post } from '../../models/post';
import { ImageService } from '../../providers/image-service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ActionSheetController } from 'ionic-angular';

import { PostService } from '../../providers/post-service';
import { PostListPage } from '../post-list/post-list';
import { Camera } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-post-detail-new',
  templateUrl: 'post-detail-new.html'
})
export class PostDetailNewPage {

  post: Post = new Post();
  submitted: boolean = false;
  image: Image = new Image();
  base64Image: string;

  selectImageSource: string;
  loadFromLibrary: string;
  useCamera: string;
  cancel: string;

  constructor(public navCtrl: NavController, public postService: PostService, public imageService: ImageService, public translateService: TranslateService,
    private camera: Camera, public actionSheetCtrl: ActionSheetController) {
    this.translateService.get('SELECT IMAGE SOURCE').subscribe(value => { this.selectImageSource = value; });
    this.translateService.get('LOAD FROM LIBRARY').subscribe(value => { this.loadFromLibrary = value; });
    this.translateService.get('USE CAMERA').subscribe(value => { this.useCamera = value; });
    this.translateService.get('CANCEL').subscribe(value => { this.cancel = value; });
  }

  ionViewDidEnter() {
  }

  saveDetail(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.image.file = this.base64Image;
      this.imageService.createAndGet(this.image).subscribe(
        result => {
          this.post.image = result.id;
          this.postService.create(this.post);
          this.navCtrl.push(PostListPage);
        });
    }
  }

  cancelDetail(form: NgForm) {
    this.navCtrl.push(PostListPage);
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