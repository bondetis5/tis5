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
            window.location.href = "index.html"
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
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('expires_at', result.expires_at);
            localStorage.setItem('status', result.status);
            localStorage.setItem('token_type', result.token_type);    
            window.location.href = "index.html"
        },
        error: function(data,status,er) {
            var error = JSON.parse(data.responseText);
            alert(error.message);
            console.log(data);
        }
    });
}