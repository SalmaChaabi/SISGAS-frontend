import * as React from "react";
import type { Session } from "@toolpad/core";

type UserSession = {
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
    role: string;
  };
};
export interface SessionContextValue {
  session: UserSession | null;
  setSession: (session: UserSession | null) => void;
}

export const SessionContext = React.createContext<SessionContextValue>({
  session: null,
  setSession: () => {},
});

export function useSession() {
  return React.useContext(SessionContext);
}
