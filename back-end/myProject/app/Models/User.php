<?php

namespace App\Models;

use Illuminate\Auth\Events\Authenticated;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Model implements Authenticatable
{
    use HasFactory;
    public $timestamps = true;

    protected $fillable = [
        'username',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }


    public function getRememberTokenName()
    {
        return 'remember_token';
    }


    public function rooms()
    {
        return $this->hasMany(Room::class, 'created_by');
    }

    public function roomMemberships()
    {
        return $this->belongsToMany(Room::class, 'room_members', 'user_id', 'room_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}
