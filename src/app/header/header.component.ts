import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { NewsData } from '../interfaces/INewsData';
import { GetNewsService } from '../services/get-news.service';
import { Observable } from 'rxjs';
import { SetDetailService } from '../services/set-detail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(
    private newsInteractionService: SetDetailService,
    private router: Router,
    private getNewsService: GetNewsService,
    private el: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const element = document.getElementsByClassName('input-icon');
    let data1 = element[0];
    let data2 = event.target as HTMLElement;

    if (data1?.className !== data2?.className) {
      if (data2?.className.includes('ng-valid')) {
        this.expandSearch(true);
      } else {
        this.expandSearch(false);
      }
    }
  }

  private data: any[] = [];
  isLogin: boolean = false;
  isSearchExpanded: boolean = false;
  search: string = '';
  searchFilter: any[] = [];

  ngOnInit(): void {
    let isLogin = localStorage.getItem('login');
    if (isLogin === 'sim') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    if (this.data.length === 0) {
      this.getNewsService.getNews().subscribe((response: any) => {
        this.data = response.articles;
      });
    }
  }

  searchNews() {
    const cleanSearchTerm = this.removeSpecialChars(
      this.search.trim().toLowerCase()
    );

    const filteredData = this.data.filter((news) => {
      const cleanTitle = this.removeSpecialChars(news.title.toLowerCase());
      return cleanTitle.includes(cleanSearchTerm);
    });

    this.searchFilter = filteredData;
  }

  removeSpecialChars(str: string) {
    return str.replace(/[^\w\s]/g, '');
  }

  loginClick() {
    this.router.navigate(['/login']);
  }

  logOutClick() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  adicionarItem(newsItem: any) {
    this.newsInteractionService.handleNewsInteraction(newsItem);
  }

  expandSearch(bool: boolean) {
    this.isSearchExpanded = bool;
    const inputElement = document.getElementById('input');
    if (inputElement) {
      inputElement.style.display = this.isSearchExpanded ? 'block' : 'none';
      if (!this.isSearchExpanded) {
        this.search = '';
        this.searchFilter = [];
      }
    }
  }
}
