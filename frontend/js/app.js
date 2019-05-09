//referencia para requisição ajax
// $.ajax({
//     type: "GET",
//     url: "nomerota/",
//     data: JSON.stringify({
//         propriedade: conteudo
//     }),
//     success: function (result) {
//
//     },
//     error: function (data, status, er) {
//
//     }

// });
function login(){
    let emailP = $('#email').val();
    let passwordP = $('#password').val();
    
    if (emailP&&passwordP) {

        $.ajax({
            type: "POST",
            url: "http://localhost:8000/api/auth/login",
            contentType: "application/json",
            data: JSON.stringify({
                email: $('#email').val(),
                password: $('#password').val()
            }),
            success: function(result) {
                if(typeof result == 'string'){
                    alert('Usuario e Senha não encontrados.')
                }else{
                    localStorage.setItem('access_token', result.access_token);
                    localStorage.setItem('expires_at', result.expires_at);
                    localStorage.setItem('status', result.status);
                    localStorage.setItem('token_type', result.token_type);
                    localStorage.setItem('league_name', result.league_name);
                    window.location.href = "index.html";
                }
            },
            error: function(data,status,er) {
                if(data.responseJSON.message != "A conta não foi verificada! Troque o ícone de sua conta para confirmar a validação!"){
                    var modalValidacao = "";
                    modalValidacao += "<div  id='modalValidacao' class='modal' tabindex='-1' role='dialog'>";
                    modalValidacao += "<div class='modal-dialog' role='document'>";
                    modalValidacao += "<div class='modal-content'>";
                    modalValidacao += "<div class='modal-header'>";
                    modalValidacao += "<h5 class='modal-title'>Erro no Login!</h5>";
                    modalValidacao += "<button type='button' class='close' data-dismiss='modal' aria-label='Fechar'>";
                    modalValidacao += "<span aria-hidden='true'>&times;</span>";
                    modalValidacao += "</button>";
                    modalValidacao += "</div>";
                    modalValidacao += "<div class='modal-body'>";
                    modalValidacao += "<p>"+data.responseJSON.message+"</p>";
                    modalValidacao += "</div>";
                    modalValidacao += "<div class='modal-footer'>";
                    modalValidacao += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button>";
                    modalValidacao += "</div>";
                    modalValidacao += "</div>";
                    modalValidacao += "</div>";
                    modalValidacao += "</div>";
                    $('#recebeIcone').html(modalValidacao);
                    $('#modalValidacao').modal('show');
                }
                else {
                    var error = JSON.parse(data.responseText);
                    var img = "";
                    img += "<img class='rounded mx-auto d-block' src=" + "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/" + data.responseJSON.iconId + ".png" + " />";
                    var modalValidacao = "";
                    modalValidacao += "<div  id='modalValidacao' class='modal' tabindex='-1' role='dialog'>";
                    modalValidacao += "<div class='modal-dialog' role='document'>";
                    modalValidacao += "<div class='modal-content'>";
                    modalValidacao += "<div class='modal-header'>";
                    modalValidacao += "<h5 class='modal-title'>Erro na validação!</h5>";
                    modalValidacao += "<button type='button' class='close' data-dismiss='modal' aria-label='Fechar'>";
                    modalValidacao += "<span aria-hidden='true'>&times;</span>";
                    modalValidacao += "</button>";
                    modalValidacao += "</div>";
                    modalValidacao += "<div class='modal-body'>";
                    modalValidacao += "<p>Conta não validada! Faça login no League e troque seu ícone pelo ícone a seguir para realizar a validação.</p>";
                    modalValidacao += img;
                    modalValidacao += "</div>";
                    modalValidacao += "<div class='modal-footer'>";
                    modalValidacao += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button>";
                    modalValidacao += "</div>";
                    modalValidacao += "</div>";
                    modalValidacao += "</div>";
                    modalValidacao += "</div>";
                    $('#recebeIcone').html(modalValidacao);
                    $('#modalValidacao').modal('show');
                }
            }
        });
    }  else{
        alert('Todos os campos devem ser informados.');
    }
}

function checkSummonerIcon(iconID){
    let link = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/" + iconID + ".png";
    console.log(iconID);
    var img = $("<img />").attr('src', 'http://somedomain.com/image.jpg')

}

function register(){
    let name = $('#name').val();
    let league_name = $('#league_name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let password_confirmation = $('#password_confirmation').val();
    if(name&&league_name&&email&&password&&password_confirmation){
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/api/auth/signup",
            contentType: "application/json",
            data: JSON.stringify({
                name: $('#name').val(),
                league_name: $('#league_name').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                password_confirmation: $('#password_confirmation').val()
            }),
            success: function(result) {
                if(result.status){
                    var modalConfirmacao = "";
                    modalConfirmacao += "<div  id='modalConfirmacao' class='modal' tabindex='-1' role='dialog'>";
                    modalConfirmacao += "<div class='modal-dialog' role='document'>";
                    modalConfirmacao += "<div class='modal-content'>";
                    modalConfirmacao += "<div class='modal-header'>";
                    modalConfirmacao += "<h5 class='modal-title'>Sucesso!</h5>";
                    modalConfirmacao += "<button type='button' class='close' data-dismiss='modal' aria-label='Fechar'>";
                    modalConfirmacao += "<span aria-hidden='true'>&times;</span>";
                    modalConfirmacao += "</button>";
                    modalConfirmacao += "</div>";
                    modalConfirmacao += "<div class='modal-body'>";
                    modalConfirmacao += "<p>Usuário criado com sucesso!</p>";
                    modalConfirmacao += "</div>";
                    modalConfirmacao += "<div class='modal-footer'>";
                    modalConfirmacao += "<button type='button' class='btn btn-secondary' onclick='retornaLogin()' data-dismiss='modal'>Fechar</button>";
                    modalConfirmacao += "</div>";
                    modalConfirmacao += "</div>";
                    modalConfirmacao += "</div>";
                    modalConfirmacao += "</div>";
                    $('#recebeModal').html(modalConfirmacao);
                    $('#modalConfirmacao').modal('show');

                }else{
                    alert(result.message);
                }
            },
            error: function(data,status,er) {
                var error = JSON.parse(data.responseText);
                alert(error.message);
                console.log(data);
            }
        });
    }else{
        alert("Todos os campos devem ser informados.");
    }
};
function retornaLogin(){
    window.location.href = "login.html";
}

function getInfoUser(){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    var league_name = localStorage.getItem('league_name');
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/user/getUserInfoR",
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            name: league_name
        }),
        success: function(result) {
            if(result != null || result != ''){
                app.role_default = result.data.role_default;
            }else{
                app.role_default = 'Clique em Editar para selecionar uma posição!';
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    });
};

function adicionarAvaliacao(league_name, nick_avaliado, avaliacao){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/avaliacao/adicionaravaliacao",
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: nick_avaliado,
            nickavaliado: league_name,
            avaliacao: avaliacao
        }),
        success: function(result) {
            if(result != null || result != ''){
                app.message = result.message;
            }else{
                app.message = 'Erro ao adicionar';
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    })
}

function getSummonerElo(nick){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/user/getSummonerElo",
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: nick
        }),
        success: function(result) {
            if(result != null || result != ''){
                app.summonerElo = result.data;
            }else{
                app.message = 'Erro ao buscar as informações';
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    })
}

function getChampionMastery(nick){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/user/getChampionMastery",
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: nick
        }),
        success: function(result) {
            if(result != null || result != ''){
                app.championMastery = result.data;
            }else{
                app.message = 'Erro ao buscar informações';
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    })
}


function getAvaliacaoUser(){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    var league_name = localStorage.getItem('league_name');
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/avaliacao/buscaravaliacao",
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: league_name
        }),
        success: function(result) {
            if(result != null || result != ''){
                app.avaliacao_user = result.data.avaliacao;
            }else{
                app.avaliacao_user = 'N/A';
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    });
};

function getAvaliacaoUserAmigo(){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    var league_name = app.usuarioPerfil;
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/avaliacao/buscaravaliacao",
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: league_name
        }),
        success: function(result) {
            if(result != null || result != ''){
                app.avaliacaoAmigo = result.data.avaliacao;
            }else{
                app.avaliacaoAmigo= 'N/A';
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    });
};

function verificaLogin(){
    if(!(localStorage.getItem('access_token'))){
        window.location.href = 'login.html';
    }else{
        app.league_name = localStorage.getItem('league_name');
    }
};


function deslogar(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('status');
    localStorage.removeItem('token_type');
    localStorage.removeItem('league_name');
    window.location.href= "login.html";
};

function setRole(role){
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');
    let roleP = role;

    let settings = {
        "url": "http://localhost:8000/api/user/alterardados",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            role_default: roleP
        }),
        success: function(result) {
            var resultado = result;
            console.log(resultado);
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    };

    $.ajax(settings);
};

function encontrarMatch(){
    app.companheiros=[];
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');
    let roleUsuario = $('#role-comp').val();
    setRole(roleUsuario);
    let rolesP = []; 
    $.each($("input[name='roles']:checked"), function(){
        rolesP.push($(this).val());
    });
    let minLevelP = parseInt($('#minLevel').val());
    let maxLevelP = parseInt($('#maxLevel').val());

    let settings = {
        "url": "http://localhost:8000/api/user/encontrarmatch",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            roles: rolesP,
            minLevel: minLevelP,
            maxLevel: maxLevelP
        }),
        success: function(result) {
            var resultado = result;
            console.log(resultado);

            if(resultado.data.length>0){
                app.companheirosEncontrados = true;
                resultado.data.forEach(function(companheiro){
                    app.companheiros.push(companheiro);
                });
                semCompanheiro = false;
            }else{
                app.semCompanheiro = true;
                app.companheirosEncontrados = true;
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    };

    $.ajax(settings);
};

function buscarAmigos(){
    let nickP = app.league_name;
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');

    let settings = {
        "url": "http://localhost:8000/api/user/buscaramigos",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: nickP
        }),
        success: function(result) {
            app.companheirosAdd = result.data;
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    };

    $.ajax(settings);

}

function adicionaPessoa(nickAmigoP, league_name){
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');

    let settings = {
        "url": "http://localhost:8000/api/user/adicionaramigo",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: league_name,
            nickamigo: nickAmigoP
        }),
        success: function(result) {
            if(result['status']== false){
                alert(result['message']);
            }
            else{
                console.log(result.data);
            }
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    }

    $.ajax(settings);
}


function removerPessoa(nickAmigoP, league_name){
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');
    let settings = {
        "url": "http://localhost:8000/api/user/removeramigo",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token_type + " " + access_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            nick: league_name,
            nickamigo: nickAmigoP
        }),
        success: function(result) {
            console.log(result.data);
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    }

    $.ajax(settings);
}

function trocaModoApp(modoTela){
    app.modo_tela = modoTela;
}

function trocaModoAppPerfil(modoTela, html){
    app.modo_tela = modoTela;
    app.usuarioPerfil = html.innerText;
    app.summonerElo = getSummonerElo(html.innerText);
    app.championMastery = getChampionMastery(html.innerText);
    getAvaliacaoUserAmigo();
}

function closeSidebar(){
    $("#accordionSidebar").hide();
    $("#showSidebarBtn").show();
}
function showSidebar() {
    $("#accordionSidebar").show();
    $("#showSidebarBtn").hide();
}

var statusButton = 'Ficar Online';

var app = new Vue({
    el: '#app',
    data:{
        league_name: '',
        modo_tela:'jogadoresOnline',
        companheirosEncontrados: false,
        companheiros: [],
        semCompanheiro: false,
        status: 'Offline',
        usuariosOnline: [],
        socket : io('http://localhost:3001'),
        buttonStatus: statusButton,
        companheirosAdd: [],
        role_default: '',
        button_edit: true,
        avaliacao_user: 'N/A',
        message: '',
        championMastery: [],
        summonerElo: [],
        usuarioPerfil:'',
        button_aval: true,
        avaliacaoAmigo:'N/A'
    },

    methods:{
        setButtonA: _=>{
            if(app.achou){
                app.acaoMessage = "Revelar Mensagem"
                app.achou = false;
            }else{
                app.acaoMessage = "Esconder Mensagem"
                app.achou = true;
            }
        },
        alterarStatus(){
            if(app.status=='Online'){
                this.usuarioOff();
            }else{
                this.usuarioOnline();
            }
        },
        usuarioOnline() {
            app.status = 'Online';
            app.buttonStatus = 'Ficar Offline';
            this.socket.emit('USERONLINE', {
                user: this.league_name
            });
        },
        usuarioOff(){
            app.status = 'Offline';
            app.buttonStatus = 'Ficar Online';
            this.socket.emit('USEROFF', {
                user: this.league_name
            });
        },
        verificaOnline(){
            this.socket.emit('INICIALIZA', {});
        },
        adicionarAmigo(nick){
            adicionaPessoa(nick, app.league_name);
        },
        removerAmigo(nick){
            removerPessoa(nick, app.league_name);
        },
        selecionaAvaliacao(){
            if(app.button_aval == true){
                app.button_aval=false;
            }else{
                app.button_aval=true;
            }

        },
        adicionarAvaliacao(){
            var avaliacaoUsuario = $('#avaliacao-usuario').val();
            app.button_aval = true;
            adicionarAvaliacao(app.league_name, app.usuarioPerfil, avaliacaoUsuario)
        },
        editRole(){
            if(app.button_edit){
                app.button_edit = false;
            } else{
                app.button_edit = true;
            }
        },
        saveRole(){
            let roleUsuario = $('#select-role-principal').val();
            app.button_edit = true;
            app.role_default = roleUsuario;
            setRole(roleUsuario);
        }
    },
    mounted() {
        this.socket.on('USERONLINE', (data) => {
            this.usuariosOnline = data;
            data.forEach(function(usuario){
                if(app.league_name == usuario){
                    app.status = 'Online';
                    app.buttonStatus = 'Ficar Offline';
                }
            })
        });
        this.verificaOnline();
        getInfoUser();
        getAvaliacaoUser();
    }


});
