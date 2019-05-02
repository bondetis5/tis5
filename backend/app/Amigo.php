<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Amigo extends Model {
    use Notifiable;
    
    public function user() {
        return $this->belongsTo('App\User', 'id_user', 'id');
    }
}
