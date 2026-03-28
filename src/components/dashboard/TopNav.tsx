import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { notifications } from "@/data/mockData";

const TopNav = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [markRead, setMarkRead] = useState<string[]>([]);
  const effectiveUnread = notifications.filter(n => !n.read && !markRead.includes(n.id)).length;

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search anything..." className="pl-9 pr-16 w-72 h-8 bg-secondary/50 border-border text-sm rounded-lg focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/60" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-muted-foreground/40">
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-[10px] font-medium border border-border">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-[10px] font-medium border border-border">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              {effectiveUnread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full byld-gradient text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                  {effectiveUnread}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 bg-card border-border shadow-xl">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <h4 className="font-semibold text-sm text-foreground">Notifications</h4>
              <button className="text-xs text-primary hover:text-primary/80 transition-colors" onClick={() => setMarkRead(notifications.filter(n => !n.read).map(n => n.id))}>
                Mark all read
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`px-3 py-3 border-b border-border last:border-0 transition-colors hover:bg-secondary/30 ${!n.read && !markRead.includes(n.id) ? "bg-primary/5" : ""}`}>
                  <div className="flex items-start gap-2">
                    {!n.read && !markRead.includes(n.id) && (
                      <div className="w-1.5 h-1.5 rounded-full byld-gradient mt-1.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div className="w-8 h-8 rounded-lg byld-gradient flex items-center justify-center text-xs font-bold text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
          SC
        </div>
      </div>
    </header>
  );
};

export default TopNav;
