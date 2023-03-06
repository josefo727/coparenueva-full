<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'genre', 'broker_id'];

    public function team()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($member) {
            $member->broker_id = auth()->id();
        });
    }
}
