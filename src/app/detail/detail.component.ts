import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/app.state';
import { map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass'],
})
export class DetailComponent implements OnInit {
  items: any[] = [];

  constructor(private store: Store<{ app: IAppState }>) {}

  ngOnInit(): void {
    this.store
      .select('app')
      .pipe(map((appState) => appState.items))
      .subscribe((items) => {
        this.items = items;
      });
  }
}
