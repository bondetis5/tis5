<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use mysql_xdevapi\Exception;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $status = false;
        $mensagem = 'Não foi possível criar o usuário';
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'league_name' => 'required|string',
        ]);

        $usuarioExistente = User::where('email', '=', $request->email)->first();

        if (empty($usuarioExistente)) {
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $user->league_name = $request->league_name;

            $leagueController = new LeagueController();
            $userIdResultado = $leagueController->getUserId($request->league_name, $user);

            if ($userIdResultado['status'] == LeagueController::RESULTADO_OK) {

                $user->league_profileiconid = rand(0,28);
                $user->save();
                $status = true;
                $mensagem = ['Usuário criado com sucesso!', (string)$user->league_profileiconid];

            } else {
                $mensagem = $userIdResultado["mensagem"];
                $status = false;
            }

        } else {
            $mensagem = "E-mail já cadastrado.";
            $status = false;
        }


        if (gettype($mensagem) != "string") {
            if (count($mensagem) > 0) {
                return response()->json([
                    'message' => $mensagem[0],
                    'iconId' => $mensagem[1],
                    'status' => $status,
                ], 200);
            }
        } else {

            return response()->json([
                'message' => $mensagem,
                'status' => $status,
            ], 200);
        }
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);


        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Senha incorreta'
            ], 401);


        $userLeagueIconId = User::where("email","=", $request->email)->first();

        $leagueController = new LeagueController();
        $userIdResultado = $leagueController->getUserInfo($userLeagueIconId->league_name);
        if ($userLeagueIconId->league_profileiconid != $userIdResultado["data"]->profileIconId) {
            return response()->json([
                'message' => 'A conta não foi verificada! Troque o ícone de sua conta para confirmar a validação!',
                'iconId' => $userLeagueIconId->league_profileiconid
            ], 401);
        }


        $tokenResult = $userLeagueIconId->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        $status = "A";

        if (empty($userLeagueIconId->league_accountid) or empty($userLeagueIconId->league_id)) {
            $status = "I";
        }

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'status' => $status,
            'token_type' => 'Bearer',
            'league_name' => $userLeagueIconId->league_name,
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
