<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'origin_office_id',
        'destination_office_id',
        'delivery_address',
        'weight_kg',
        'price',
        'status',
        'courier_id',
        'registered_by',
    ];

    protected $casts = [
        'weight_kg' => 'decimal:2',
        'price' => 'decimal:2',
    ];

    // Relationships
    public function sender()
    {
        return $this->belongsTo(Client::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(Client::class, 'receiver_id');
    }

    public function originOffice()
    {
        return $this->belongsTo(Office::class, 'origin_office_id');
    }

    public function destinationOffice()
    {
        return $this->belongsTo(Office::class, 'destination_office_id');
    }

    public function courier()
    {
        return $this->belongsTo(Employee::class, 'courier_id');
    }

    public function registeredBy()
    {
        return $this->belongsTo(Employee::class, 'registered_by');
    }

    // Scopes
    public function scopeRegistered($query)
    {
        return $query->where('status', 'registered');
    }

    public function scopeInTransit($query)
    {
        return $query->where('status', 'in transit');
    }

    public function scopeDelivered($query)
    {
        return $query->where('status', 'delivered');
    }

    public function scopeBySender($query, $clientId)
    {
        return $query->where('sender_id', $clientId);
    }

    public function scopeByReceiver($query, $clientId)
    {
        return $query->where('receiver_id', $clientId);
    }
}
