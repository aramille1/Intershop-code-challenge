import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {  }

  getStores(){
    return this.http.get('https://intershoppwa.azurewebsites.net/INTERSHOP/rest/WFS/inSPIRED-inTRONICS_Business-Site/rest/stores')
      .pipe(
        map((res:any) => Object.values(res))
        )
  }
}
