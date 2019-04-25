import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/base/base.component';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { CompanheiroModel } from '../shared/models/companheiroModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {
  league_name: string;
  modo_tela: string;

  matchForm = this.fb.group({
    roleUsuario: ['', Validators.required],
    roleComp: this.fb.array([false, false, false, false, false]),
    minLevelP: ['', Validators.required],
    maxLevelP: ['', Validators.required],
  });

  tiposCompanheiros = ['BOT', 'SUPORTE', 'TOPO', 'MEIO', 'SELVA'];

  listaCompanheirosEncontrados = new Array<CompanheiroModel>();

  constructor(private usuariosService: UsuariosService, public sb: MatSnackBar, private fb: FormBuilder) {
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
  }

  trocarModoTela(modo: string){
    this.modo_tela = modo;
  }

  encontrarMatch(){
    if(!this.matchForm.invalid) {
      const dados = new ModelMatch();
      dados.roleUsuario = this.matchForm.value.roleUsuario;
      dados.roleComp = this.montarDadosCompanheiros();
      dados.minLevelP = this.matchForm.value.minLevelP;
      dados.maxLevelP = this.matchForm.value.maxLevelP;

      this.usuariosService.encontrarMatch(dados).subscribe(
        sucesso => {
          if (sucesso.data.length <= 0) {
            this.exibirAlertaErro('Não foi encontrado nenhum jogador com as características desejadas.')
          } else {
            this.listaCompanheirosEncontrados = sucesso.data;
          }
        },
        erro => {
          this.exibirAlertaErro(erro.error.message);
        }
      );
    } else{
      this.exibirAlertaErro('todos os campos são obrigatórios');
    }
  }

  montarDadosCompanheiros(){
    const aux = this.matchForm.value.roleComp;
    let dados = new Array<string>();
    for (let i = 0; i < aux.length; i++) {
      if (aux[i] === true) {
        dados.push(this.tiposCompanheiros[i]);
      }
    }

    return dados;
  }

}

class ModelMatch {
  roleUsuario: string;
  roleComp: string[];
  minLevelP: string;
  maxLevelP: string;
}
