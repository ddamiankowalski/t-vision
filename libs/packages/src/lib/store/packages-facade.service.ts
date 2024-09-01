import { inject, Injectable } from '@angular/core';
import { PackagesStore } from './packages.store';

@Injectable({ providedIn: 'root' })
export class PackagesFacade {
  private _store = inject(PackagesStore);

  public getPackages(): void {
    this._store.getPackage();
  }
}
