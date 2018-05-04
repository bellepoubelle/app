import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {Account} from '../models/account';
import {API} from './api';
import {Observable} from 'rxjs';


@Injectable()
export class AccountService {

  private HAS_LOGGED_IN: string = 'hasLoggedIn';
  private ENDPOINT: string = "accounts/";

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http,
    public api: API
  ) {
  }

  public getAll(): Observable<Account[]> {
    return this.api.get(this.ENDPOINT).map((response) => response.json());
  }

  public get(id?: number): Observable<Account> {
    if (id) {
      return this.api.get(this.ENDPOINT + id).map((response) => response.json());
    } else {
      return this.api.get(this.ENDPOINT + "me").map((response) => response.json());
    }
  }

  create(reading: Account) {
    this.api.post(this.ENDPOINT, JSON.stringify(reading)).map((res) => res.ok).subscribe((data) => {
      console.log("Successfully created.");
    },
      (err: Error) => {
        console.log("Oops! Problem with creating.");
      }
    );
  }

  update(reading: Account) {
    this.api.put(this.ENDPOINT + reading.id, JSON.stringify(reading)).map((res) => res.json()).subscribe((data) => {
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

  public hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value: boolean) => {
      return value === true;
    });
  };

  public login(email: string, password: string): void {
    var token = window.btoa(email + ":" + password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Basic ${token}`);
    let options = new RequestOptions({headers: headers});
    this.http.get('https://api.bellepoubelle.fr/rest/v1.0/accounts/me', options).map((res) => res.json()).subscribe((data) => {
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.storage.set('token', token);
      this.events.publish('account:login');
    },
      (err: Error) => {
        this.events.publish('account:loginfail');
      }
    );
  };

  public logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('token');
    this.events.publish('account:logout');
  };

}
