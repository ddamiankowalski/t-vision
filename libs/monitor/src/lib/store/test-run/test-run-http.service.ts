import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestRun } from '../../types/test-run';

@Injectable({ providedIn: 'root' })
export class TestRunHttpService {
  private _http = inject(HttpClient);
  private _prefix = 'api/test-run';

  public getTestRuns(): Observable<TestRun[]> {
    return this._http.get<TestRun[]>(this._prefix);
  }

  public getLastTestRun(packageName: string): Observable<TestRun> {
    return this._http.get<TestRun>(`${this._prefix}/last/${packageName}`);
  }
}
