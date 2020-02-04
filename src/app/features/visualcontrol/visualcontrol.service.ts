import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisualcontrolService {

  public apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };
  constructor(private http: HttpClient) {
    this.apiURL = AppConfig.urls.base;
  }
  public getLocation(businessId): Observable<any> {
    return this.http.get(this.apiURL + '/businessunits/' + businessId + '/locations', this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getCustomerList(businessUnitId, stateId): Observable<any> {
    return this.http.get(this.apiURL + '/customers?businessUnitId=' + businessUnitId + '&stateId=' + stateId, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }
  public getCollaborators(customerId): Observable<any> {
    return this.http.get(this.apiURL + '/customers/' + customerId + '/collaborators', this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getStateCode(): Observable<any> {
    return this.http.get(this.apiURL + '/locations/getStates', this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
