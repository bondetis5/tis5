<?php

namespace App\Http\Controllers;

use App\UserRank;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;

class LeagueController extends Controller
{
    const BASE_URL = 'https://br1.api.riotgames.com/';
    const RESULTADO_NEUT = "0";
    const RESULTADO_OK   = "1";
    const RESULTADO_FAIL = "2";
    public function __construct()
    {
        //
    }
    public function getUserId($name, $user = null) {
        $user = empty($user) ? Auth::user() : $user;

        $retorno = array(
            "status" => self::RESULTADO_NEUT
        );

        $result = $this->getUserInfo($name);

        if ($result["status"]) {
            $userInfo = $result["data"];
            if ($userInfo != null) {

                $user->league_id            = $userInfo->id;
                $user->league_accountid     = $userInfo->accountId;
                $user->league_name          = $userInfo->name;
                $user->league_profileiconid = $userInfo->profileIconId;
                $user->league_summonerlevel = $userInfo->summonerLevel;

                $retorno["status"] = self::RESULTADO_OK;
                $retorno["mensagem"] = "Dados recuperados com sucesso";
            } else {
                $retorno["mensagem"] = $result["mensagem"];
                $retorno["status"] = self::RESULTADO_FAIL;
            }
        } else {
            $retorno["mensagem"] = $result["mensagem"];
            $retorno["status"] = self::RESULTADO_FAIL;
        }

        return $retorno;
    }
    public function getUserInfo($name)
    {
        $response = array(
            "status" => false,
            "mensagem" => "",
            "data" => []
        );
        $url = self::BASE_URL . "lol/summoner/v4/summoners/by-name/" . $name;
        $headers = ['headers' => [
            'Origin' => 'http://match.maker',
            'Accept-Charset' => 'application/x-www-form-urlencoded; charset=UTF-8',
            "Accept-Language" => "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            'X-Riot-Token' => LeagueController::apikey()
        ]
        ];
        $client = new Client();

        $response = array();

        try {
            $responseGet = $client->request('GET', $url, $headers);
            if ($responseGet->getStatusCode() == 200) {
                $retorno = json_decode($responseGet->getBody()->getContents());
                $response["data"] = $retorno;
                $response["status"] = true;
                $response["mensagem"] = "Dados recuperados com sucesso";

            } else if ($responseGet->getStatusCode() == 404) {
                $response["data"] = null;
                $response["status"] = false;
                $response["mensagem"] = "O usuário informado não existe.";
            }
        } catch (\Exception $e) {
            if($e->getCode() == 404)
                $response["mensagem"] = "Usuário League of Legends não existe.";
            else
                $response["mensagem"] = $e->getMessage();
            $response["status"] = false;
        }

        return $response;
    }
    public function getRank() {
        $response = null;
        $user = Auth::user();
        $ranks = UserRank::find($user->league_id);
        if (sizeof($ranks) == 0) {
            $ranks = Auth::user()->retrieveRank();
            foreach ($ranks as $queue) {
                $user_rank = new UserRank();
                $rank = [
                    'league_id' => $queue->playerOrTeamId,
                    'leagueName' => $queue->leagueName,
                    'tier' => $queue->tier,
                    'queueType' => $queue->queueType,
                    'rank' => $queue->rank,
                    'leaguePoints' => $queue->leaguePoints,
                    'wins' => $queue->wins,
                    'losses' => $queue->losses,
                    'veteran' => $queue->veteran,
                    'inactive' => $queue->inactive,
                    'freshBlood' => $queue->freshBlood,
                    'hotStreak' => $queue->hotStreak,
                ];
                $user_rank->league_id       = $rank['league_id'];
                $user_rank->leagueName      = $rank['leagueName'];
                $user_rank->tier            = $rank['tier'];
                $user_rank->rank            = $rank['rank'];
                $user_rank->leaguePoints    = $rank['leaguePoints'];
                $user_rank->wins            = $rank['wins'];
                $user_rank->losses          = $rank['losses'];
                $user_rank->veteran         = $rank['veteran'];
                $user_rank->inactive        = $rank['inactive'];
                $user_rank->freshBlood      = $rank['freshBlood'];
                $user_rank->hotStreak       = $rank['hotStreak'];
                $user_rank->queueType       = $rank['queueType'];
                $user->ranks()->save($user_rank);
            }
        }
        if(sizeof($ranks) > 0) {
            $response = $ranks->tier." ".$ranks->rank;
        } else {
            $response = null;
        }
        return $response;
    }
    private function retrieveRank() {
        $user = Auth::user();
        $url = self::BASE_URL . "/league/v3/positions/by-summoner/" . $user->league_id;
        $headers = ['headers' => [
            'Origin' => 'http://match.maker',
            'Accept-Charset' => 'application/x-www-form-urlencoded; charset=UTF-8',
            "Accept-Language" => "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            'X-Riot-Token' => LeagueController::apikey()
        ]
        ];
        $client = new Client();
        try {
            $response = $client->request('GET', $url, $headers);
            if ($response->getStatusCode() == 200) {
                $response = json_decode($response->getBody()->getContents());
            }
        } catch (\Exception $e) {
            $response = null;
        }
        return $response;
    }
    public function getMatches($matchid) {
        $user = Auth::user();
        $accountid = $user->league_accountid;
        $response = null;
        if (empty($matchid)) {
            $url = self::BASE_URL . "/match/v3/matchlists/by-account/" . $accountid . "?queue=420";
        } else {
            $url = self::BASE_URL . "/match/v3/matches/" . $matchid;
        }
        $headers = ['headers' => [
            'Origin' => 'http://match.maker',
            'Accept-Charset' => 'application/x-www-form-urlencoded; charset=UTF-8',
            "Accept-Language" => "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            'X-Riot-Token' => LeagueController::apikey()
        ]
        ];
        $client = new Client();
        try {
            $response = $client->request('GET', $url, $headers);
            if ($response->getStatusCode() == 200) {
                $response = json_decode($response->getBody()->getContents());
            }
        } catch (\Exception $e) {
            $response = null;
        }
        return $response;
    }
    private static function apikey() {
        return env('LEAGUE_KEY');
    }
    private static function url() {
        return env('APP_URL');
    }
}