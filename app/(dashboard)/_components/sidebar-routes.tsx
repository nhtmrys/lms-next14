"use client";

import { Layout, Compass, List, BarChart } from "lucide-react";
import { usePathname } from "next/navigation";

import SidebarItem from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Pano",
    href: "/",
  },
  {
    icon: Compass,
    label: "Keşfet",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Kurslar",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analitik",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
