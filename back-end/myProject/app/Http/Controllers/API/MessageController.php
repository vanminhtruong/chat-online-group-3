<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Support\Facades\Validator;

class MessageController extends RoutingController
{
    /**
     * Display a listing of the messages.
     */
    public function index(Request $request)
    {
        // Số lượng tin nhắn trên mỗi trang (mặc định là 10)
        $perPage = $request->input('per_page', 10);
        
        $messages = Message::with(['sender', 'receiver', 'room'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
        return response()->json($messages, 200);
    }

    /**
     * Store a newly created message in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sender_id'   => 'required|exists:users,id',
            'receiver_id' => 'nullable|exists:users,id',
            'room_id'     => 'nullable|exists:rooms,id',
            'content'     => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $message = Message::create($request->all());
        return response()->json($message, 201);
    }

    public function show($id)
    {
        $message = Message::with(['sender', 'receiver', 'room'])->find($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        return response()->json($message, 200);
    }

    public function update(Request $request, $id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'sender_id'   => 'sometimes|required|exists:users,id',
            'receiver_id' => 'sometimes|nullable|exists:users,id', 
            'room_id'     => 'sometimes|nullable|exists:rooms,id',  
            'content'     => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $message->update($request->all());
        return response()->json($message, 200);
    }

    public function destroy($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        $message->delete();
        return response()->json(['message' => 'Message deleted successfully'], 200);
    }
}
