import { useEffect } from "react";
import { DaftarAudio } from "./daftar-audio";
import ProfilePeserta from "./profile";

export default function PesertaMain() {
  useEffect(() => {
    document.title = "Saloka Mencari Musik";
  }, []);
  return (
    <div className="relative w-full">
      {/* BACKGROUND FULL HEIGHT */}
      <div className="fixed top-0 left-0 w-full h-full flex -z-10">
        <div className="hidden lg:block w-1/4 h-full bg-gradient-to-b bg-muted shadow-inner" />
        <div className="w-full lg:w-3/4 h-full bg-gradient-to-b" />
      </div>

      {/* CONTENT */}
      <div className="relative grid grid-cols-12 gap-0">
        {/* LEFT - Profile */}
        <div className="col-span-12 lg:col-span-3 p-6">
          <ProfilePeserta />
        </div>

        {/* RIGHT - Content */}
        <div className="col-span-12 lg:col-span-9 p-8">
          <DaftarAudio />
        </div>
      </div>
    </div>

  )
}