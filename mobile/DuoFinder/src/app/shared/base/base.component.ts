import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  public exibirAlertaErro(mensagem: string){
    alert( mensagem);
  }

}
