import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import type { Navigation, Session } from "@toolpad/core/AppProvider";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import * as React from "react";
import { Outlet, useNavigate } from "react-router";
import { SessionContext } from "./SessionContext";
import { useLocalStorageState } from "@toolpad/core";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import GavelIcon from '@mui/icons-material/Gavel';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BuildIcon from '@mui/icons-material/Build';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import 'leaflet/dist/leaflet.css';





const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
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
  { segment: "approbations", title: "Approbations", icon: <GavelIcon /> },
  { segment: "factures", title: "Factures", icon: <ReceiptIcon/> },
  { segment: "reclamations", title: "Réclamations", icon: <ReportProblemIcon /> },
  { segment: "actionsCorrectives", title: "Actions Correctives", icon: <BuildIcon /> },

];


const BRANDING = {
  title: "Maintenova",
  logo: (
    <SmartToyIcon
      fontSize="large"
      sx={{
        color: '#1976d2',
        backgroundColor: '#e3f2fd',
        borderRadius: '50%',
        padding: '6px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'rotate(10deg) scale(1.1)',
        },
        cursor: 'pointer',
      }}
    />
  ),
  favicon: "/favicon.ico",
};



export default function App() {
  const [session, setSessionState] = React.useState<Session | null>(null);
  const [localStorageSession, setLocalStorageSession] = useLocalStorageState(
    "session",
    null
  );
  const navigate = useNavigate();

  const signIn = React.useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  const setSession = (session: Session | null) => {
    setSessionState(session);
    if (session !== null) {
      setLocalStorageSession(JSON.stringify(session));
    } else {
      setLocalStorageSession(null);
    }
  };
  const signOut = React.useCallback(() => {
    setSession(null);
    navigate("/sign-in");
  }, [navigate]);

  const sessionContextValue = React.useMemo(
    () => ({ session, setSession }),
    [session, setSession]
  );

  React.useEffect(() => {
    if (localStorageSession) setSession(JSON.parse(localStorageSession));
  }, [localStorageSession]);
  return (
    <SessionContext.Provider value={sessionContextValue}>
      <ReactRouterAppProvider
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </ReactRouterAppProvider>
    </SessionContext.Provider>
  );
}
