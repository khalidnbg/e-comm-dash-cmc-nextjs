import { useEffect, useState } from "react";

export const useOrigine = () => {
  const [mounted, setIsMounted] = useState(false);

  const origine =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origine;
};
