import { Component } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { NewsData } from '../interfaces/INewsData';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    private router: Router,
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

        console.log(response);
        this.data = response;
        this.spinner.hide();
      });
    }
  }
}
