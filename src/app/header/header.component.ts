import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isLogin: boolean = false;
  isSearchExpanded: boolean = false;

  ngOnInit(): void {
    let isLogin = localStorage.getItem('login');
    if (isLogin === 'sim') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  loginClick() {
    this.router.navigate(['/login']);
  }

  logOutClick() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  expandSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
    const inputElement = document.getElementById('input');
    if (inputElement) {
      inputElement.style.display = this.isSearchExpanded ? 'block' : 'none';
    }
  }
}
