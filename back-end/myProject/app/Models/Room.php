<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['name', 'created_by'];

    protected $hidden = ['created_at', 'updated_at'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'room_members', 'room_id', 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'room_id');
    }
}
