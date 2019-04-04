<?php
/**
 * Created by PhpStorm.
 * User: brian
 * Date: 30/03/2019
 * Time: 14:05
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;

class RequestController {

    public static function getUsuario() {
        $user = Auth::user();

        if (empty($user)) {
            throw new \Exception("Não foi possível localizar o usuário da sessão.");
        }

        return $user;
    }

    public static function validarLanes($role_default) {
        $array = [];
        if(gettype($role_default) == 'string') {
            $array[] = $role_default;
        } else {
            $array = $role_default;
        }

        $roles = ["TOPO", "SELVA", "MEIO", "BOT", "SUPORTE"];

        foreach ($array as $role) {
            if (!in_array($role, $roles)) {
                throw new \Exception("Nome da lane inválido: ".$role_default);
            }
        }

        return true;
    }

}