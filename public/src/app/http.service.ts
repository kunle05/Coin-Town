import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPriceUSD(){
    return this._http.get('/usd')
  }
  getPrice(currency){
    return this._http.get(`/price/${currency}`)
  }
  getAllCurrency(){
    return this._http.get('/allnations');
  }
}
