import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PconfigService {

  constructor() { }

  getApiUrl(): string  {
    return environment.apiUrlDev;
  }
}
