import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DashoardPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default DashoardPage;