import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { TestRun } from '../../types/test-run';
import { PackageName } from '../../types/package';

@Injectable({ providedIn: 'root' })
export class TestRunHttpService {
  private _http = inject(HttpClient);
  private _socket = inject(Socket);
  private _prefix = 'api/test-run';

  public getTestRuns(): Observable<TestRun[]> {
    return this._http.get<TestRun[]>(this._prefix);
  }

  public getLastTestRun(packageName: string): Observable<TestRun> {
    return this._http.get<TestRun>(`${this._prefix}/last/${packageName}`);
  }

  public getTestRunStart$(): Observable<PackageName> {
    return this._socket.fromEvent('test-run-start');
  }

  public getTestRunEnd$(): Observable<TestRun> {
    return this._socket.fromEvent('test-run-end');
  }
}
