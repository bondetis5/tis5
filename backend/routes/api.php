<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'prefix' => 'user',
    'middleware' => 'auth:api'
], function () {

    Route::post('encontrarmatch', 'UserController@encontrarMatch');
    Route::post('alterardados', 'UserController@alterarDados');
    Route::post('usuarioonline', 'UserPresenceController@usuarioOnline');
    Route::post('removeramigo', 'UserController@removerAmigo');
    Route::post('adicionaramigo', 'UserController@addAmigo');
    Route::post('buscaramigos', 'UserController@buscarAmigos');
    Route::post('getUserInfoR', 'LeagueController@getUserInfoR');
    Route::post('getSummonerElo', 'LeagueController@getSummonerElo');
    Route::post('getChampionMastery', 'LeagueController@getChampionMastery');
});

Route::group([
    'prefix' => 'avaliacao',
    'middleware' => 'auth:api'
], function () {

    Route::post('buscaravaliacao', 'AvaliacaoController@buscarAvaliacao');
    Route::post('adicionaravaliacao', 'AvaliacaoController@adicionarAvaliacao');

});