
import { AlertTriangle, Search, Clock, CheckCircle, MapPin, TrendingUp, Star } from "lucide-react";

export const statusConfig = {
  reported: { label: "Reported", color: "bg-blue-500", icon: AlertTriangle },
  investigating: { label: "Investigating", color: "bg-yellow-500", icon: Search },
  "in-progress": { label: "In Progress", color: "bg-orange-500", icon: Clock },
  resolved: { label: "Resolved", color: "bg-green-500", icon: CheckCircle },
  closed: { label: "Closed", color: "bg-gray-500", icon: CheckCircle }
};

export const priorityConfig = {
  low: { color: "bg-green-500", label: "Low" },
  medium: { color: "bg-yellow-500", label: "Medium" },
  high: { color: "bg-orange-500", label: "High" },
  urgent: { color: "bg-red-500", label: "Urgent" }
};

export const categories = [
  { name: "all", icon: AlertTriangle, color: "bg-gray-500" },
  { name: "Infrastructure", icon: TrendingUp, color: "bg-blue-500" },
  { name: "Roads", icon: MapPin, color: "bg-orange-500" },
  { name: "Water & Sanitation", icon: Clock, color: "bg-cyan-500" },
  { name: "Education", icon: Star, color: "bg-green-500" },
];
