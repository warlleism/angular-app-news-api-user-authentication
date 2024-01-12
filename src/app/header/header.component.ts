import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  loginClick() {
    this.router.navigate(['/login']);
  }

  logOutClick() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  isLogin: boolean = false;

  ngOnInit(): void {
    let isLogin = localStorage.getItem('login');
    if (isLogin === 'sim') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
