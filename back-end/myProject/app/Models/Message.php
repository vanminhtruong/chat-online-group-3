<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    
    // Biến này xác định rằng mô hình Message không sử dụng các trường created_at và updated_at để theo dõi thời gian tạo và cập nhật bản ghi.
    public $timestamps = true;

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
