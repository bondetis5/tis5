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
            var access_token =  result.access_token; 

        },
        error: function(data,status,er) {
            console.log(data);
        }
    });
}