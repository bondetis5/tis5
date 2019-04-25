import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/base/base.component';
import { UsuariosService } from '../usuarios.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioLoginModel } from '../shared/models/usuarioLoginModel';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  usuarioLogin: UsuarioLoginModel;
  imagemTroca: string;

  constructor(private usuariosService: UsuariosService, private fb: FormBuilder, public sb: MatSnackBar) 
  { 
    super(sb)
  }

  ngOnInit() {

  }

  login(){
    if(!this.loginForm.invalid) {
      this.usuariosService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        sucesso => {
          this.usuarioLogin = sucesso;
            localStorage.setItem('access_token', this.usuarioLogin.access_token);
            localStorage.setItem('expires_at', this.usuarioLogin.expires_at);
            localStorage.setItem('status', this.usuarioLogin.status);
            localStorage.setItem('token_type', this.usuarioLogin.token_type);  
            localStorage.setItem('league_name', this.usuarioLogin.league_name);  
            window.location.href = "home";
        },
        erro => {
          this.exibirAlertaErro(erro.error.message);
          if(erro.status === 401 && erro.error.iconId) {
            this.imagemTroca = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/' + erro.error.iconId + '.png'
          }
        }
      )
    } else {
      this.exibirAlertaErro('Todos os campos são obrigatórios');
    }
  }
}
