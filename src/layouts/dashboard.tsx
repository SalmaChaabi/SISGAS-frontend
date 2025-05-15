import * as React from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useSession } from "../SessionContext";

export default function Layout() {
  const { session } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(session);

  React.useEffect(() => {
    // Add the `callbackUrl` search parameter

    
    const timeoutId = setTimeout(() => {//set he timeout: wait for 100 msec to run the code
      if (!session) {
        const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
        navigate(redirectTo, { replace: true });
      }
    }, 100);
    return () => clearTimeout(timeoutId); //clear the timeout when the component unmounts (finished the render)
  }, [session]);
  
  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
