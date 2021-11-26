import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PconfigService } from './pconfig.service';
import { Manufacturer } from '../model/manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private urlEndPoint: string;

  constructor(private http: HttpClient, private pConfigS: PconfigService) {
    this.urlEndPoint = this.pConfigS.getApiUrl() + '/manufacturer';
  }

  getAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.urlEndPoint).pipe(
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
