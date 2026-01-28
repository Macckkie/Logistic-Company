import { MoreHorizontal } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: "delivered" | "in-transit" | "pending" | "delayed";
  date: string;
  value: string;
}

const orders: Order[] = [
  {
    id: "ORD-7892",
    customer: "TechCorp Inc.",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    status: "in-transit",
    date: "Jan 20, 2026",
    value: "$12,450",
  },
  {
    id: "ORD-7891",
    customer: "Global Foods Ltd.",
    origin: "Miami, FL",
    destination: "Chicago, IL",
    status: "delivered",
    date: "Jan 19, 2026",
    value: "$8,920",
  },
  {
    id: "ORD-7890",
    customer: "AutoParts Co.",
    origin: "Detroit, MI",
    destination: "Houston, TX",
    status: "pending",
    date: "Jan 19, 2026",
    value: "$15,780",
  },
  {
    id: "ORD-7889",
    customer: "Fashion House",
    origin: "Seattle, WA",
    destination: "Boston, MA",
    status: "delayed",
    date: "Jan 18, 2026",
    value: "$6,340",
  },
  {
    id: "ORD-7888",
    customer: "MediSupply Inc.",
    origin: "Phoenix, AZ",
    destination: "Atlanta, GA",
    status: "in-transit",
    date: "Jan 18, 2026",
    value: "$22,100",
  },
];

const statusConfig = {
  delivered: { label: "Delivered", class: "status-delivered" },
  "in-transit": { label: "In Transit", class: "status-in-transit" },
  pending: { label: "Pending", class: "status-pending" },
  delayed: { label: "Delayed", class: "status-delayed" },
};

const RecentOrders = () => {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <button className="text-sm text-accent hover:underline">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Route</th>
              <th>Status</th>
              <th>Date</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-mono font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td className="text-muted-foreground">
                  {order.origin} → {order.destination}
                </td>
                <td>
                  <span className={`status-badge ${statusConfig[order.status].class}`}>
                    {statusConfig[order.status].label}
                  </span>
                </td>
                <td className="text-muted-foreground">{order.date}</td>
                <td className="font-medium">{order.value}</td>
                <td>
                  <button className="p-1 hover:bg-secondary rounded">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
