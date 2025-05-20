import React from "react";
import { useSession } from "../SessionContext";

const useUserRole = () => {
  const { session } = useSession();
  console.log(session?.user.role == "67fa509f65f4d46cdf0f0339",session)
  return {
    role: "",
    isAdmin: session?.user.role == "67fa509f65f4d46cdf0f0339",
    isFournisseur: session?.user.role == "67f7dc3c155978edc726468a",
    isComptable: session?.user.role == "67f7dc53155978edc726468e",
    isTechnicien: session?.user.role == "67f814247c1d56a4cfcb7a83",
  };
};

export default useUserRole;
