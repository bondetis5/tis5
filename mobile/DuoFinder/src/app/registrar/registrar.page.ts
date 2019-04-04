import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { UserModel } from '../shared/models/userModel';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../shared/base/base.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage extends BaseComponent implements OnInit {
  userForm = this.fb.group({
    name: ['', Validators.required],
    league_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required]
  });

  constructor(private usuariosService: UsuariosService, private fb: FormBuilder, public sb: MatSnackBar) 
  { 
    super(sb)
  }

  ngOnInit() {
  }

  validarDadosUsuario(){
    if(!this.userForm.invalid){
      const usuario = new UserModel({
        name: this.userForm.value.name,
        league_name: this.userForm.value.league_name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        password_confirmation: this.userForm.value.password_confirmation,
      });

      this.registrar(usuario);
    } else {
      this.exibirAlertaErro('Todos os dados devem ser preenchidos!');
    }
  }
  registrar(usuario: UserModel) {
    this.usuariosService.registrar(usuario).subscribe(
      sucesso => {
        if(sucesso.status === true) {

        } else {
          this.exibirAlertaErro(sucesso.message);
        }
      },
      erro => {}
    ); 
  }

}
