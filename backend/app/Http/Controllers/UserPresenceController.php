<?php
/**
 * Created by PhpStorm.
 * User: brian
 * Date: 30/03/2019
 * Time: 13:29
 */

namespace App\Http\Controllers;

use App\Events\UsuarioOnline;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPresenceController {



    public function usuarioOnline(Request $request) {

        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
        ];

        try {

            $user = Auth::user();

//            broadcast(new UsuarioOnline($user))->toOthers();

            $retorno['message'] = "Usuário notificado como online!";
            $retorno['status'] = true;
        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }

}