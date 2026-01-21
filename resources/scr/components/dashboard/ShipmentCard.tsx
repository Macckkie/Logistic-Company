import { MapPin, Clock, Package } from "lucide-react";

interface ShipmentCardProps {
  id: string;
  origin: string;
  destination: string;
  status: "delivered" | "in-transit" | "pending" | "delayed";
  eta: string;
  items: number;
}

const statusConfig = {
  delivered: { label: "Delivered", class: "status-delivered" },
  "in-transit": { label: "In Transit", class: "status-in-transit" },
  pending: { label: "Pending", class: "status-pending" },
  delayed: { label: "Delayed", class: "status-delayed" },
};

const ShipmentCard = ({ id, origin, destination, status, eta, items }: ShipmentCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <div className="stat-card group cursor-pointer hover:border-accent/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-sm text-muted-foreground">{id}</p>
          <span className={`status-badge mt-2 ${statusInfo.class}`}>
            {statusInfo.label}
          </span>
        </div>
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          <Package className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-success" />
          <span className="text-muted-foreground">From:</span>
          <span className="font-medium">{origin}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">To:</span>
          <span className="font-medium">{destination}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>ETA: {eta}</span>
        </div>
        <span className="text-sm font-medium">{items} items</span>
      </div>
    </div>
  );
};

export default ShipmentCard;
