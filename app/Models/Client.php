<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'company_id',
        'first_name',
        'last_name',
        'phone',
        'address',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function sentShipments()
    {
        return $this->hasMany(Shipment::class, 'sender_id');
    }

    public function receivedShipments()
    {
        return $this->hasMany(Shipment::class, 'receiver_id');
    }

    // Accessor
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
