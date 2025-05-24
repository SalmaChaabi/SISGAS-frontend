import { useLocalStorageState } from "@toolpad/core";
import type { Session } from "@toolpad/core/AppProvider";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Outlet } from "react-router";
import { SessionContext } from "./SessionContext";



export default function App() {
  const [session, setSessionState] = React.useState<Session | null>(null);
  const [localStorageSession, setLocalStorageSession] = useLocalStorageState(
    "session",
    null
  ); 

  

  const setSession = (session: Session | null) => {
    setSessionState(session);
    if (session !== null) {
      setLocalStorageSession(JSON.stringify(session));
    } else {
      setLocalStorageSession(null);
    }
  };
 

  const sessionContextValue = React.useMemo(
    () => ({ session, setSession }),
    [session, setSession]
  );

  React.useEffect(() => {
    if (localStorageSession) setSession(JSON.parse(localStorageSession));
  }, [localStorageSession]);
  return (
    <SessionContext.Provider value={sessionContextValue}>
      <Outlet />
    </SessionContext.Provider>
  );
}
