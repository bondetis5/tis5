import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  constructor(public sb: MatSnackBar) { }

  ngOnInit() {}

  public exibirAlertaErro(mensagem: string){
    alert(mensagem);
  }

}
