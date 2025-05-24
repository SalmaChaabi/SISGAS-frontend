import DashboardIcon from "@mui/icons-material/Dashboard";
import GavelIcon from "@mui/icons-material/Gavel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import type { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useSession } from "../SessionContext";
import useUserRole from "../hooks/useUserRole";
const BRANDING = {
  title: "Maintenova",
  logo: (
    <SmartToyIcon
      fontSize="large"
      sx={{
        color: "#1976d2",
        backgroundColor: "#e3f2fd",
        borderRadius: "50%",
        padding: "6px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "rotate(10deg) scale(1.1)",
        },
        cursor: "pointer",
      }}
    />
  ),
  favicon: "/favicon.ico",
};
export default function Layout() {
  const { session, setSession } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(session);
  const { isAdmin, isComptable, isTechnicien } = useUserRole();
  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    ...(isAdmin
      ? [
          {
            segment: "overview",
            title: "Dashboard",
            icon: <DashboardIcon />,
          },
          {
            segment: "users",
            title: "Users",
            icon: <PersonIcon />,
          },
        ]
      : []),

    ...(isAdmin || isTechnicien
      ? [
          {
            segment: "approbations",
            title: "Approbations",
            icon: <GavelIcon />,
          },
        ]
      : []),
    ...(isAdmin || isComptable
      ? [
          {
            segment: "factures",
            title: "Factures",
            icon: <ReceiptIcon />,
          },
        ]
      : []),
    {
      segment: "reclamations",
      title: "Réclamations",
      icon: <ReportProblemIcon />,
    },
    // { segment: "actionsCorrectives", title: "Actions Correctives", icon: <BuildIcon /> },

    {
      segment: "chatbot",
      title: "Chatbot",
      icon: <SmartToyIcon />,
    },

    {
      segment: "notifications",
      title: "Notifications",
      icon: <NotificationsIcon />,
    },
  ];
  const signIn = React.useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);
  const signOut = React.useCallback(() => {
    setSession(null);
    navigate("/sign-in");
  }, [navigate]);
  React.useEffect(() => {
    // Add the `callbackUrl` search parameter

    const timeoutId = setTimeout(() => {
      //set he timeout: wait for 100 msec to run the code
      if (!session) {
        const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
        navigate(redirectTo, { replace: true });
      }
    }, 100);
    return () => clearTimeout(timeoutId); //clear the timeout when the component unmounts (finished the render)
  }, [session]);

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={{ signIn, signOut }}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
