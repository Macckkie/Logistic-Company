<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Office extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
        'city',
        'address',
        'phone',
    ];
    
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }


    
}