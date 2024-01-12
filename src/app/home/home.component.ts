import { Component } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { NewsData } from '../interfaces/INewsData';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppState, adicionarNovoItem } from '../store/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  data: NewsData | undefined;

  constructor(
    private getNewsService: GetNewsService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private store: Store<{ app: IAppState }>,
    private router: Router
  ) {}

  adicionarItem(data: any) {
    const novoItem = data;
    this.store.dispatch(adicionarNovoItem({ item: novoItem }));
    this.router.navigate(['/datail']);
  }

  ngOnInit(): void {
    if (this.data === undefined) {
      this.spinner.show();
      this.getNewsService.getNews().subscribe((response: NewsData) => {
        response.articles.forEach((article) => {
          const formattedDate = this.datePipe.transform(
            article.publishedAt,
            'yyyy/MM/dd : HH:mm'
          );
          if (formattedDate !== null) {
            article.publishedAt = formattedDate;
          } else {
            console.error('Erro ao formatar a data');
          }
        });

        setTimeout(() => {
          this.data = response;
          this.spinner.hide();
        }, 3000);
      });
    }
  }
}
