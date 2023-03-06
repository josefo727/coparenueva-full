<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserTermController extends Controller
{
    /**
     * Get the authenticated user's terms status.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        $user = auth()->user();

        return response()->json([
            'terms' => $user->iHaveAcceptedTermsAndConditions(),
        ]);
    }

    /**
     * Update the authenticated user's terms status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        $validatedData = $request->validate([
            'terms' => 'required|boolean',
        ]);

        $user->terms = $validatedData['terms'];
        $user->save();

        return response()->json([
            'message' => 'Terms status updated successfully.',
            'terms' => $user->terms,
        ]);
    }
}
