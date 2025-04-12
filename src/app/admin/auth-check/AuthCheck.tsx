"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type AuthCheckProps = {
  children?: React.ReactNode;
};

export const AuthCheck = (props: AuthCheckProps) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");
      const data = await response.json();

      setIsAuthenticated(data.isAuthenticated);
      // return data;
      // console.log("checkAuth");
    };

    checkAuth();
    //   .then(() => {
    //     router.push("/admin/home");
    //     return;
    //   })
    //   .catch(() => {
    //     console.log("catch");
    //     router.push("/admin/login");
    //     return;
    //   });
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/admin/login");
      return;
    }
    if (isAuthenticated === true && pathname === "/admin/login") {
      router.push("/admin/home");
      return;
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Или любой другой индикатор загрузки
  }

  return (
    <div>{isAuthenticated ? children : <p>User is not authenticated</p>}</div>
  );
};
