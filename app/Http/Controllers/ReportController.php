<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\Employee;
use App\Models\Office;
use App\Models\Client;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function getEmployeesByCompany($companyId)
    {
        try {
            $employees = Employee::with(['user', 'office'])
                ->whereHas('office', function ($query) use ($companyId) {
                    $query->where('company_id', $companyId);
                })
                ->get();

            return response()->json([
                'success' => true,
                'data' => $employees
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve employees',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function allClientsByCompany($companyId)
    {
        try {
            $clients = Client::with(['user'])
                ->where('company_id', $companyId)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $clients
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve clients',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function registeredShipmentsByCompany($companyId)
    {
        try {
            $officeIds = Office::where('company_id', $companyId)->pluck('id');

            $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice'])
                ->where('status', 'registered')
                ->whereIn('origin_office_id', $officeIds)
                ->get();

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

    public function shipmentsRegisteredByEmployeeInCompany($employeeId, $companyId)
    {
        try {
            $officeIds = Office::where('company_id', $companyId)->pluck('id');

            $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice'])
                ->where('registered_by', $employeeId)
                ->whereIn('origin_office_id', $officeIds)
                ->get();

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

    public function shipmentsInTransitByCompany($companyId)
    {
        try {
            $officeIds = Office::where('company_id', $companyId)->pluck('id');

            $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice'])
                ->where('status', 'in transit')
                ->whereIn('origin_office_id', $officeIds)
                ->get();

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

    public function shipmentsBySenderInCompany($clientId, $companyId)
    {
        try {
            $officeIds = Office::where('company_id', $companyId)->pluck('id');

            $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice'])
                ->where('sender_id', $clientId)
                ->whereIn('origin_office_id', $officeIds)
                ->get();

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

    public function deliveredShipmentsByReceiverInCompany($clientId, $companyId)
    {
        try {
            $officeIds = Office::where('company_id', $companyId)->pluck('id');

            $shipments = Shipment::with(['sender', 'receiver', 'originOffice', 'destinationOffice'])
                ->where('status', 'delivered')
                ->where('receiver_id', $clientId)
                ->whereIn('origin_office_id', $officeIds)
                ->get();

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

    public function getRevenueForPeriod(Request $request)
    {
        try {
            $startDate = $request->input('start_date', date('Y-m-d'));
            $endDate = $request->input('end_date', date('Y-m-d'));

            $revenueData = Shipment::where('created_at', '>=', $startDate)
                ->where('created_at','<=', $endDate)
                ->where('status', 'delivered')
                ->selectRaw('DATE(created_at) as date, SUM(price) as total_revenue')
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            $total = $revenueData->sum('total_revenue');

            return response()->json([
                'success' => true,
                'data' => [
                    'period' => [
                        'start_date' => $startDate,
                        'end_date' => $endDate
                    ],
                    'daily_revenue' => $revenueData,
                    'total_revenue' => $total
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to calculate revenue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
