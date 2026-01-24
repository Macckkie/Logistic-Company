import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Search, Plus, Filter, MapPin, Clock, Truck } from "lucide-react";

const shipmentsData = [
  {
    id: "SHP-001",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    status: "in-transit",
    carrier: "FastFreight Co.",
    weight: "2,500 kg",
    eta: "Jan 26, 2026",
    createdAt: "Jan 20, 2026",
  },
  {
    id: "SHP-002",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    status: "delivered",
    carrier: "SpeedyLogistics",
    weight: "1,200 kg",
    eta: "Jan 22, 2026",
    createdAt: "Jan 18, 2026",
  },
  {
    id: "SHP-003",
    origin: "Seattle, WA",
    destination: "Denver, CO",
    status: "pending",
    carrier: "Mountain Express",
    weight: "800 kg",
    eta: "Jan 28, 2026",
    createdAt: "Jan 23, 2026",
  },
  {
    id: "SHP-004",
    origin: "Houston, TX",
    destination: "Phoenix, AZ",
    status: "in-transit",
    carrier: "Desert Haulers",
    weight: "3,100 kg",
    eta: "Jan 25, 2026",
    createdAt: "Jan 21, 2026",
  },
  {
    id: "SHP-005",
    origin: "Boston, MA",
    destination: "Atlanta, GA",
    status: "delayed",
    carrier: "EastCoast Freight",
    weight: "1,800 kg",
    eta: "Jan 27, 2026",
    createdAt: "Jan 19, 2026",
  },
  {
    id: "SHP-006",
    origin: "San Francisco, CA",
    destination: "Portland, OR",
    status: "delivered",
    carrier: "Pacific Movers",
    weight: "600 kg",
    eta: "Jan 21, 2026",
    createdAt: "Jan 17, 2026",
  },
];

const getStatusBadge = (status: string) => {
  const styles = {
    "in-transit": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    delivered: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    delayed: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return styles[status as keyof typeof styles] || styles.pending;
};

const Shipments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredShipments = shipmentsData.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: shipmentsData.length,
    inTransit: shipmentsData.filter((s) => s.status === "in-transit").length,
    delivered: shipmentsData.filter((s) => s.status === "delivered").length,
    pending: shipmentsData.filter((s) => s.status === "pending").length,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Shipments</h1>
              <p className="text-muted-foreground">
                Manage and track all your shipments
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Shipment
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Truck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.inTransit}</p>
                    <p className="text-xs text-muted-foreground">In Transit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <MapPin className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.delivered}</p>
                    <p className="text-xs text-muted-foreground">Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, origin, or destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Shipments Table */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">All Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium text-primary">
                        {shipment.id}
                      </TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>{shipment.carrier}</TableCell>
                      <TableCell>{shipment.weight}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusBadge(shipment.status)}
                        >
                          {shipment.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {shipment.eta}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredShipments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No shipments found matching your criteria.
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Shipments;
