import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import ShipmentCard from "@/components/dashboard/ShipmentCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import FleetStatus from "@/components/dashboard/FleetStatus";
import { Package, Truck, CheckCircle, Clock, TrendingUp, AlertTriangle } from "lucide-react";

const shipments = [
  {
    id: "SHP-2024-001",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    status: "in-transit" as const,
    eta: "Jan 22, 2026",
    items: 45,
  },
  {
    id: "SHP-2024-002",
    origin: "Miami, FL",
    destination: "Chicago, IL",
    status: "pending" as const,
    eta: "Jan 24, 2026",
    items: 28,
  },
  {
    id: "SHP-2024-003",
    origin: "Seattle, WA",
    destination: "Houston, TX",
    status: "delivered" as const,
    eta: "Jan 19, 2026",
    items: 67,
  },
  {
    id: "SHP-2024-004",
    origin: "Denver, CO",
    destination: "Boston, MA",
    status: "delayed" as const,
    eta: "Jan 25, 2026",
    items: 33,
  },
];

const Index = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      <main className="ml-64">
        <Header />
        
        <div className="p-6 space-y-6">
          {/* Page title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your logistics overview.</p>
            </div>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center gap-2">
              <Package className="w-4 h-4" />
              New Shipment
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Shipments"
              value="1,284"
              change="+12.5% from last month"
              changeType="positive"
              icon={Package}
              variant="accent"
            />
            <StatCard
              title="Active Deliveries"
              value="89"
              change="23 arriving today"
              changeType="neutral"
              icon={Truck}
            />
            <StatCard
              title="Completed"
              value="1,142"
              change="+8.2% from last month"
              changeType="positive"
              icon={CheckCircle}
            />
            <StatCard
              title="Delayed"
              value="12"
              change="-3 from yesterday"
              changeType="positive"
              icon={AlertTriangle}
            />
          </div>

          {/* Shipments grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Shipments</h2>
              <button className="text-sm text-accent hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {shipments.map((shipment) => (
                <ShipmentCard key={shipment.id} {...shipment} />
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>
            <div>
              <FleetStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
