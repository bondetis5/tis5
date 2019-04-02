import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { UserModel } from '../shared/models/userModel';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  usuario: UserModel;
  userForm = this.fb.group({
    name: ['', Validators.required],
    league_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required]
  });

  constructor(private usuariosService: UsuariosService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  validarDadosUsuario(){
    if(this.userForm.invalid){

    } else {
      this.usuario = new UserModel({
        name: this.userForm.value.name,
        league_name: this.userForm.value.league_name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        password_confirmation: this.userForm.value.password_confirmation,
      });

      this.registrar();
    }
  }
  registrar() {
    this.usuariosService.registrar(this.usuario).subscribe(
      sucesso => {
        if(sucesso.status === true) {

        } else {

        }
      },
      erro => {

      
      }); 
  }

}
