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
        data: { 
            email: $('#email').val(), 
            password: $('#password').val(),
            remember_me: $('#remember_me').val() == 'on'? true : false
        },
        success: function(result) {
            var access_token =  result.access_token; 

        },
        error: function(data,status,er) {
            console.log(data);
        }
    });
}