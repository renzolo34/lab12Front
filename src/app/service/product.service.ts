import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API: string = 'http://localhost:3000/api/product';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSelectedProduct(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.API);
  }

  createProduct(product: any) {
    this.http.post(this.API, product).subscribe({
      next: _ => {
        this.router.navigate(["/"]);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  deleteProduct(id: string) {
    return this.http.post(`${this.API}/${id}/delete`, {});
  }

  updateProduct(id: string, product: any) {
    this.http.post(`${this.API}/${id}`, product).subscribe({
      next: _ => {
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}