import { Injectable } from '@angular/core';
import { IAppState, adicionarNovoItem } from '../store/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SetDetailService {

  constructor(
    private store: Store<{ app: IAppState }>,
    private router: Router
  ) {}

  handleNewsInteraction(data: any) {
    const novoItem = data;
    this.store.dispatch(adicionarNovoItem({ item: novoItem }));
    this.router.navigate(['/detail']);
  }
}
