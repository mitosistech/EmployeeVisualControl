import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from "../../config/app.config";
import { Observable, throwError } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };
  constructor(private http: HttpClient) {
    this.apiURL = AppConfig.urls.base;
  }

  public login(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/user/login", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }
  public verifyMail(data, userName): Observable<any> {
    return this.http
      .post(
        this.apiURL + "/user/verifyMail?userName=" + userName,
        data,
        this.httpOptions
      )
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }

  public resetPassword(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/user/resetPassword", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }
}
