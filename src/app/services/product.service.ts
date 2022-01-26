import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Product } from '../model/product';
import { catchError, tap } from 'rxjs/operators';
import { PconfigService } from './pconfig.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlEndPoint: string;
  private productUrl = 'api/product/product.js';
  //private headers = new Headers(); 


  constructor(private http: HttpClient, private pConfigS: PconfigService) {
    this.urlEndPoint = this.pConfigS.getApiUrl()  + '/product';
    //this.urlEndPoint = 'api/product/product.js';
    

    //this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Accept', 'application/json');
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlEndPoint).pipe(
      tap((data) => data),
      catchError(this.handleError)
    );
  }

  setProduct(item: Product): Observable<Product> {
    const headers = { 'content-type': 'application/json',
                      'Control-Allow-Origin': '*'} 
    console.log(item);
    const body=JSON.stringify(item);
    return this.http.post<Product>(this.urlEndPoint, item, {'headers': headers}).pipe(
      tap((data) => data),
      catchError(this.handleError)
    )
  }

  updateProduct(item: Product): Observable<Product> {
    const headers = { 'content-type': 'application/json',
                      'Control-Allow-Origin': '*'} 
    console.log(item);
    const body=JSON.stringify(item);
    return this.http.put<Product>(this.urlEndPoint + '/' + item.id, item, {'headers': headers}).pipe(
      tap((data) => data),
      catchError(this.handleError)
    )
  }

  getProduct(id: any): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    return this.http.get<Product>(this.urlEndPoint  + '/' + id).pipe(
      tap((data) => data),
      catchError(this.handleError)
    );
  }

  deleteItem(id: number): Observable<Product[]> {
    const headers = { 'content-type': 'application/json',
                      'Control-Allow-Origin': '*'} 
    return this.http.delete<Product[]>(this.urlEndPoint + '/' + id, {'headers': headers}).pipe(
      tap((data) => data),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMesage = '';
    if (err.error instanceof ErrorEvent) {
      errorMesage = `an error occured: ${err.error.message}`;
    } else {
      errorMesage = `Server return code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMesage);
    return throwError(errorMesage);
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      name: '',
      description: '',
      idManufacturer: 0,
      idPProductType: 0,
      images: [],
      starRating: 0,
      state: false,
      quantityProducts: 0,
      unitCost: 0
      //description: null
    };
  }
}
