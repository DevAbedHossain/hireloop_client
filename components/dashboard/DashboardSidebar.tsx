"use client";

"use client"

import type { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import {
    Bookmark,
    Briefcase,
    Building2,
    CreditCard,
    FileText,
    LayoutDashboard,
    PlusCircle,
    Settings,
    Users,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import Link from "next/link";

export type MenuItem = {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

export type Role = "seeker" | "recruiter" | "admin"

const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { id: "jobs", name: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
        { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/saved-jobs", icon: Bookmark },
        { id: "applications", name: "Applications", url: "/dashboard/applications", icon: FileText },
        { id: "billing", name: "Billing", url: "/dashboard/billing", icon: CreditCard },
        { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
    recruiter: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { id: "my-company", name: "My Company", url: "/dashboard/my-company", icon: Building2 },
        { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
        { id: "add-jobs", name: "Add Jobs", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
        { id: "applications", name: "Applications", url: "/dashboard/applications", icon: FileText },
        { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
    admin: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { id: "users", name: "Users", url: "/dashboard/users", icon: Users },
        { id: "companies", name: "Companies", url: "/dashboard/companies", icon: Building2 },
        { id: "jobs", name: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
        { id: "payments", name: "Payments", url: "/dashboard/payments", icon: CreditCard },
        { id: "settings", name: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
}

export function DashboardSidebar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const role: Role = (session?.user?.role as Role) || "seeker"

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarMenu>
                    {menuItemsByRole[role].map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                isActive={pathname === item.url}
                                render={<Link href={item.url} />}
                                className="data-active:before:absolute data-active:before:left-0 data-active:before:top-1/2 data-active:before:h-4 data-active:before:w-0.5 data-active:before:-translate-y-1/2 data-active:before:rounded-full data-active:before:bg-[#5c53fe]"
                            >
                                <item.icon />
                                <span>{item.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
