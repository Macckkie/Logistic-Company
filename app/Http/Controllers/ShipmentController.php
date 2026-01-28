<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\Company;
use App\Models\Office;
use App\Models\Client;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShipmentController extends Controller
{
    const BASE_PRICE_PER_KG = 2.00;
    const OFFICE_DELIVERY_FEE = 1.50;
    const ADDRESS_DELIVERY_FEE = 3.50;
    const MINIMUM_PRICE = 5.00;

    public function index()
    {
        try {
            $user = auth()->user();

            if ($user->role === 'client') {
                $clientId = $user->client->id;
                $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice', 'courier', 'registeredBy'])
                    ->where('sender_id', $clientId)
                    ->orWhere('receiver_id', $clientId)
                    ->get();
            } else {
                $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice', 'courier', 'registeredBy'])
                    ->get();
            }

            return response()->json([
                'success' => true,
                'data' => $shipments
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve shipments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = auth()->user();

            $shipment = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice', 'courier', 'registeredBy'])
                ->findOrFail($id);

            // Client може да вижда само своите пратки
            if ($user->role === 'client') {
                $clientId = $user->client->id;
                if ($shipment->sender_id !== $clientId && $shipment->receiver_id !== $clientId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Access denied'
                    ], 403);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $shipment
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Shipment not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve shipment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sender_id' => 'required|exists:clients,id',
            'receiver_id' => 'required|exists:clients,id',
            'origin_office_id' => 'required|exists:offices,id',
            'destination_office_id' => 'nullable|exists:offices,id',
            'delivery_address' => 'nullable|string|max:50',
            'weight_kg' => 'required|numeric|min:0.1',
            'status' => 'sometimes|in:registered,in transit,delivered',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = auth()->user();
            $employeeId = $user->employee->id;

            $deliveryType = $request->delivery_address ? 'ADDRESS' : 'OFFICE';
            $price = $this->calculatePrice($request->weight_kg, $deliveryType);

            $shipment = Shipment::create([
                'sender_id' => $request->sender_id,
                'receiver_id' => $request->receiver_id,
                'origin_office_id' => $request->origin_office_id,
                'destination_office_id' => $request->destination_office_id,
                'delivery_address' => $request->delivery_address,
                'weight_kg' => $request->weight_kg,
                'price' => $price,
                'status' => $request->status ?? 'registered',
                'registered_by' => $employeeId,
                'courier_id' => $request->courier_id ?? null,
            ]);

            $shipment->load(['sender', 'receiver', 'originOffice', 'destinationOffice', 'registeredBy']);

            return response()->json([
                'success' => true,
                'message' => 'Shipment created successfully',
                'data' => $shipment
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create shipment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'sender_id' => 'sometimes|exists:clients,id',
            'receiver_id' => 'sometimes|exists:clients,id',
            'origin_office_id' => 'sometimes|exists:offices,id',
            'destination_office_id' => 'nullable|exists:offices,id',
            'delivery_address' => 'nullable|string|max:50',
            'weight_kg' => 'sometimes|numeric|min:0.1',
            'status' => 'sometimes|in:registered,in transit,delivered',
            'courier_id' => 'nullable|exists:employees,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $shipment = Shipment::findOrFail($id);

            // Пресметни нова цена ако се променя weight или delivery address
            if ($request->has('weight_kg') || $request->has('delivery_address')) {
                $weight = $request->weight_kg ?? $shipment->weight_kg;
                $deliveryType = ($request->delivery_address ?? $shipment->delivery_address) ? 'ADDRESS' : 'OFFICE';
                $shipment->price = $this->calculatePrice($weight, $deliveryType);
            }

            $shipment->update($request->only([
                'sender_id',
                'receiver_id',
                'origin_office_id',
                'destination_office_id',
                'delivery_address',
                'weight_kg',
                'status',
                'courier_id'
            ]));

            $shipment->load(['sender', 'receiver', 'originOffice', 'destinationOffice', 'courier', 'registeredBy']);

            return response()->json([
                'success' => true,
                'message' => 'Shipment updated successfully',
                'data' => $shipment
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Shipment not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update shipment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $shipment = Shipment::findOrFail($id);
            $shipment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Shipment deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Shipment not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete shipment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsDelivered(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'courier_id' => 'sometimes|exists:employees,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = auth()->user();
            $shipment = Shipment::findOrFail($id);

            $shipment->status = 'delivered';
            $shipment->courier_id = $request->courier_id ?? $user->employee->id;
            $shipment->save();

            $shipment->load(['sender', 'receiver', 'originOffice', 'destinationOffice', 'courier']);

            return response()->json([
                'success' => true,
                'message' => 'Shipment marked as delivered',
                'data' => $shipment
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Shipment not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark shipment as delivered',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateCompany(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'address' => 'required|string|max:50',
            'phone' => 'required|string|max:12',
            'email' => 'required|email|max:50',
            'website' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $company = Company::updateOrCreate(
                ['id' => $request->companyId],
                [
                    'name' => $request->name,
                    'address' => $request->address,
                    'phone' => $request->phone,
                    'email' => $request->email,
                    'website' => $request->website
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Company saved successfully',
                'data' => $company
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save company',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteCompany($companyId)
    {
        try {
            $company = Company::findOrFail($companyId);
            $company->delete();

            return response()->json([
                'success' => true,
                'message' => 'Company deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete company',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateOffice(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|exists:companies,id',
            'name' => 'required|string|max:50',
            'city' => 'required|string|max:50',
            'address' => 'required|string|max:50',
            'phone' => 'required|string|max:12',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $office = Office::updateOrCreate(
                ['id' => $request->officeId],
                [
                    'company_id' => $request->company_id,
                    'name' => $request->name,
                    'city' => $request->city,
                    'address' => $request->address,
                    'phone' => $request->phone,
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Office saved successfully',
                'data' => $office
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save office',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteOffice($officeId)
    {
        try {
            $office = Office::findOrFail($officeId);
            $office->delete();

            return response()->json([
                'success' => true,
                'message' => 'Office deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Office not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete office',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function calculatePrice($weight, $deliveryType)
    {
        $price = $weight * self::BASE_PRICE_PER_KG;

        if ($deliveryType === 'OFFICE') {
            $price += self::OFFICE_DELIVERY_FEE;
        } elseif ($deliveryType === 'ADDRESS') {
            $price += self::ADDRESS_DELIVERY_FEE;
        }

        return max($price, self::MINIMUM_PRICE);
    }
}
