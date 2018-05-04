import {Address} from '../models/address';
import {API} from './api';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class AddressService {

  ENDPOINT: string = "addresses/";

  constructor(public http: Http, public api: API) {
  }

  getAll(): Observable<Address[]> {
    return this.api.get(this.ENDPOINT).map((response) => response.json());
  }

  get(id: number): Observable<Address> {
    return this.api.get(this.ENDPOINT + id)
      .map((response) => response.json());
  }

  create(address: Address) {
    this.api.post(this.ENDPOINT, JSON.stringify(address)).map((res) => res.ok).subscribe((data) => {
      console.log("Successfully created.");
    },
      (err: Error) => {
        console.log("Oops! Problem with creating.");
      }
    );
  }

  update(address: Address) {
    this.api.put(this.ENDPOINT + address.id, JSON.stringify(address)).map((res) => res.json()).subscribe((data) => {
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
