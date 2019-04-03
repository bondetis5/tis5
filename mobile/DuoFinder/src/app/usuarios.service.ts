import { Injectable } from '@angular/core';
import { UserModel } from './shared/models/userModel';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLoginModel } from './shared/models/usuarioLoginModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = 'http://localhost:8000/api/auth/';

  constructor(private http: HttpClient) { }

  registrar(user: UserModel) {
    return this.http.post<any>(this.baseUrl + 'signup', user, httpOptions);
  }

  login(email: string, password: string) {
    return this.http.post<UsuarioLoginModel>(this.baseUrl + 'login', {email, password}, httpOptions);
  }
}
