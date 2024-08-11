"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { useSession, signOut } from "next-auth/react";

const Settingspage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
};

export default Settingspage;
