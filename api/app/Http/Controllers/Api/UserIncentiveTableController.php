<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class UserIncentiveTableController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        $file = $user->incentiveTable;
        if ($file) {
            return response()->json(['url' => Storage::url($file->path)]);
        } else {
            return response()->json(['url' => null]);
        }
    }

    public function update(Request $request)
    {
        $user = auth()->user();
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
