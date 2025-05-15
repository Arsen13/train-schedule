"use client";

import { UserT } from "@/lib/types";
import { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import UserEmailSkeleton from "../skeletons/UserEmailSkeleton";

export default function Navbar() {
  const [user, setUser] = useState<UserT>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="flex flex-row mt-2 mx-8 justify-between">
      <p className="text-3xl">{user?.stationName} Station</p>
      <div className="flex flex-row items-center gap-3">
        {user?.email ? (
          <p className="italic">{user?.email}</p>
        ) : (
          <UserEmailSkeleton />
        )}

        <LogoutBtn />
      </div>
    </div>
  );
}
