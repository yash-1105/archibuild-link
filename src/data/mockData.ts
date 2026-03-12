export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "active" | "delayed" | "completed";
  deadline: string;
  budget: number;
  spent: number;
  team: { name: string; role: string; avatar: string }[];
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
}

export interface SiteUpdate {
  id: string;
  description: string;
  uploadedBy: string;
  timestamp: string;
  type: "photo" | "video" | "text";
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "task" | "file" | "update" | "budget";
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
  folder: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Riverside Tower Complex",
    description: "A 24-story mixed-use residential and commercial tower with underground parking and rooftop amenities.",
    progress: 72,
    status: "active",
    deadline: "2026-09-15",
    budget: 4500000,
    spent: 3240000,
    team: [
      { name: "Sarah Chen", role: "Architect", avatar: "SC" },
      { name: "Mike Johnson", role: "Contractor", avatar: "MJ" },
      { name: "Emily Davis", role: "Client", avatar: "ED" },
    ],
  },
  {
    id: "2",
    name: "Metro Station Renovation",
    description: "Complete renovation of the downtown metro station including accessibility upgrades and modern design.",
    progress: 45,
    status: "active",
    deadline: "2026-12-01",
    budget: 2800000,
    spent: 1260000,
    team: [
      { name: "Alex Rivera", role: "Architect", avatar: "AR" },
      { name: "James Wu", role: "Contractor", avatar: "JW" },
    ],
  },
  {
    id: "3",
    name: "Green Valley School",
    description: "New elementary school construction with sustainable design and solar panel integration.",
    progress: 18,
    status: "delayed",
    deadline: "2027-03-20",
    budget: 6200000,
    spent: 1116000,
    team: [
      { name: "Lisa Park", role: "Architect", avatar: "LP" },
      { name: "Tom Harris", role: "Contractor", avatar: "TH" },
      { name: "Karen Lee", role: "Client", avatar: "KL" },
    ],
  },
  {
    id: "4",
    name: "Harbor Bridge Repair",
    description: "Structural repair and reinforcement of the historic harbor bridge.",
    progress: 100,
    status: "completed",
    deadline: "2026-01-30",
    budget: 1500000,
    spent: 1420000,
    team: [
      { name: "David Kim", role: "Architect", avatar: "DK" },
      { name: "Chris Martin", role: "Contractor", avatar: "CM" },
    ],
  },
];

export const tasks: Task[] = [
  { id: "t1", title: "Foundation inspection report", assignee: "Mike Johnson", deadline: "2026-03-20", status: "todo", priority: "high" },
  { id: "t2", title: "Submit electrical plans", assignee: "Sarah Chen", deadline: "2026-03-18", status: "todo", priority: "medium" },
  { id: "t3", title: "Steel framework installation", assignee: "Mike Johnson", deadline: "2026-03-25", status: "in-progress", priority: "high" },
  { id: "t4", title: "HVAC system layout review", assignee: "Sarah Chen", deadline: "2026-03-22", status: "in-progress", priority: "medium" },
  { id: "t5", title: "Plumbing rough-in completion", assignee: "Mike Johnson", deadline: "2026-03-15", status: "review", priority: "high" },
  { id: "t6", title: "Window specifications approval", assignee: "Emily Davis", deadline: "2026-03-12", status: "completed", priority: "low" },
  { id: "t7", title: "Concrete pour for level 18", assignee: "Mike Johnson", deadline: "2026-03-10", status: "completed", priority: "high" },
];

export const siteUpdates: SiteUpdate[] = [
  { id: "s1", description: "Level 18 concrete pour completed successfully. All quality checks passed.", uploadedBy: "Mike Johnson", timestamp: "2026-03-11T14:30:00", type: "photo" },
  { id: "s2", description: "Steel framework for levels 19-20 has begun. On schedule.", uploadedBy: "Mike Johnson", timestamp: "2026-03-10T09:15:00", type: "photo" },
  { id: "s3", description: "Safety inspection completed. Minor adjustments needed on scaffolding.", uploadedBy: "Mike Johnson", timestamp: "2026-03-09T16:45:00", type: "text" },
  { id: "s4", description: "Drone footage of overall site progress from aerial perspective.", uploadedBy: "Mike Johnson", timestamp: "2026-03-08T11:00:00", type: "video" },
];

export const activities: Activity[] = [
  { id: "a1", action: "completed task 'Window specifications approval'", user: "Emily Davis", timestamp: "2026-03-12T10:30:00", type: "task" },
  { id: "a2", action: "uploaded site update for Level 18", user: "Mike Johnson", timestamp: "2026-03-11T14:30:00", type: "update" },
  { id: "a3", action: "added expense 'Steel beams delivery' — $45,000", user: "Mike Johnson", timestamp: "2026-03-11T09:00:00", type: "budget" },
  { id: "a4", action: "uploaded 'Electrical Plans v3.pdf'", user: "Sarah Chen", timestamp: "2026-03-10T15:20:00", type: "file" },
  { id: "a5", action: "created task 'Foundation inspection report'", user: "Sarah Chen", timestamp: "2026-03-10T10:00:00", type: "task" },
  { id: "a6", action: "moved 'Steel framework installation' to In Progress", user: "Mike Johnson", timestamp: "2026-03-09T08:30:00", type: "task" },
];

export const expenses: Expense[] = [
  { id: "e1", description: "Steel beams delivery", amount: 45000, category: "Materials", date: "2026-03-11" },
  { id: "e2", description: "Crane rental — March", amount: 28000, category: "Equipment", date: "2026-03-01" },
  { id: "e3", description: "Concrete supply", amount: 32000, category: "Materials", date: "2026-02-28" },
  { id: "e4", description: "Electrical subcontractor", amount: 65000, category: "Labor", date: "2026-02-25" },
  { id: "e5", description: "Safety equipment", amount: 8500, category: "Safety", date: "2026-02-20" },
  { id: "e6", description: "Permit renewal fees", amount: 4200, category: "Administrative", date: "2026-02-15" },
];

export const documents: ProjectDocument[] = [
  { id: "d1", name: "Architectural Plans v4.pdf", type: "PDF", size: "24.5 MB", uploadedBy: "Sarah Chen", date: "2026-03-10", folder: "Blueprints" },
  { id: "d2", name: "Electrical Plans v3.pdf", type: "PDF", size: "18.2 MB", uploadedBy: "Sarah Chen", date: "2026-03-10", folder: "Blueprints" },
  { id: "d3", name: "Budget Report Q1.xlsx", type: "Spreadsheet", size: "2.1 MB", uploadedBy: "Emily Davis", date: "2026-03-05", folder: "Reports" },
  { id: "d4", name: "Building Permit.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "Sarah Chen", date: "2026-02-01", folder: "Permits" },
  { id: "d5", name: "Site Survey Results.pdf", type: "PDF", size: "5.4 MB", uploadedBy: "Mike Johnson", date: "2026-01-15", folder: "Reports" },
  { id: "d6", name: "Foundation Drawing.dwg", type: "Drawing", size: "34.1 MB", uploadedBy: "Sarah Chen", date: "2026-01-10", folder: "Blueprints" },
];

export const notifications = [
  { id: "n1", message: "Task 'Foundation inspection report' is due in 8 days", time: "2 hours ago", read: false },
  { id: "n2", message: "Mike Johnson uploaded a site update", time: "Yesterday", read: false },
  { id: "n3", message: "New expense added: Steel beams delivery — $45,000", time: "Yesterday", read: true },
  { id: "n4", message: "Emily Davis completed 'Window specifications approval'", time: "2 days ago", read: true },
];
