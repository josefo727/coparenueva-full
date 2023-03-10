<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        /*'name',*/ 'path', 'fileable_id', 'fileable_type', 'relationship_type'
    ];

    public function fileable()
    {
        return $this->morphTo();
    }
}
