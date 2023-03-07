<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kpi;
use Illuminate\Http\JsonResponse;

class BrokerKpiController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(): JsonResponse
    {
        $brokerId = auth()->user()->id;

        $kpi = Kpi::where('broker_id', $brokerId)->first();

        if (is_null($kpi)) {
            return response()->json([
                'success' => false,
            ]);
        }

        $renewalRate = ($kpi->renewed_policies / $kpi->renewal_target_audience) * 100;

        $incentiveLevel = null;
        switch (true) {
            case ($renewalRate >= 70 && $renewalRate < 81):
                $incentiveLevel = 1;
                break;
            case ($renewalRate >= 81 && $renewalRate < 91):
                $incentiveLevel = 2;
                break;
            case ($renewalRate >= 91 && $renewalRate <= 100):
                $incentiveLevel = 3;
                break;
        }

        $approximateIncentiveValue = $kpi->incentive_percentage * $kpi->renewed_premium;

        return response()->json([
            'success' => true,
            'renewal_target_audience' => $kpi->renewal_target_audience,
            'renewed_policies' => $kpi->renewed_policies,
            'renewed_premium' => $kpi->renewed_premium,
            'incentive_percentage' => $kpi->incentive_percentage,
            'canceled_policies' => $kpi->canceled_policies,
            'renewal_rate' => intval($renewalRate, 2),
            'incentive_level' => $incentiveLevel,
            'approximate_incentive_value' => $approximateIncentiveValue,
        ]);
    }
}
