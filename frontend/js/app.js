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
}

function register(){
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
}

function getInfoUser(){
    var access_token = localStorage.getItem('access_token');
    var token_type = localStorage.getItem('token_type');
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getUserInfo"
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
}



function verificaLogin(){
    if(!(localStorage.getItem('access_token'))){
        window.location.href = 'login.html';
    }else{
        app.league_name = localStorage.getItem('league_name');
    }
}

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
