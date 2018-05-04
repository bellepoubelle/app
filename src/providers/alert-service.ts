import { Alert } from '../models/alert';
import { API } from './api';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class AlertService {

  ENDPOINT: string = "alerts/";

  constructor(public http: Http, public api: API) {
  }

  getAll(): Observable<Alert[]> {
    return this.api.get(this.ENDPOINT).map((response) => response.json());
  }
  
  getAllForVoting(count?: number): Observable<Array<Alert>> {
    if (count) {
      return this.api.get(this.ENDPOINT + "voting?max=" + count).map(response => response.json());
    } else {
      return this.api.get(this.ENDPOINT + "voting").map(response => response.json());
    }
  }

  get(id: number): Observable<Alert> {
    return this.api.get(this.ENDPOINT + id)
      .map((response) => response.json());
  }

  create(alert: Alert) {
    this.api.post(this.ENDPOINT, JSON.stringify(alert)).map((res) => res.ok).subscribe((data) => {
      console.log("Successfully created.");
    },
      (err: Error) => {
        console.log("Oops! Problem with creating.");
      }
    );
  }

  update(alert: Alert) {
    this.api.put(this.ENDPOINT + alert.id, JSON.stringify(alert)).map((res) => res.json()).subscribe((data) => {
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
