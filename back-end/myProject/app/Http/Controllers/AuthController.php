<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users|min:3|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Lỗi xác thực',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Đăng ký thành công',
            'data' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string', // Thay đổi từ email sang username
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Lỗi xác thực',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('username', 'password'))) { // Thay đổi từ email sang username
            return response()->json([
                'message' => 'Tên đăng nhập hoặc mật khẩu không chính xác'
            ], 401);
        }

        $user = User::where('username', $request->username)->first(); // Thay đổi từ email sang username

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'data' => $user
        ], 200);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Đăng xuất thành công'
        ]);
    }
}
