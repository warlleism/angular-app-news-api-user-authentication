import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsData } from '../interfaces/INewsData';

@Injectable({
  providedIn: 'root',
})
export class GetNewsService {
  private apiUrl =
    'https://newsapi.org/v2/everything?q=apple&from=2024-01-09&to=2024-01-09&sortBy=popularity&apiKey=e9bdf4e636a04b4c9514313f0808388d';

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsData> {
    return this.http.get<NewsData>(this.apiUrl);
  }

}
