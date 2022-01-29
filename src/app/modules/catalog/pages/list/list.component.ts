import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  filteredProducts: Product[] = [];
  products: Product[] = [];
  errorMessage: string = '';
  sub?: Subscription;
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getall();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): Product[] {
    filterBy =filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product)=>
      product.name.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
  }

  getall() {
    this.sub = this.productService.getAll().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    //this.listFilter = 'r';
  }

}
