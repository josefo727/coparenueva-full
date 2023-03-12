<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kpi extends Model
{
    use HasFactory;

    protected $fillable = [
        'renewal_target_audience',
        'renewed_policies',
        'renewed_premium',
        'incentive_percentage',
        'canceled_policies',
        'broker_id',
        'month'
    ];

    protected $casts = [
        'renewal_target_audience' => 'integer',
        'renewed_policies' => 'integer',
        'renewed_premium' => 'integer',
        'incentive_percentage' => 'float',
        'canceled_policies' => 'integer',
    ];
}
