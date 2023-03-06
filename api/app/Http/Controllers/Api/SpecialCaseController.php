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
        $specialCases = auth()->user()->specialCases;

        return response()->json($specialCases);
    }

    public function store(SpecialCaseFormRequest $request)
    {
        $specialCase = new SpecialCase();
        $specialCase->name = $request->input('name');
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

        return response()->json($specialCase);
    }

    public function update(SpecialCaseFormRequest $request, SpecialCase $specialCase)
    {
        if ($specialCase->broker_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $specialCase->name = $request->input('name');
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
