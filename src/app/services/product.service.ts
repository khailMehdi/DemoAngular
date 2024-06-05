import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Module/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(page : number=1,size:number=4) {
    return this.http.get(`http://localhost:3000/products?_page=${page}&_limit=${size}`,{observe:"response"});
  }

  public checkProduct(product: Product) {
    return this.http.patch<Product>(`http://localhost:3000/products/${product.id}`,
      {checked: !product.checked})
  }

  public deleteProduct(product: Product) {
    return this.http.delete<Product>(`http://localhost:3000/products/${product.id}`)
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/products`, product);

  }
  //apiUrl : string ="http://localhost:3000/products"
  public searchProducts(keyword:string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:3000/products?name_like=${keyword}`);
   // return this.http.get<Array<Product>>(`${this.apiUrl}?q=${keyword}`);
  }
}
