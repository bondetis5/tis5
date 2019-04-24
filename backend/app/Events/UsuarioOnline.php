<?php

namespace App\Events;

use App\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class UsuarioOnline implements ShouldBroadcastNow {

    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn() {
        return new PresenceChannel('usuarios-online');
    }

    public function broadcastWith() {
        return ['user' => $this->user];
    }

    public function broadcastAs() {
        return 'UsuarioOnline';
    }
}
