"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, CandlestickChart, History, LayoutDashboard, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/strategies", label: "Strategies", icon: CandlestickChart },
  { href: "/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/analysis", label: "AI Analysis", icon: BrainCircuit },
  { href: "/backtesting", label: "Backtesting", icon: History },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={{ children: link.label }}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
