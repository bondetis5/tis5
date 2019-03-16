<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class UserRank extends Model {

    protected $table = 'users_rank';
    protected $primaryKey = 'league_id';
    protected $fillable = [
        'league_id', 'leagueName', 'tier', 'queueType', 'rank', 'leaguePoints',
        'wins', 'losses', 'veteran', 'inactive', 'freshBlood', 'hotStreak'
    ];
    public function user()
    {
        return $this->belongsTo('App\User', 'league_id', 'id');
    }
}