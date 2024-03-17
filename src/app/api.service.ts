import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public login(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/users/login`, data);
  }

  public getvendorlist(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/vendor/getnames`);
  }
  public addvendor(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/vendor/add`, data);
  }
  public getvendorbyname(name: string): Observable<any> {
    const params = new HttpParams().set('Name', name);   
    return this.http.get(`http://localhost:8080/api/v1/vendor/getdetail`, { params });
  }

  public getvendorreport(name: string): Observable<any> {
    const params = new HttpParams().set('Name', name);   
    return this.http.get(`http://localhost:8080/api/v1/vendor/getreport`, { params });
  }

  public addPurchase(arr: any[]): Observable<any> { return this.http.post<any>('http://localhost:8080/api/v1/purchase/add', arr); }

  public getproductname():Observable<any>{
      return this.http.get<any>(`http://localhost:8080/api/v1/sales/getproductname`);
  }

  public getsubproductname(product:string):Observable<any>{
    const params = new HttpParams().set('productname', product);   
    return this.http.get<any>(`http://localhost:8080/api/v1/sales/getsubproductname`,{params});
  }


  public gettotalkg(product:string,productsubname:string):Observable<any>{
    const params = new HttpParams()
          .set('productname', product)   
          .set('productsubname', productsubname);   
    return this.http.get<any>(`http://localhost:8080/api/v1/sales/gettotalkg`,{params});
  }


  public addsales(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/sales/addsales`, data);
  }
}