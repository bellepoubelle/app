import {Image} from '../models/image';
import {API} from './api';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {

  ENDPOINT: string = "images/";

  constructor(public http: Http, public api: API) {
  }

  getAll(): Observable<Image[]> {
    return this.api.get(this.ENDPOINT)
      .map((response) => response.json());
  }

  get(id: number): Observable<Image> {
    return this.api.get(this.ENDPOINT + id).map(response  => response.json());
  }

  create(image: Image) {
    this.api.post(this.ENDPOINT, JSON.stringify(image)).map(res => res.ok).subscribe(data => {
      console.log("Successfully created.");
    },
      (err: Error) => {
        console.log("Oops! Problem with creating.");
      }
    );
  }

  createAndGet(image: Image): Observable<Image> {
    return this.api.post(this.ENDPOINT, JSON.stringify(image)).flatMap(res => {
      var location = res.headers.get('Location');
      return this.api.getByURL(location);
    }).map((res) => res.json());
  }

  update(image: Image) {
    this.http.put(this.ENDPOINT + image.id, JSON.stringify(image)).map(res => res.json()).subscribe(data => {
      console.log("Successfully updated.");
    },
      (err: Error) => {
        console.log("Oops! Problem with updating.");
      }
    );
  }

  delete(id: number) {
    this.api.delete(this.ENDPOINT + id).map(res => res.json()).subscribe(data => {
      console.log("Successfully deleted.");
    },
      (err: Error) => {
        console.log("Oops! Problem with deleting.");
      }
    );
  }
}
