import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, observeOn} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {ProductService} from "../services/product.service";
import {Product} from "../Module/product.model";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  public keyword: string = '';
  public totalPages: number = 0;
  public pageSize : number =4;
  public currentPages :number=1;
  public products: Array<Product> = [
    // {id: 1 ,name :"dell",price:12550,checked:false},
    // {id: 2 ,name :"HP",price:12850,checked:true},
    // {id: 3 ,name :"Iphone",price:7850,checked:true},

  ]

  constructor(private productService: ProductService) {
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
    this.productService.getProducts(this.currentPages,this.pageSize).subscribe({
      next: (resp) => {
        this.products = resp.body as Product[];
        let totalProducts:number=parseInt(resp.headers.get('x-total-count')!,10)
        this.totalPages=Math.floor(totalProducts/this.pageSize);
        if (totalProducts % this.pageSize !=0){
          this.totalPages=this.totalPages+1;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }


  handleDeletePrroduct(product: Product): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProduct(product).subscribe(() => {
        this.products = this.products.filter(p => p.id !== product.id);
      });
    }
  }

  searchProduct() {
    if (this.keyword.trim() !== '') { // Ensure keyword is not empty or whitespace
      this.productService.searchProducts(this.keyword).subscribe(
        (value: Product[]) => {
          this.products = value; // Update the products array with the search results
          console.log("err")
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      console.log("empty")// Handle empty search query if needed
    }
  }

  getPages(): number[] {
    console.log(this.getPages());

    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    // Logic to navigate to the selected page
    this.currentPages = page;
    this.getProducts(); // Reload products for the selected page
  }

}
