<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'email',
        'phone',
        'website',
    ];

    public function offices()
    {
        return $this->hasMany(Office::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
