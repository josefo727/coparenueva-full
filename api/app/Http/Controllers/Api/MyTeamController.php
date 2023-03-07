<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;

class MyTeamController extends Controller
{
    /**
     * Get the authenticated user's team members.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = auth()->user();
        $isUser = !$user->isAdmin();

        $members = Member::query()
            ->when($isUser, function($query) use ($user) {
                $query->where('broker_id', $user->id);
            })
            ->select('name', 'id')
            ->get();

        return response()->json($members);
    }
}
