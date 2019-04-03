import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/base/base.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {
  league_name: string;
  constructor(public sb: MatSnackBar) {
    super(sb)
  }

  ngOnInit() {
    this.verificarLogin()
  }

  verificarLogin() {
    if (!localStorage.getItem('access_token')) {
      window.location.href = 'login';
    } else {
      this.league_name = localStorage.getItem('league_name');
    }
  }

  deslogar() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('status');
    localStorage.removeItem('token_type');
    localStorage.removeItem('league_name');
    window.location.href = "login";
  };
}
