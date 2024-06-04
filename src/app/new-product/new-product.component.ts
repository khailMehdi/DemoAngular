import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../Module/product.model";
import {observable} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: this.fb.control(''),
      price: this.fb.control(0),
      checked: this.fb.control(false)
    })
  }

  saveProduct() {
    let product: Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
        next: data => {
          alert(JSON.stringify(data));
        }, error:
          err => {
            console.log(err);
          }
      }
    );

  }
}
