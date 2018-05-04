import {Image} from '../../models/image';
import {Post} from '../../models/post';
import {Account} from '../../models/account';
import {ImageService} from '../../providers/image-service';
import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {PostService} from '../../providers/post-service';
import {AccountService} from '../../providers/account-service';
import {PostDetailEditPage} from '../post-detail-edit/post-detail-edit';


@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html'
})
export class PostDetailPage {

  id: number;
  post: Post = new Post();
  account: Account = new Account();
  image: Image = new Image();

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PostService, public accountService: AccountService, public imageService: ImageService) {
  }

  ionViewDidEnter() {
    this.id = this.navParams.get('id');
    if (this.navParams.get('id')) {
      this.postService.get(this.id)
        .subscribe(
        result => {
          this.post = result;
          if (this.post.image != null) {
            this.imageService.get(this.post.image)
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

  goToPostEdit(id: number) {
    this.navCtrl.push(PostDetailEditPage, id);
  }
}
