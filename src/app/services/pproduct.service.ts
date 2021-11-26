import { Pproduct } from './../model/pproduct';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PconfigService } from './pconfig.service';
import { Manufacturer } from '../model/manufacturer';

@Injectable({
  providedIn: 'root'
})
export class PproductService {
  private urlEndPoint: string;
  

  constructor(private http: HttpClient, private pConfigS: PconfigService) {
    this.urlEndPoint = this.pConfigS.getApiUrl() + '/pproduct';
  }

  getAll(): Observable<Pproduct[]> {
    return this.http.get<Pproduct[]>(this.urlEndPoint).pipe(
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
