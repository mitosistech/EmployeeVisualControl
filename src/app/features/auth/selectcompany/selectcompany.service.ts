import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectcompanyService {

  public apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  constructor(private http: HttpClient) {
    this.apiURL = AppConfig.urls.base
  }
  public getCompanyList(): Observable<any> {
    return this.http.get(this.apiURL + '/user/getBusinessUnitFromPontomaise', this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getByUserId(id): Observable<any> {
    return this.http.get(this.apiURL + '/managers/' + id, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getAllManager(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/managers/list", data)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }

  public deleteManager(id): Observable<any> {
    return this.http.delete(this.apiURL + '/managers/' + id, this.httpOptions).pipe(
      map((response) => {
        return JSON.stringify(response);
      })
    );
  }
}
