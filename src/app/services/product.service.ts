import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product';
import { catchError, tap } from 'rxjs/operators';
import { PconfigService } from './pconfig.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlEndPoint: string;
  private productUrl = 'api/product/product.js';

  constructor(private http: HttpClient, private pConfigS: PconfigService) {
    this.urlEndPoint = this.pConfigS.getApiUrl()  + '/product';
    //this.urlEndPoint = 'api/product/product.js';
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlEndPoint).pipe(
      tap((data) => data),
      catchError(this.handleError)
    );
  }

  setProduct(item: Product): Observable<Product> {
    console.log(item);
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(item);
    return this.http.post<Product>(this.urlEndPoint, item, {'headers':headers}).pipe(
      tap((data) => data),
      catchError(this.handleError)
    )
  }

  getProduct(id: String): Observable<Product> {
    return this.http.get<Product>(this.urlEndPoint  + '/' + id).pipe(
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
}
