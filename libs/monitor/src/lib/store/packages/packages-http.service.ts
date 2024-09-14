import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package, PackageStats } from '../../types/package';

@Injectable({ providedIn: 'root' })
export class PackagesHttpService {
  private _http = inject(HttpClient);
  private _prefix = 'api/package';

  public getPackages(): Observable<Package[]> {
    return this._http.get<Package[]>(this._prefix);
  }

  public getPackageStats(packageName: string): Observable<PackageStats> {
    return this._http.get<PackageStats>(`${this._prefix}/stats/${packageName}`);
  }
}
