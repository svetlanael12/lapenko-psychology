"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useScrollToAnchor() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = (id: string, offset = 100) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const scroll = () => {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Удаляем хэш после скролла
          setTimeout(() => {
            window.history.replaceState(null, "", window.location.pathname);
          }, 2000);
        };

        scroll();
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Удаляем хэш после скролла
          setTimeout(() => {
            window.history.replaceState(null, "", window.location.pathname);
          }, 2000);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return scrollTo;
}
