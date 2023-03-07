<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'detail',
        'member_id'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($specialCase) {
            if (is_null($specialCase->broker_id)) {
                $specialCase->broker_id = auth()->id();
            }
        });
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
