import { Operator } from '../models/operator';
import { API } from './api';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class OperatorService {

  ENDPOINT: string = "operators/";

  constructor(public http: Http, public api: API) {
  }

  getAll(): Observable<Operator[]> {
    return this.api.get(this.ENDPOINT).map((response) => response.json());
  }

  get(id: number): Observable<Operator> {
    return this.api.get(this.ENDPOINT + id)
      .map((response) => response.json());
  }

  create(operator: Operator) {
    this.api.post(this.ENDPOINT, JSON.stringify(operator)).map((res) => res.ok).subscribe((data) => {
      console.log("Successfully created.");
    },
      (err: Error) => {
        console.log("Oops! Problem with creating.");
      }
    );
  }

  update(operator: Operator) {
    this.api.put(this.ENDPOINT + operator.id, JSON.stringify(operator)).map((res) => res.json()).subscribe((data: Response) => {
      console.log("Successfully updated.");
    },
      (err: Error) => {
        console.log("Oops! Problem with updating.");
      }
    );
  }

  delete(id: number) {
    this.api.delete(this.ENDPOINT + id).map((res) => res.json()).subscribe((data: Response) => {
      console.log("Successfully deleted.");
    },
      (err: Error) => {
        console.log("Oops! Problem with deleting.");
      }
    );
  }

}
