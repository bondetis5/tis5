export class UsuarioLoginModel {
    access_token: string;
    status: string;
    token_type: string;
    league_name: string;
    expires_at: string;

    constructor(usuarioLogin: UsuarioLoginModel){
        this.access_token = usuarioLogin.access_token;
        this.status = usuarioLogin.status;
        this.token_type = usuarioLogin.token_type;
        this.league_name = usuarioLogin.league_name;
        this.expires_at = usuarioLogin.expires_at;
    }
}