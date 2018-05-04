import { Post } from '../models/post';
import { API } from './api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  
  ENDPOINT: string = "posts/";

  constructor(public http: Http, public api: API) {
  }

  getAll(): Observable<Post[]> {
    return this.api.get(this.ENDPOINT)
      .map(response => response.json());
  }

  get(id: number): Observable<Post> {
    return this.api.get(this.ENDPOINT + id).map(response => response.json());
  }

  create(post: Post) {
    this.api.post(this.ENDPOINT, JSON.stringify(post)).map(res => res.ok).subscribe(data => {
      console.log("Successfully created.");
    },
      err => {
        console.log("Oops! Problem with creating.");
      }
      );
  }

  update(post: Post) {
    this.http.put(this.ENDPOINT + post.id, JSON.stringify(post)).map(res => res.json()).subscribe(data => {
      console.log("Successfully updated.");
    },
      err => {
        console.log("Oops! Problem with updating.");
      }
      );
  }

  delete(id: number) {
    this.api.delete(this.ENDPOINT + id).map(res => res.json()).subscribe(data => {
      console.log("Successfully deleted.");
    },
      err => {
        console.log("Oops! Problem with deleting.");
      }
      );
  }

}
