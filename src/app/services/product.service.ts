import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public getProduct(): Observable<any>{
    return this.http.get<Array<any>>("http://localhost:3000/products");

  }
  public  checkProduct(product:any){
return this.http.patch<any>(`http://localhost:3000/products/${product.id}`,{checked:!product.checked})
}
}
