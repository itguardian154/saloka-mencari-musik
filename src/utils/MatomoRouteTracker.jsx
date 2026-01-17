import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MatomoRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!window._paq) return;

    const url = location.pathname + location.search + location.hash;

    window._paq.push(["setCustomUrl", url]);
    window._paq.push(["setDocumentTitle", document.title]);
    window._paq.push(["trackPageView"]);
  }, [location]);

  return null;
}
