<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberFormRequest;
use App\Models\Member;
use Illuminate\Http\Response;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::where('broker_id', auth()->id())->get();

        return response()->json(['data' => $members], Response::HTTP_OK);
    }

    public function store(MemberFormRequest $request)
    {
        $member = Member::create($request->validated());

        return response()->json($member, Response::HTTP_CREATED);
    }

    public function show(Member $member)
    {
        return response()->json($member, Response::HTTP_OK);
    }

    public function update(MemberFormRequest $request, Member $member)
    {
        $member->update($request->validated());
        return response()->json($member, Response::HTTP_ACCEPTED);
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
