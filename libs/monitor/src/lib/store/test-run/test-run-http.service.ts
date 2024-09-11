import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestRun } from '../../types/test-run';

@Injectable({ providedIn: 'root' })
export class TestRunHttpService {
  private _http = inject(HttpClient);

  public getTestRuns(): Observable<TestRun[]> {
    return this._http.get<TestRun[]>('api/test-run');
  }
}
