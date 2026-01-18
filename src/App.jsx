import { mediaBanner } from "@/assets/image/banner";
import { mediaLogo } from "@/assets/image/logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MatomoRouteTracker from "@/utils/MatomoRouteTracker";

function Home() {
  return (
    <div className="h-screen bg-green-600 flex items-center justify-center text-white text-3xl">
      HOME
      <Link to="/signup" className="block text-lg underline mt-4">
        Ke Signup
      </Link>
    </div>
  );
}

function Signup() {
  return (
    <div className="h-screen bg-blue-600 flex items-center justify-center text-white text-3xl">
      SIGNUP PAGE
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MatomoRouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
