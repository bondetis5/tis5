<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model {
    use Notifiable;

    protected $table = 'avaliacoes';

    public function user() {
        return $this->belongsTo('App\User', 'id_user', 'id');
    }
}
