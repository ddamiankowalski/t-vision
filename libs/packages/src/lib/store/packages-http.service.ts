import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PackagesHttpService {
  private _httpClient = inject(HttpClient);

  public getPackages(): Observable<
}
