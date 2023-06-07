import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title = 'Editar';
  product: any;
  id: string= '';
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: '',
      name: '',
      category: '',
      location: '',
      price: '',
      imgFile: null
    });
  }

  ngOnInit(): void {
    this.getIdFromRoute();
  }

  onFileSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.productForm.patchValue({ imgFile: file });

      const fileNameSpan = document.querySelector('.file-name');
      if (fileNameSpan) {
        fileNameSpan.textContent = file.name;
      }
    }
  }

  submitProductForm() {
    const data = new FormData();
    data.append('id', this.productForm.value.id)
    data.append('name', this.productForm.value.name);
    data.append('category', this.productForm.value.category);
    data.append('location', this.productForm.value.location);
    data.append('price', this.productForm.value.price);
    data.append('imgFile', this.productForm.value.imgFile);

    this.productService.updateProduct(this.productForm.value.id, data);
  }

  getIdFromRoute(): void {
    this.router.params.subscribe({
      next: params => {
        this.id = params['id'];
        this.productService.getSelectedProduct(this.id).subscribe(
          product => {
            this.product = product;
            console.log(this.product);
            this.fillFormFields();
          },
          error => {
            console.log(error);
          }
        );
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
  fillFormFields(): void {
    this.productForm.patchValue({
      id: this.product._id,
      name: this.product.name,
      category: this.product.category,
      location: this.product.location,
      price: this.product.price,
    });
  } 
}
