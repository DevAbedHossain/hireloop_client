import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DashoardPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="min-h-svh w-full bg-[#0e0e11]">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default DashoardPage;