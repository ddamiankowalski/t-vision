import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../../types/package';

@Injectable({ providedIn: 'root' })
export class PackagesHttpService {
  private _http = inject(HttpClient);

  public getPackages(): Observable<Package[]> {
    return this._http.get<Package[]>('api/package');
  }
}
