import { Category } from '../models/category';
import { API } from './api';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  ENDPOINT: string = "categories/";

  constructor(public http: Http, public api: API) {
  }

  getAll(): Observable<Category[]> {
    return this.api.get(this.ENDPOINT).map((response) => response.json());
  }

  get(id: number): Observable<Category> {
    return this.api.get(this.ENDPOINT + id)
      .map((response) => response.json());
  }

  create(category: Category) {
    this.api.post(this.ENDPOINT, JSON.stringify(category)).map((res) => res.ok).subscribe((data) => {
      console.log("Successfully created.");
    },
      (err: Error) => {
        console.log("Oops! Problem with creating.");
      }
    );
  }

  update(category: Category) {
    this.api.put(this.ENDPOINT + category.id, JSON.stringify(category)).map((res) => res.json()).subscribe((data) => {
      console.log("Successfully updated.");
    },
      (err: Error) => {
        console.log("Oops! Problem with updating.");
      }
    );
  }

  delete(id: number) {
    this.api.delete(this.ENDPOINT + id).map((res) => res.json()).subscribe((data) => {
      console.log("Successfully deleted.");
    },
      (err: Error) => {
        console.log("Oops! Problem with deleting.");
      }
    );
  }

}
