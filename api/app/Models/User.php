<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'url',
        'url_summary_detail'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];

    public function members()
    {
        return $this->hasMany(Member::class, 'broker_id');
    }

    public function specialCases()
    {
        return $this->hasMany(SpecialCase::class, 'broker_id');
    }

    public function isAdmin()
    {
        return !!$this->is_admin;
    }

    public function iHaveAcceptedTermsAndConditions()
    {
        return $this->terms;
    }

    public function incentiveTable()
    {
        return $this->morphOne(File::class, 'fileable')->where('relationship_type', 'incentive_table');
    }

}
