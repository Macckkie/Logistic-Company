import { Truck, Circle } from "lucide-react";

interface Vehicle {
  id: string;
  driver: string;
  status: "active" | "idle" | "maintenance";
  location: string;
  capacity: number;
}

const vehicles: Vehicle[] = [
  { id: "TRK-001", driver: "Mike Johnson", status: "active", location: "Highway I-95, NY", capacity: 85 },
  { id: "TRK-002", driver: "Sarah Williams", status: "active", location: "Route 66, AZ", capacity: 62 },
  { id: "TRK-003", driver: "James Brown", status: "idle", location: "Depot - Chicago", capacity: 0 },
  { id: "TRK-004", driver: "Emily Davis", status: "active", location: "Highway I-10, TX", capacity: 91 },
  { id: "TRK-005", driver: "Robert Wilson", status: "maintenance", location: "Service Center - LA", capacity: 0 },
];

const statusConfig = {
  active: { color: "text-success", bg: "bg-success" },
  idle: { color: "text-warning", bg: "bg-warning" },
  maintenance: { color: "text-destructive", bg: "bg-destructive" },
};

const FleetStatus = () => {
  const activeCount = vehicles.filter((v) => v.status === "active").length;
  const idleCount = vehicles.filter((v) => v.status === "idle").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Fleet Status</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-success text-success" />
            Active ({activeCount})
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-warning text-warning" />
            Idle ({idleCount})
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-destructive text-destructive" />
            Maintenance ({maintenanceCount})
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[vehicle.status].bg}/10`}>
              <Truck className={`w-5 h-5 ${statusConfig[vehicle.status].color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium">{vehicle.id}</span>
                <span className={`w-2 h-2 rounded-full ${statusConfig[vehicle.status].bg}`} />
              </div>
              <p className="text-sm text-muted-foreground">{vehicle.driver}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{vehicle.location}</p>
              {vehicle.status === "active" && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${vehicle.capacity}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{vehicle.capacity}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetStatus;
