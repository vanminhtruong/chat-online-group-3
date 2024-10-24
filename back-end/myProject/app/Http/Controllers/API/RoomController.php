<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Support\Facades\Validator;

class RoomController extends RoutingController
{
    public function index()
    {
        $rooms = Room::with(['creator', 'members', 'messages'])->get();
        return response()->json($rooms, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'created_by' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $room = Room::create($request->all());
        return response()->json($room, 201);
    }

    public function show($id)
    {
        $room = Room::with(['creator', 'members', 'messages'])->find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        return response()->json($room, 200);
    }

    public function update(Request $request, $id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'created_by' => 'sometimes|required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $room->update($request->all());
        return response()->json($room, 200);
    }

    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->delete();
        return response()->json(['message' => 'Room deleted successfully'], 200);
    }

    public function leaveRoom(Request $request, $roomId)
    {
        $validator = Validator::make([
            'user_id' => $request->user_id,
            'room_id' => $roomId
        ], [
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $room = Room::find($roomId);
        
        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        // Kiểm tra xem user có phải là thành viên của room không
        $isMember = $room->members()->where('user_id', $request->user_id)->exists();
        
        if (!$isMember) {
            return response()->json(['message' => 'User is not a member of this room'], 403);
        }

        $room->members()->detach($request->user_id);

        return response()->json(['message' => 'Successfully left the room','anh bruno đã thành công' => 'rực rỡ'], 200);
    }
}
