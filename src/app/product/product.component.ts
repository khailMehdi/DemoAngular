import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, observeOn} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {ProductService} from "../services/product.service";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  constructor(private productService:ProductService) {
  }
  ngOnInit() {
    this.getProducts();
    // this.http.get<Array<any>>("http://localhost:3000/products")
    //   .subscribe({
    //     next: data => this.products = data,
    //     error: err => console.error('Erreur : ', err),
    //     complete: () => console.log('Requête terminée')
    //   });
  }

  products : Array<any>  =[
    // {id: 1 ,name :"dell",price:12550,checked:false},
    // {id: 2 ,name :"HP",price:12850,checked:true},
    // {id: 3 ,name :"Iphone",price:7850,checked:true},

  ]
  handleCheckProduct(product: any) {
    // const url = `http://localhost:3000/products/${product.id}`;
    // const body = { checked: !product.checked };

    this.productService.checkProduct(product)
      .subscribe({
        next: (response) => {
          product.checked = !product.checked;
          console.log('Product updated successfully', response);
        },
        error: (err) => {
          console.error('Error updating product', err);
        }
      });
  }


  private getProducts() {
    this.productService.getProduct().subscribe({
      next:data=>{
        this.products=data
      },
      error: err => {
        console.log(

        )
      }
    })
  }
}
