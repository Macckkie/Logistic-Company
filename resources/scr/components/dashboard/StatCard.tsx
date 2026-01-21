import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "accent";
}

const StatCard = ({ title, value, change, changeType = "neutral", icon: Icon, variant = "default" }: StatCardProps) => {
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  if (variant === "accent") {
    return (
      <div className="stat-card-accent">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-80">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {change && (
              <p className="text-sm mt-2 opacity-80">{change}</p>
            )}
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColors[changeType]}`}>{change}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
