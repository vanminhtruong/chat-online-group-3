<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $hidden = ['created_at', 'updated_at'];

    
    protected $fillable = ['sender_id', 'receiver_id', 'room_id', 'content'];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
