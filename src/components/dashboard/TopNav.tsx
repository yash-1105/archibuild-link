import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { notifications } from "@/data/mockData";

const TopNav = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects, tasks..." className="pl-9 w-64 h-9 bg-muted/50 border-0" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full byld-gradient text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-3 border-b">
              <h4 className="font-semibold text-sm text-foreground">Notifications</h4>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-3 py-3 border-b last:border-0 ${!n.read ? "bg-accent/5" : ""}`}
                >
                  <p className="text-sm text-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-8 h-8 rounded-full byld-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
          SC
        </div>
      </div>
    </header>
  );
};

export default TopNav;
