import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filteredProducts: Product[] = [];
  products: Product[] = [];
  errorMessage: string = '';
  sub?: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getAll().subscribe({
      next: products => {
        this.products = products;
        console.log(this.products);
        this.filteredProducts = this.products;
        console.log(this.filteredProducts);
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
