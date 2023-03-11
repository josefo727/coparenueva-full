<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class UserIncentiveTableController extends Controller
{
    public function show(Request $request)
    {
        $id = $request->id;
        $user = !is_null($id) ? User::find($id) : auth()->user();
        $file = $user->incentiveTable;
        if ($file) {
            return response()->json(['url' => Storage::url($file->path)]);
        } else {
            return response()->json(['url' => null]);
        }
    }

    public function update(Request $request)
    {
        $user = User::find($request->userId);
        $file = $request->file('image');

        if (!$file->isValid() || !in_array($file->getMimeType(), ['image/png', 'image/jpeg', 'image/gif'])) {
            return response()->json(['error' => 'El archivo debe ser una imagen válida.'], Response::HTTP_BAD_REQUEST);
        }

        $existingFile = $user->incentiveTable;
        if ($existingFile) {
            Storage::delete($existingFile->path);
            $existingFile->delete();
        }

        $path = $file->store('incentive-tables');
        $file = new File([
            'path' => $path,
            'relationship_type' => 'incentive_table',
            'relationship_id' => $user->id
        ]);

        $user->incentiveTable()->save($file);

        return response()->json(['success' => true]);
    }
}
