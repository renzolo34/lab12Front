import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'category', 'location', 'price', 'img', 'actions'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.products = this.getProducts();
  }

  getProducts(): MatTableDataSource<any> {
    const productsObservable: Observable<any> = this.productService.getProducts();
    const productsDataSource = new MatTableDataSource<any>();
    productsObservable.subscribe({
      next: products => {
        productsDataSource.data = products;
      }
    });
    return productsDataSource;
  }

  sendToDetails(id: string) {
    this.router.navigate(['/detail', id]);
  }

  submitForDeletion(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: _ => {
        this.products = this.getProducts();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  confirmDelete(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForDeletion(id);
      }
    });
  }
}
