import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Module/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public getProduct(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:3000/products");

  }
  public  checkProduct(product:any){
return this.http.patch<any>(`http://localhost:3000/products/${product.id}`,{checked:!product.checked})
}
}
