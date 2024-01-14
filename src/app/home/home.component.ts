import { Component, Input, Output } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { NewsData } from '../interfaces/INewsData';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { SetDetailService } from '../services/set-detail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  data: NewsData | undefined;
  isDataLoaded: boolean = false;

  constructor(
    private getNewsService: GetNewsService,
    private newsInteractionService: SetDetailService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

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

        this.data = response;
        this.spinner.hide();
      });
    }
  }

  adicionarItem(newsItem: any) {
    this.newsInteractionService.handleNewsInteraction(newsItem);
  }
}
