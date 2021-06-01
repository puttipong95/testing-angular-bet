import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BetServiceService {
  constructor(private _http: HttpClient) {}

  url: any = 'https://tranquil-coast-63423.herokuapp.com/';
  headerOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Content-Length, Accept-Encoding, Authorization, X-Requested-With',
    }),
  };

  headerOptionAuth = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Content-Length, Accept-Encoding, Authorization, X-Requested-With',
    }),
  };

  betSignup(payload) {
    return this._http.post(
      this.url + 'signup',
      {
        tel: payload.tel,
        password: payload.password,
      },
      this.headerOption
    );
  }

  betSignin(payload) {
    return this._http.post(
      this.url + 'signin',
      {
        tel: payload.tel,
        password: payload.password,
      },
      this.headerOption
    );
  }

  betDeposit(payload) {
    return this._http.post(
      this.url + 'deposit',
      payload,
      this.headerOptionAuth
    );
  }

  betWithdraw(payload) {
    return this._http.post(
      this.url + 'withdraw',
      payload,
      this.headerOptionAuth
    );
  }

  betBalance() {
    return this._http.get(this.url + 'balance', this.headerOptionAuth);
  }

  betGame() {
    return this._http.get(this.url + 'game', this.headerOptionAuth);
  }
}
