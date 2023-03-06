<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use App\Http\Requests\User\CreateFormRequest;
use App\Http\Requests\User\UpdateFormRequest;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()->get();

        return response()->json(['data' => $users], Response::HTTP_OK);
    }

    public function show(User $user)
    {
        return response()->json($user, Response::HTTP_OK);
    }

    public function store(CreateFormRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'terms' => $request->input('terms'),
            'url' => $request->input('url'),
        ]);

        return response()->json($user, Response::HTTP_CREATED);
    }

    public function update(UpdateFormRequest $request, User $user)
    {
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->terms = $request->input('terms');
        $user->url = $request->input('url');
        if ($request->filled('password')) {
            $user->password = bcrypt($request->input('password'));
        }
        $user->save();

        return response()->json($user, Response::HTTP_OK);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
