import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import type { Navigation, Session } from "@toolpad/core/AppProvider";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import * as React from "react";
import { Outlet, useNavigate } from "react-router";
import { SessionContext } from "./SessionContext";
import { useLocalStorageState } from "@toolpad/core";
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
];

const BRANDING = {
  title: "SYSGAS",
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
  console.log({ session });
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
