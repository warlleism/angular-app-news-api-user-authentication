import { Component } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { NewsData } from '../interfaces/INewsData';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.data === undefined) {
      this.spinner.show();
      this.getNewsService.getNews().subscribe((response: NewsData) => {
        this.data = response;
        this.spinner.hide();
      });
    }
  }
}
