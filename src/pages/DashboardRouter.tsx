import { useRole } from "@/contexts/RoleContext";
import ArchitectDashboard from "./Dashboard";
import ContractorDashboard from "./ContractorDashboard";
import ClientDashboard from "./ClientDashboard";
import ConsultantDashboard from "./ConsultantDashboard";

const DashboardRouter = () => {
  const { role } = useRole();

  switch (role) {
    case "contractor":
      return <ContractorDashboard />;
    case "client":
      return <ClientDashboard />;
    case "consultant":
      return <ConsultantDashboard />;
    default:
      return <ArchitectDashboard />;
  }
};

export default DashboardRouter;
