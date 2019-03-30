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
    let email = $('#email').val(); 
    let password = $('#password').val(); 
    if (email&&password) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/api/auth/login",
            contentType: "application/json",
            data: JSON.stringify({ 
                email: $('#email').val(), 
                password: $('#password').val()
            }),
            success: function(result) {
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('expires_at', result.expires_at);
                localStorage.setItem('status', result.status);
                localStorage.setItem('token_type', result.token_type);  
                localStorage.setItem('league_name', result.league_name);  
                window.location.href = "index.html";
            },
            error: function(data,status,er) {
                var error = JSON.parse(data.responseText);
                alert(error.message);
                console.log(data);
            }
        });
    }else{
        alert('Todos os campos devem ser informados.');
    }
};

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
                    window.location.href = "login.html";
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

function getInfoUser(){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getUserInfo",
        headers:{
            'Authorization': token_type+" "+access_token
        },
        success: function(result) {
            var resultado = result;
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

function setRole(){
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');
    let role = $('#role');

    let settings = {
        "url": "http://localhost:8000/api/user/alterardados",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "Authorization": token_type + " " + access_token,
        "Content-Type": "application/json"
        },
        "data": JSON.stringify({ 
                roles: $('#roles').val(),
                minLevel: $('#minLevel').val(),
                maxLevel: $('#maxLevel').val() 
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
    let roles = $('#roles').val();
    let minLevel = $('#minLevel').val();
    let maxLevel = $('#maxLevel').val();

    let settings = {
      "url": "http://localhost:8000/api/user/encontrarmatch",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": token_type + " " + access_token,
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({ 
                roles: $('#roles').val(),
                minLevel: $('#minLevel').val(),
                maxLevel: $('#maxLevel').val() 
            }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
};


var app = new Vue({
    el: '#app',
    data:{
        league_name: ''
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
        }
    }
});
