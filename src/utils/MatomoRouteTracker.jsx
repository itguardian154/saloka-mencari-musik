import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MatomoRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname + location.search + location.hash;

    // pastikan queue ada
    window._paq = window._paq || [];

    // delay kecil supaya matomo.js sempat load (hindari first-hit miss)
    const t = setTimeout(() => {
      window._paq.push(["setCustomUrl", url]);
      window._paq.push(["setDocumentTitle", document.title]);
      window._paq.push(["trackPageView"]);
      console.log("[Matomo] sent pageview:", url);
    }, 0);

    return () => clearTimeout(t);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
