<?php
/**
 * Created by PhpStorm.
 * User: brian
 * Date: 02/05/2019
 * Time: 19:47
 */

namespace App\Http\Controllers;

use App\Avaliacao;
use App\User;
use Illuminate\Http\Request;

class AvaliacaoController {

    public function adicionarAvaliacao(Request  $request) {

        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
        ];

        try {

            $user = User::where('league_name', $request->nick)->first();
            $avaliado = User::where('league_name', $request->nickavaliado)->first();

            if (empty($user) || empty($avaliado)) {
                throw new \Exception("League Name não encontrado.");
            }

            if (empty($request->avaliacao) || $request->avaliacao > 5 || $request->avaliacao < 0) {
                throw new \Exception("Avaliação inválida.");
            }

            $avaliacoes = Avaliacao::where('id_user', $user->id)->where('id_user_avaliado', $avaliado->id)->get();

            if (sizeof($avaliacoes) > 0) {
                $avaliacao = $avaliacoes[0];
                $avaliacao->avaliacao = $request->avaliacao;
                $avaliacao->save();
                $retorno['message'] = "Avaliação salva com sucesso. Avaliador já tinha  avaliado esse usuário. Nota foi alterada.";
            } else {
                $avaliacao = new Avaliacao();
                $avaliacao->id_user = $user->id;
                $avaliacao->id_user_avaliado = $avaliado->id;
                $avaliacao->avaliacao = $request->avaliacao;
                $avaliacao->save();
                $retorno['message'] = "Avaliação salva com sucesso.";
            }

            $retorno['status'] = true;
        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }

    public function buscarAvaliacao(Request  $request) {

        $retorno = [
            'message' => "Não inicializado",
            'status'  => false,
        ];

        try {

            if  (empty($request->nick)) {
                throw new \Exception("Nick não enviado.");
            }

            $user = User::where('league_name', '=', $request->nick)->first();

            if (empty($user)) {
                throw new \Exception("League name não encontrado.");
            }

            $avaliacoes = Avaliacao::where('id_user', $user->id)->get();

            $totalAvaliacoes = sizeof($avaliacoes) == 0 ? 1 : sizeof($avaliacoes);
            $somaAvaliacoes = 0;

            foreach ($avaliacoes as $avaliacao) {
                $somaAvaliacoes += $avaliacao->avaliacao;
            }

            $avaliacaoFinal = $somaAvaliacoes/$totalAvaliacoes;

            $retorno['data'] = array('nick' => $user->league_name, 'avaliacao' => $avaliacaoFinal);
            $retorno['message'] = "Avaliação recuperada com sucesso";
            $retorno['status'] = true;
        } catch(\Exception $e) {
            $retorno['message'] = $e->getMessage();
            $retorno['status'] = false;
        }

        return response()->json($retorno, 200);
    }

}