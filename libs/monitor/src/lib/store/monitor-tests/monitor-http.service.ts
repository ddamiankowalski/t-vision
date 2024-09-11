import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestRun } from '../../types/test-run';
import { Package } from '../../types/package';

@Injectable({ providedIn: 'root' })
export class MonitorHttpService {
  private _http = inject(HttpClient);

  public getTestRuns(): Observable<TestRun[]> {
    return this._http.get<TestRun[]>('api/test-run');
  }

  public getPackages(): Observable<Package[]> {
    return this._http.get<Package[]>('api/package');
  }
}
