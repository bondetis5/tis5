import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BaseComponent } from '../shared/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {

  constructor() 
  { 
    super()
  }

  ngOnInit() {

  }

  login(){
    
  }
}
