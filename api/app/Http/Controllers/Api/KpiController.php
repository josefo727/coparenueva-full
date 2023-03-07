<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\KpiFormRequest;
use App\Models\Kpi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class KpiController extends Controller
{
    public function index(): JsonResponse
    {
        if ($this->isNotAuthorized()) {
            return $this->prohibitedAccess();
        }

        $kpis = Kpi::all();

        return response()->json($kpis);
    }

    public function store(KpiFormRequest $request): JsonResponse
    {
        if ($this->isNotAuthorized()) {
            return $this->prohibitedAccess();
        }

        $kpi = Kpi::create($request->validated());

        return response()->json($kpi, 201);
    }

    public function show(Kpi $kpi): JsonResponse
    {
        if ($this->isNotAuthorized() && $kpi->broker_id !== auth()->user()->id) {
            return $this->prohibitedAccess();
        }

        return response()->json($kpi);
    }

    public function kpiUser($id): JsonResponse
    {
        $kpi = Kpi::query()
            ->where('broker_id', $id)
            ->first();

        return response()->json($kpi);
    }

    public function update(KpiFormRequest $request, Kpi $kpi): JsonResponse
    {
        if ($this->isNotAuthorized()) {
            return $this->prohibitedAccess();
        }

        $kpi->update($request->validated());

        return response()->json($kpi);
    }

    public function destroy(Kpi $kpi): JsonResponse
    {
        if ($this->isNotAuthorized()) {
            return $this->prohibitedAccess();
        }

        $kpi->delete();

        return response()->json(null, 204);
    }

    private function isNotAuthorized()
    {
        return !auth()->user()->isAdmin();
    }

    private function prohibitedAccess()
    {
        return response()->json([
                'message' => 'No autorizado'
            ], Response::HTTP_FORBIDDEN);
    }

}
