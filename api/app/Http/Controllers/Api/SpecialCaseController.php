<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SpecialCase;
use App\Http\Requests\SpecialCaseFormRequest;
use Illuminate\Http\Response;

class SpecialCaseController extends Controller
{
    public function index()
    {
        $specialCases = SpecialCase::query()
            ->when(!auth()->user()->isAdmin(), function($query) {
                $query->where('broker_id', auth()->user()->id);
            })
            ->get();

        $specialCases = $specialCases->map(function($sc) {
            return [
                'id' => $sc->id,
                'member_id' => $sc->member_id,
                'name' => $sc->member->name,
                'email' => $sc->email,
                'detail' => $sc->detail,
                'broker_id' => $sc->broker_id
            ];
        });

        return response()->json($specialCases);
    }

    public function store(SpecialCaseFormRequest $request)
    {
        $specialCase = new SpecialCase();
        $specialCase->member_id = $request->input('member_id');
        $specialCase->email = $request->input('email');
        $specialCase->detail = $request->input('detail');
        $specialCase->save();

        return response()->json($specialCase, Response::HTTP_CREATED);
    }

    public function show(SpecialCase $specialCase)
    {
        if ($specialCase->broker_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'id' => $specialCase->id,
            'member_id' => $specialCase->member_id,
            'name' => $specialCase->member->name,
            'email' => $specialCase->email,
            'detail' => $specialCase->detail,
            'broker_id' => $specialCase->broker_id
        ]);
    }

    public function update(SpecialCaseFormRequest $request, SpecialCase $specialCase)
    {
        if ($specialCase->broker_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $specialCase->member_id = $request->input('member_id');
        $specialCase->email = $request->input('email');
        $specialCase->detail = $request->input('detail');
        $specialCase->save();

        return response()->json($specialCase);
    }

    public function destroy(SpecialCase $specialCase)
    {
        if ($specialCase->broker_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $specialCase->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
