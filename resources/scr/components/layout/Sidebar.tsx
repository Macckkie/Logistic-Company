import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  MapPin, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Box
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "shipments", label: "Shipments", icon: Package },
  { id: "fleet", label: "Fleet", icon: Truck },
  { id: "tracking", label: "Tracking", icon: MapPin },
  { id: "inventory", label: "Inventory", icon: Box },
  { id: "customers", label: "Customers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">LogiTrack</h1>
            <p className="text-xs text-sidebar-foreground/60">Logistics Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`sidebar-link w-full ${isActive ? "sidebar-link-active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button className="sidebar-link w-full">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="sidebar-link w-full text-destructive/80 hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
