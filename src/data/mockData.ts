export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "active" | "delayed" | "completed";
  deadline: string;
  budget: number;
  spent: number;
  team: TeamMember[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  email?: string;
  status?: "online" | "offline" | "busy";
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  projectId?: string;
  description?: string;
  comments?: { user: string; text: string; time: string }[];
}

export interface SiteUpdate {
  id: string;
  description: string;
  uploadedBy: string;
  timestamp: string;
  type: "photo" | "video" | "text";
  tags?: string[];
  likes?: number;
  comments?: { user: string; text: string; time: string }[];
  projectId?: string;
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
  projectId?: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
  folder: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
  channel: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  projectId?: string;
  unread: number;
  lastMessage?: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Sarah Chen", role: "Architect", avatar: "SC", email: "sarah@byld.com", status: "online" },
  { name: "Mike Johnson", role: "Contractor", avatar: "MJ", email: "mike@byld.com", status: "online" },
  { name: "Emily Davis", role: "Client", avatar: "ED", email: "emily@byld.com", status: "offline" },
  { name: "Alex Rivera", role: "Architect", avatar: "AR", email: "alex@byld.com", status: "busy" },
  { name: "James Wu", role: "Contractor", avatar: "JW", email: "james@byld.com", status: "online" },
  { name: "Lisa Park", role: "Architect", avatar: "LP", email: "lisa@byld.com", status: "offline" },
  { name: "Tom Harris", role: "Contractor", avatar: "TH", email: "tom@byld.com", status: "online" },
  { name: "Karen Lee", role: "Client", avatar: "KL", email: "karen@byld.com", status: "offline" },
];

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
    team: [teamMembers[0], teamMembers[1], teamMembers[2]],
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
    team: [teamMembers[3], teamMembers[4]],
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
    team: [teamMembers[5], teamMembers[6], teamMembers[7]],
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
    team: [teamMembers[0], teamMembers[6]],
  },
  {
    id: "5",
    name: "Skyline Office Park",
    description: "A modern 5-building office campus with green spaces, EV charging, and shared amenities.",
    progress: 34,
    status: "active",
    deadline: "2027-06-15",
    budget: 8200000,
    spent: 2788000,
    team: [teamMembers[0], teamMembers[1], teamMembers[3]],
  },
];

export const tasks: Task[] = [
  { id: "t1", title: "Foundation inspection report", assignee: "Mike Johnson", deadline: "2026-03-28", status: "todo", priority: "high", projectId: "1", description: "Complete structural inspection of foundation work on levels B1-B3." },
  { id: "t2", title: "Submit electrical plans", assignee: "Sarah Chen", deadline: "2026-03-30", status: "todo", priority: "medium", projectId: "1" },
  { id: "t3", title: "Steel framework installation", assignee: "Mike Johnson", deadline: "2026-04-05", status: "in-progress", priority: "high", projectId: "1" },
  { id: "t4", title: "HVAC system layout review", assignee: "Sarah Chen", deadline: "2026-03-29", status: "in-progress", priority: "medium", projectId: "1" },
  { id: "t5", title: "Plumbing rough-in completion", assignee: "Mike Johnson", deadline: "2026-03-27", status: "review", priority: "high", projectId: "1" },
  { id: "t6", title: "Window specifications approval", assignee: "Emily Davis", deadline: "2026-03-25", status: "completed", priority: "low", projectId: "1" },
  { id: "t7", title: "Concrete pour for level 18", assignee: "Mike Johnson", deadline: "2026-03-22", status: "completed", priority: "high", projectId: "1" },
  { id: "t8", title: "Metro tile selection", assignee: "Alex Rivera", deadline: "2026-04-01", status: "todo", priority: "medium", projectId: "2" },
  { id: "t9", title: "Accessibility ramp design", assignee: "Alex Rivera", deadline: "2026-04-10", status: "in-progress", priority: "high", projectId: "2" },
  { id: "t10", title: "Solar panel vendor selection", assignee: "Lisa Park", deadline: "2026-04-15", status: "todo", priority: "high", projectId: "3" },
  { id: "t11", title: "Site grading approval", assignee: "Tom Harris", deadline: "2026-03-26", status: "review", priority: "medium", projectId: "3" },
  { id: "t12", title: "Parking structure blueprints", assignee: "Sarah Chen", deadline: "2026-04-20", status: "todo", priority: "low", projectId: "5" },
];

export const siteUpdates: SiteUpdate[] = [
  { id: "s1", description: "Level 18 concrete pour completed successfully. All quality checks passed.", uploadedBy: "Mike Johnson", timestamp: "2026-03-25T14:30:00", type: "photo", tags: ["progress"], likes: 12, projectId: "1", comments: [{ user: "Sarah Chen", text: "Great work! On to level 19.", time: "2 hours ago" }] },
  { id: "s2", description: "Steel framework for levels 19-20 has begun. On schedule.", uploadedBy: "Mike Johnson", timestamp: "2026-03-24T09:15:00", type: "photo", tags: ["progress"], likes: 8, projectId: "1" },
  { id: "s3", description: "Safety inspection completed. Minor adjustments needed on scaffolding.", uploadedBy: "Mike Johnson", timestamp: "2026-03-23T16:45:00", type: "text", tags: ["issue"], likes: 3, projectId: "1" },
  { id: "s4", description: "Drone footage of overall site progress from aerial perspective.", uploadedBy: "Mike Johnson", timestamp: "2026-03-22T11:00:00", type: "video", tags: ["progress"], likes: 24, projectId: "1" },
  { id: "s5", description: "Platform 3 demolition complete. Ready for new flooring.", uploadedBy: "James Wu", timestamp: "2026-03-24T10:00:00", type: "photo", tags: ["progress"], likes: 6, projectId: "2" },
  { id: "s6", description: "Delay on Green Valley due to material shipment. Expected 5-day delay.", uploadedBy: "Tom Harris", timestamp: "2026-03-23T08:30:00", type: "text", tags: ["delay"], likes: 1, projectId: "3" },
];

export const activities: Activity[] = [
  { id: "a1", action: "completed task 'Window specifications approval'", user: "Emily Davis", timestamp: "2026-03-25T10:30:00", type: "task" },
  { id: "a2", action: "uploaded site update for Level 18", user: "Mike Johnson", timestamp: "2026-03-25T14:30:00", type: "update" },
  { id: "a3", action: "added expense 'Steel beams delivery' — $45,000", user: "Mike Johnson", timestamp: "2026-03-24T09:00:00", type: "budget" },
  { id: "a4", action: "uploaded 'Electrical Plans v3.pdf'", user: "Sarah Chen", timestamp: "2026-03-24T15:20:00", type: "file" },
  { id: "a5", action: "created task 'Foundation inspection report'", user: "Sarah Chen", timestamp: "2026-03-23T10:00:00", type: "task" },
  { id: "a6", action: "moved 'Steel framework installation' to In Progress", user: "Mike Johnson", timestamp: "2026-03-22T08:30:00", type: "task" },
  { id: "a7", action: "approved budget increase for Metro Station", user: "Alex Rivera", timestamp: "2026-03-21T14:00:00", type: "budget" },
  { id: "a8", action: "uploaded drone footage for Riverside Tower", user: "Mike Johnson", timestamp: "2026-03-20T11:00:00", type: "update" },
];

export const expenses: Expense[] = [
  { id: "e1", description: "Steel beams delivery", amount: 45000, category: "Materials", date: "2026-03-24", projectId: "1" },
  { id: "e2", description: "Crane rental — March", amount: 28000, category: "Equipment", date: "2026-03-01", projectId: "1" },
  { id: "e3", description: "Concrete supply", amount: 32000, category: "Materials", date: "2026-02-28", projectId: "1" },
  { id: "e4", description: "Electrical subcontractor", amount: 65000, category: "Labor", date: "2026-02-25", projectId: "1" },
  { id: "e5", description: "Safety equipment", amount: 8500, category: "Safety", date: "2026-02-20", projectId: "1" },
  { id: "e6", description: "Permit renewal fees", amount: 4200, category: "Administrative", date: "2026-02-15", projectId: "1" },
  { id: "e7", description: "Tile supplier deposit", amount: 15000, category: "Materials", date: "2026-03-10", projectId: "2" },
  { id: "e8", description: "Demolition crew", amount: 22000, category: "Labor", date: "2026-03-05", projectId: "2" },
];

export const documents: ProjectDocument[] = [
  { id: "d1", name: "Architectural Plans v4.pdf", type: "PDF", size: "24.5 MB", uploadedBy: "Sarah Chen", date: "2026-03-10", folder: "Blueprints", tags: ["drawing"] },
  { id: "d2", name: "Electrical Plans v3.pdf", type: "PDF", size: "18.2 MB", uploadedBy: "Sarah Chen", date: "2026-03-10", folder: "Blueprints", tags: ["drawing"] },
  { id: "d3", name: "Budget Report Q1.xlsx", type: "Spreadsheet", size: "2.1 MB", uploadedBy: "Emily Davis", date: "2026-03-05", folder: "Reports", tags: ["invoice"] },
  { id: "d4", name: "Building Permit.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "Sarah Chen", date: "2026-02-01", folder: "Permits", tags: ["contract"] },
  { id: "d5", name: "Site Survey Results.pdf", type: "PDF", size: "5.4 MB", uploadedBy: "Mike Johnson", date: "2026-01-15", folder: "Reports", tags: ["drawing"] },
  { id: "d6", name: "Foundation Drawing.dwg", type: "Drawing", size: "34.1 MB", uploadedBy: "Sarah Chen", date: "2026-01-10", folder: "Blueprints", tags: ["drawing"] },
  { id: "d7", name: "Contractor Agreement.pdf", type: "PDF", size: "0.8 MB", uploadedBy: "Emily Davis", date: "2026-01-05", folder: "Contracts", tags: ["contract"] },
  { id: "d8", name: "Insurance Certificate.pdf", type: "PDF", size: "1.2 MB", uploadedBy: "Emily Davis", date: "2025-12-20", folder: "Contracts", tags: ["contract"] },
];

export const notifications = [
  { id: "n1", message: "Task 'Foundation inspection report' is due in 3 days", time: "2 hours ago", read: false, type: "deadline" as const },
  { id: "n2", message: "Mike Johnson uploaded a site update", time: "4 hours ago", read: false, type: "update" as const },
  { id: "n3", message: "New expense added: Steel beams delivery — $45,000", time: "Yesterday", read: false, type: "budget" as const },
  { id: "n4", message: "Emily Davis completed 'Window specifications approval'", time: "2 days ago", read: true, type: "task" as const },
  { id: "n5", message: "You were assigned 'HVAC system layout review'", time: "3 days ago", read: true, type: "task" as const },
  { id: "n6", message: "Green Valley School project has a 5-day delay", time: "3 days ago", read: true, type: "deadline" as const },
];

export const chatChannels: ChatChannel[] = [
  { id: "ch1", name: "Riverside Tower", projectId: "1", unread: 3, lastMessage: "Steel framework is looking good!" },
  { id: "ch2", name: "Metro Station", projectId: "2", unread: 1, lastMessage: "Tile samples arriving Monday" },
  { id: "ch3", name: "Green Valley School", projectId: "3", unread: 0, lastMessage: "Delay update posted" },
  { id: "ch4", name: "General", unread: 5, lastMessage: "Team meeting at 3pm" },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", sender: "Mike Johnson", avatar: "MJ", message: "Steel framework installation started on level 19. Everything going smoothly so far.", timestamp: "2026-03-25T09:30:00", channel: "ch1" },
  { id: "m2", sender: "Sarah Chen", avatar: "SC", message: "Great to hear! Make sure the structural bolts are torqued to spec before moving to level 20.", timestamp: "2026-03-25T09:35:00", channel: "ch1" },
  { id: "m3", sender: "Emily Davis", avatar: "ED", message: "Can we get a progress photo? The investors want to see the current state.", timestamp: "2026-03-25T09:40:00", channel: "ch1" },
  { id: "m4", sender: "Mike Johnson", avatar: "MJ", message: "Sure, I'll upload one by end of day. Steel framework is looking good! 🏗️", timestamp: "2026-03-25T09:45:00", channel: "ch1" },
  { id: "m5", sender: "Sarah Chen", avatar: "SC", message: "Perfect. Also reviewed the HVAC plans — a few adjustments needed on the ductwork layout for floors 15-18.", timestamp: "2026-03-25T10:00:00", channel: "ch1" },
  { id: "m6", sender: "Alex Rivera", avatar: "AR", message: "Tile samples arriving Monday. I'll share photos once they're in.", timestamp: "2026-03-25T11:00:00", channel: "ch2" },
  { id: "m7", sender: "James Wu", avatar: "JW", message: "Platform 3 demolition is done. Ready for new flooring prep.", timestamp: "2026-03-25T11:30:00", channel: "ch2" },
  { id: "m8", sender: "Sarah Chen", avatar: "SC", message: "Team meeting at 3pm today to discuss Q2 milestones. All leads please attend.", timestamp: "2026-03-25T12:00:00", channel: "ch4" },
];

export const aiResponses: Record<string, string> = {
  "Show project status": "📊 Here's your project overview:\n\n• **Riverside Tower** — 72% complete, on track\n• **Metro Station** — 45% complete, on track\n• **Green Valley School** — 18% complete, ⚠️ delayed\n• **Harbor Bridge** — ✅ 100% complete\n• **Skyline Office Park** — 34% complete, on track\n\nOverall portfolio health: **Good** (4/5 projects on schedule)",
  "What tasks are pending?": "📋 You have **6 pending tasks** across all projects:\n\n**High Priority:**\n• Foundation inspection report (Due Mar 28)\n• Solar panel vendor selection (Due Apr 15)\n\n**Medium Priority:**\n• Submit electrical plans (Due Mar 30)\n• Metro tile selection (Due Apr 1)\n• Site grading approval (In Review)\n\n**Low Priority:**\n• Parking structure blueprints (Due Apr 20)\n\n⏰ 2 tasks are due this week.",
  "Any delays?": "⚠️ **2 delays detected this week:**\n\n1. **Green Valley School** — 5-day material shipment delay reported by Tom Harris. New ETA for materials: March 28.\n\n2. **Foundation Inspection** — Pending report may push deadline. Currently due March 28.\n\n💡 **Recommendation:** Consider expediting the material delivery for Green Valley or adjusting the project timeline. I can help draft a revised schedule.",
  "Budget summary": "💰 **Portfolio Budget Summary:**\n\n| Project | Budget | Spent | Remaining |\n|---------|--------|-------|-----------|\n| Riverside Tower | $4.5M | $3.2M (72%) | $1.3M |\n| Metro Station | $2.8M | $1.3M (45%) | $1.5M |\n| Green Valley | $6.2M | $1.1M (18%) | $5.1M |\n| Skyline Office | $8.2M | $2.8M (34%) | $5.4M |\n\n**Total Portfolio:** $23.2M budget, $9.4M spent\n\n✅ All projects are within budget.",
};
