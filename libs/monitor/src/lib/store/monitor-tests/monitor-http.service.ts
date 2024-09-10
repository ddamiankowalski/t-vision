import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MonitorHttpService {
  private _http = inject(HttpClient);

  public getPackages(): Observable<any> {
    return this._http.get('packages');
  }
}
