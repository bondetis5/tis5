import { Injectable } from '@angular/core';
import { UserModel } from './shared/models/userModel';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLoginModel } from './shared/models/usuarioLoginModel';
import { FormGroup } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const access_token = localStorage.getItem('access_token');
const token_type = localStorage.getItem('token_type');

const httpOptionsToken = {headers: new HttpHeaders({'Authorization': token_type + ' ' + access_token, 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  registrar(user: UserModel) {
    return this.http.post<any>(this.baseUrl + 'auth/signup', user, httpOptions);
  }

  login(email: string, password: string) {
    return this.http.post<UsuarioLoginModel>(this.baseUrl + 'auth/login', {email, password}, httpOptions);
  }

  encontrarMatch(dados: any) {
    return this.http.post<any>(this.baseUrl + 'user/encontrarmatch', dados, httpOptionsToken);
  }
}
