<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Support\Facades\Validator;

class MessageController extends RoutingController
{
    public function index(Request $request)
    {
        $messages = Message::select('id', 'sender_id', 'receiver_id', 'room_id', 'content', 'created_at', 'updated_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10); 

        return response()->json([
            'data' => $messages->items(),
            'pagination' => [
                'total' => $messages->total(),
                'per_page' => $messages->perPage(),
                'current_page' => $messages->currentPage(),
                'last_page' => $messages->lastPage(),
                'from' => $messages->firstItem(),
                'to' => $messages->lastItem()
            ]
        ], 200);
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
