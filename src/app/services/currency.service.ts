import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _apiKey = environment.apiKey;;
  private _from: any = null;
  private _to: any = null;

  constructor(
    private _http: HttpClient
  ) { }

  public getCurrencies(): Observable<any> {
    return this._http.get<any>('https://v6.exchangerate-api.com/v6/' + this._apiKey + '/codes');
  }

  public getCountries(): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("fields","currencies,flags");

    return this._http.get<any>('https://restcountries.com/v3.1/all', {params: queryParams});
  }

  public convert(base: string, target: string, amount: number): Observable<any> {
    return this._http.get<any>( `https://v6.exchangerate-api.com/v6/${this._apiKey}/pair/${base}/${target}/${amount}`);
  }

  public setFrom(curr: any): void {
    this._from = curr;
  }

  public getFrom(): any {
    return this._from;
  }

  public setTo(curr: any): void {
    this._to = curr;
  }

  public getTo(): any {
    return this._to;
  }
}
