<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Month;
use Illuminate\Http\Response;

class MonthController extends Controller
{
    public function index()
    {
        $service = new Month();
        $months = $service->getAllOptions();
        return response()->json($months, Response::HTTP_OK);
    }
}
