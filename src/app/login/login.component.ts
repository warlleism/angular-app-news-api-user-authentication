import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  authorizedLogin = false;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password: ['admin', Validators.required],
    });
  }

  loginClick() {
    const { username, password } = this.loginForm.value;
    this.spinner.show();
    if (username && password) {
      localStorage.setItem('login', 'sim');
      setTimeout(() => {
        this.router.navigate(['/home']);
        this.spinner.hide();
      }, 2000);
    } else {
      setTimeout(() => {
        this.spinner.hide();
        Swal.fire({
          title: 'Opps!',
          text: 'Usuário não encontrado.',
          icon: 'warning',
        });
      }, 2000);
    }
  }
}
