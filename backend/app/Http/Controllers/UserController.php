<?php
/**
 * Created by PhpStorm.
 * User: brian
 * Date: 30/03/2019
 * Time: 13:29
 */

namespace App\Http\Controllers;

use App\User;
use App\Amigo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;

class UserController {

    public function encontrarMatch(Request $request) {

        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
        ];

        $defaults_searches = [
            "roles" => ["TOPO", "SELVA", "MEIO", "BOT", "SUPORTE"],
            "minLevel" => 1,
            "maxLevel" => 10000
        ];

        try {
            $searchs = $defaults_searches;
            $user = RequestController::getUsuario();
            if (!empty($request->roles)) {
                RequestController::validarLanes($request->roles);
                $searchs["roles"] = $request->roles;
            }

            if (!empty($request->minLevel)) {
                $searchs['minLevel'] = $request->minLevel;
            }

            if (!empty($request->maxLevel)) {
                $searchs['maxLevel'] = $request->maxLevel;
            }

            $matches = User::whereIn('role_default', $searchs["roles"])
                            ->whereBetween('league_summonerlevel', array($searchs['minLevel'], $searchs['maxLevel']))
                            ->where('id', '<>', $user->id)->get();

            $retorno['message'] = "Usuários recuperados com sucesso";
            $retorno['status'] = true;
            $retorno['data'] = $matches;
        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }

    public function alterarDados(Request $request) {
        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
        ];

        try {
            $user = RequestController::getUsuario();
            RequestController::validarLanes($request->role_default);

            $user->role_default =  $request->role_default;
            $user->save();

            $retorno['message'] = "Usuário alterado com sucesso";
            $retorno['status'] = true;

        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }
    
    public function buscarAmigos(Request $request) {
        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
            'data'    => []
        ];

        try {
            $user = User::where('league_name', $request->nick)->first();
            
            if (empty($user)) {
                throw new \Exception("League Name não encontrado");
            }
            $amigos = Amigo::where('id_user', $user->id)->with('amigo')->get();

            $retorno['data'] = $amigos;
            $retorno['message'] = "Operação realizada com sucesso";
            $retorno['status'] = true;

        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }
    
    public function addAmigo(Request $request) {
        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
            'data'    => []
        ];

        try {
            $user = User::where('league_name', $request->nick)->first();
            $amigo = User::where('league_name', $request->nickamigo)->first();
            
            if (empty($user) || empty($amigo)) {
                throw new \Exception("League Name não encontrado");
            }
            if (Auth::user()->amigo()->where('id_user_amigo','=', $amigo->id)->first()){
                throw new \Exception("Amigo já adicionado");
            }

            $amizade = new Amigo();
            $amizade->id_user = $user->id;
            $amizade->id_user_amigo = $amigo->id;
            $amizade->save();
            
            $retorno['message'] = "Operação realizada com sucesso";
            $retorno['status'] = true;

        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }
        return response()->json($retorno, 200);
    }
    
    public function removerAmigo(Request $request) {
        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
            'data'    => []
        ];

        try {
            $user = User::where('league_name', $request->nick)->first();
            $amigo = User::where('league_name', $request->nickamigo)->first();
            
            if (empty($user) || empty($amigo)) {
                throw new \Exception("League Name não encontrado");
            }
            
            $amizade = Amigo::where('id_user', $user->id)->where('id_user_amigo', $amigo->id)->first();
            
            if (empty($amizade)) {
                throw new \Exception("Amizade não encontrada");
            } else {
                $amizade->delete();
            }
            
            $retorno['message'] = "Operação realizada com sucesso";
            $retorno['status'] = true;

        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }


}