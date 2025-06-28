
import { Issue } from "@/types/issue";

export const mockIssues: Issue[] = [
  {
    id: "ISS001",
    title: "Broken Street Light on Main Road",
    description: "The street light near the market has been out for over a week, making it dangerous for evening commuters and vendors.",
    category: "Infrastructure",
    location: "Main Road, Near Central Market",
    reporter: "Local Vendor",
    date: "2024-01-15",
    status: "in-progress",
    priority: "high",
    assignedTo: "Public Works Department",
    estimatedCompletion: "2024-01-25",
    images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop"]
  },
  {
    id: "ISS002",
    title: "Water Pipe Leak in Mayukwayukwa",
    description: "Major water pipe burst causing flooding in residential area. Multiple households affected without water supply.",
    category: "Water & Sanitation",
    location: "Mayukwayukwa Village, Block A",
    reporter: "Community Chairman",
    date: "2024-01-18",
    status: "reported",
    priority: "urgent",
    assignedTo: "Water Utilities",
    estimatedCompletion: "2024-01-20",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"]
  },
  {
    id: "ISS003",
    title: "Pothole on Lukulu Road",
    description: "Large pothole causing vehicle damage and safety concerns for road users traveling to Lukulu.",
    category: "Roads",
    location: "Lukulu Road, KM 15",
    reporter: "Transport Driver",
    date: "2024-01-10",
    status: "resolved",
    priority: "medium",
    assignedTo: "Road Development Agency",
    estimatedCompletion: "2024-01-22",
    images: ["https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop"]
  },
  {
    id: "ISS004",
    title: "Damaged School Roof",
    description: "School roof damaged by recent storms, affecting classes during rainy weather. Urgent repair needed before next semester.",
    category: "Education",
    location: "Kaoma Primary School",
    reporter: "Head Teacher",
    date: "2024-01-12",
    status: "investigating",
    priority: "high",
    assignedTo: "Ministry of Education",
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"]
  }
];
