<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'office_id',
        'first_name',
        'last_name',
        'phone',
        'position',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function registeredShipments()
    {
        return $this->hasMany(Shipment::class, 'registered_by');
    }

    public function deliveredShipments()
    {
        return $this->hasMany(Shipment::class, 'courier_id');
    }

    // Helper Methods
    public function isCourier(): bool
    {
        return $this->position === 'courier';
    }

    public function isOfficeStaff(): bool
    {
        return $this->position === 'office_staff' || $this->position === 'office';
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    // Scopes
    public function scopeCouriers($query)
    {
        return $query->where('position', 'courier');
    }

    public function scopeOfficeStaff($query)
    {
        return $query->whereIn('position', ['office_staff', 'office']);
    }
}
