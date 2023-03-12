<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\KpiFormRequest;
use App\Models\Kpi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class KpiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $brokerId = $request->brokerId ?? null;
        $kpis = Kpi::query()
            ->when(!auth()->user()->isAdmin(), function($query) {
                $query->where('broker_id', auth()->user()->id);
            })
            ->when(!!$brokerId, function($query) use ($brokerId) {
                $query->where('broker_id', $brokerId);
            })
            ->get();

        return response()->json($kpis);
    }

    public function store(KpiFormRequest $request): JsonResponse
    {
        if ($this->isNotAuthorized()) {
            return $this->prohibitedAccess();
        }

        $data = $request->validated();

        $kpi = Kpi::updateOrCreate(
            [
                'broker_id' => $data['broker_id'],
                'month' => $data['month']
            ],
            $data
        );

        return response()->json($kpi, 201);
    }

    public function show(Kpi $kpi): JsonResponse
    {
        if ($this->isNotAuthorized() && $kpi->broker_id !== auth()->user()->id) {
            return $this->prohibitedAccess();
        }

        return response()->json($kpi);
    }

    public function kpisUser($id): JsonResponse
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
