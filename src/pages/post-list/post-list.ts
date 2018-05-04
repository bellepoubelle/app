import { Post } from '../../models/post';
import { Account } from '../../models/account';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PostService } from '../../providers/post-service';
import { AccountService } from '../../providers/account-service';
import { PostDetailNewPage } from '../post-detail-new/post-detail-new';
import { PostDetailEditPage } from '../post-detail-edit/post-detail-edit';
import { PostDetailPage } from '../post-detail/post-detail';


@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html'
})
export class PostListPage {
  posts: Array<Post> = new Array<Post>();
  account: Account = new Account();
  
  constructor(public navCtrl: NavController, public postService: PostService, public accountService: AccountService) { }

  ionViewDidEnter() {
    this.accountService.get()
      .subscribe(
      (result: Account) => {
        this.account = result;
      });
    this.postService.getAll()
      .subscribe(
      result => {
        this.posts = result;
      });
  }

  goToPostDetail(id: number) {
    this.navCtrl.push(PostDetailPage, id);
  }
  
  goToPostEdit(id: number) {
    this.navCtrl.push(PostDetailEditPage, id);
  }

  goToPostNew() {
    this.navCtrl.push(PostDetailNewPage);
  }
}
