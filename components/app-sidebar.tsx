"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { FilialenSwitcher } from "@/components/filialen-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  filialen: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Kasse",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Verkauf",
          url: "#",
        },
        {
          title: "Retouren",
          url: "#",
        },
        {
          title: "Gutscheine",
          url: "#",
        },
        {
          title: "Tagesabschluss",
          url: "#",
        },
        {
          title: "Kassenbuch",
          url: "#",
        },
      ],
    },
    {
      title: "Artikel",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Artikelverwaltung",
          url: "#",
        },
        {
          title: "Kategorien",
          url: "#",
        },
        {
          title: "Preise & Rabatte",
          url: "#",
        },
        {
          title: "Bestand",
          url: "#",
        },
        {
          title: "Inventur",
          url: "#",
        },
      ],
    },
    {
      title: "Kunden",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Kundenkartei",
          url: "#",
        },
        {
          title: "Bonusprogramm",
          url: "#",
        },
        {
          title: "Kundenhistorie",
          url: "#",
        },
        {
          title: "Newsletter",
          url: "#",
        },
        {
          title: "Kundenservice",
          url: "#",
        },
      ],
    },
    {
      title: "Berichte",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Tagesumsatz",
          url: "#",
        },
        {
          title: "Verkaufsstatistik",
          url: "#",
        },
        {
          title: "Bestseller",
          url: "#",
        },
        {
          title: "Mitarbeiterleistung",
          url: "#",
        },
        {
          title: "Z-Berichte",
          url: "#",
        },
      ],
    },
    {
      title: "Einstellungen",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Mitarbeiter",
          url: "#",
        },
        {
          title: "Zahlungsarten",
          url: "#",
        },
        {
          title: "Drucker & Geräte",
          url: "#",
        },
        {
          title: "Steuersätze",
          url: "#",
        },
        {
          title: "Filialeinstellungen",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "System",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <FilialenSwitcher filialen={data.filialen} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
