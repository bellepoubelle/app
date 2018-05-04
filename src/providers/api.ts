import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable()
export class API {

  private URL: string = 'https://api.bellepoubelle.fr/rest/v1.0/';

  constructor(public http: Http, public storage: Storage) {
  }

  public get(endpoint: string, params?: any) {
    let headers: Headers = this.getHeaders();
    return this.getApiToken().flatMap((data) => {
      headers.append('Authorization', 'Basic ' + data);
      return this.http.get(this.URL + endpoint, { headers: headers });
    });
  }
  
  public getByURL(url: string, params?: any) {
    let headers: Headers = this.getHeaders();
    return this.getApiToken().flatMap((data) => {
      headers.append('Authorization', 'Basic ' + data);
      return this.http.get(url, { headers: headers });
    });
  }

  public post(endpoint: string, body: any) {
    let headers: Headers = this.getHeaders();
    return this.getApiToken().flatMap((data) => {
      headers.append('Authorization', 'Basic ' + data);
      return this.http.post(this.URL + endpoint, body, { headers: headers });
    });
  }

  public put(endpoint: string, body: any) {
    let headers: Headers = this.getHeaders();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Basic ' + data);
      return this.http.put(this.URL + endpoint, body, { headers: headers });
    });
  }

  public delete(endpoint: string) {
    let headers: Headers = this.getHeaders();
    return this.getApiToken().flatMap((data) => {
      headers.append('Authorization', 'Basic ' + data);
      return this.http.delete(this.URL + endpoint, { headers: headers });
    });
  }
  
  private getApiToken(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('token'));
  }
  
  private getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }

}
