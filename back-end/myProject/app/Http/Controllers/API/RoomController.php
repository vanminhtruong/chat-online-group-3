<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Support\Facades\Validator;

class RoomController extends RoutingController
{
    /**
     * Display a listing of the rooms.
     */
    public function index()
    {
        $rooms = Room::with(['creator', 'members', 'messages'])->get();
        return response()->json($rooms, 200);
    }

    /**
     * Store a newly created room in storage.
     */
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

    /**
     * Display the specified room.
     */
    public function show($id)
    {
        $room = Room::with(['creator', 'members', 'messages'])->find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        return response()->json($room, 200);
    }

    /**
     * Update the specified room in storage.
     */
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

    /**
     * Remove the specified room from storage.
     */
    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->delete();
        return response()->json(['message' => 'Room deleted successfully'], 200);
    }
}
