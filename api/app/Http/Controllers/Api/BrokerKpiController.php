<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kpi;
use App\Services\Month;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BrokerKpiController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $value = $request->month;
        $months = app(Month::class)->getMonthsByValue($value);
        $brokerId = auth()->user()->id;


        $kpi = Kpi::query()
            ->select(
                DB::raw('SUM(renewal_target_audience) as renewal_target_audience'),
                DB::raw('SUM(renewed_policies) as renewed_policies'),
                DB::raw('SUM(renewed_premium) as renewed_premium'),
                DB::raw('AVG(incentive_percentage) as incentive_percentage'),
                DB::raw('SUM(canceled_policies) as canceled_policies'),
                DB::raw('LAST_VALUE(broker_id) OVER() as broker_id'),
                DB::raw('LAST_VALUE(updated_at) OVER() as updated_at')
            )
            ->where('broker_id', $brokerId)
            ->whereIn('month', $months)
            ->groupBy('broker_id')
            ->get()->first();

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

        $approximateIncentiveValue = $kpi->incentive_percentage * $kpi->renewed_premium/100;
        $date = $kpi->updated_at;
        $date->locale('es');
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
            'updated_at' => $date->isoFormat('DD [de] MMMM [de] YYYY')
        ]);
    }
}
