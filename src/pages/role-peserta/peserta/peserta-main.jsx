import { useEffect } from "react";
import { DaftarAudio } from "./daftar-audio";
import ProfilePeserta from "./profile";
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom";

export default function PesertaMain() {
  useEffect(() => {
    document.title = "Saloka Mencari Musik";
  }, []);


  const { id } = useParams();
  const secretKey = API_URLS.secretKey;

  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  const decryptID = decryptData(decodeURIComponent(id), secretKey);
  //console.log(decryptID);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* ================= FULL BACKGROUND ================= */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br 
    from-slate-900 via-slate-800 to-emerald-900/80" />

      {/* Soft global glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-48 right-1/3 h-[520px] w-[520px]
      rounded-full bg-emerald-400/25 blur-[160px]" />
        <div className="absolute -bottom-48 left-1/3 h-[460px] w-[460px]
      rounded-full bg-teal-300/20 blur-[160px]" />
      </div>

      {/* ================= LEFT MUSIC ORNAMENT ================= */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-[32%] -z-10 overflow-hidden">

        {/* subtle separator */}
        <div className="absolute inset-y-0 right-0 w-px bg-white/10" />

        {/* Vinyl rings */}
        <div className="absolute -left-32 top-1/2 h-[760px] w-[760px]
      -translate-y-1/2 rounded-full
      border border-emerald-400/15 animate-spin-slow" />

        <div className="absolute -left-12 top-1/2 h-[540px] w-[540px]
      -translate-y-1/2 rounded-full
      border border-emerald-400/20 animate-spin-reverse" />

        {/* Core energy */}
        <div className="absolute -left-6 top-1/2 h-[380px] w-[380px]
      -translate-y-1/2 rounded-full
      bg-emerald-400/35 blur-[140px] animate-beat-pulse" />

        {/* Equalizer shadow */}
        <div className="absolute bottom-0 left-0 w-full flex items-end gap-1 px-6 opacity-[0.1]">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-[6px] rounded-full bg-emerald-400"
              style={{
                height: `${16 + (i % 6) * 18}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Right fade */}
        <div className="absolute inset-0 bg-gradient-to-r
      from-black/70 via-black/30 to-transparent" />
      </div>

      {/* ================= WAVE FLOOR ================= */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full -z-10 opacity-[0.07]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#10b981"
            d="M0,160L60,120C120,80,240,40,360,64C480,88,600,176,720,202C840,228,960,192,1080,170C1200,148,1320,144,1440,150L1440,320H0Z"
          />
        </svg>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative grid grid-cols-12">
        {/* Floating music notes */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <svg
              key={i}
              className="absolute text-emerald-300/35"
              style={{
                left: `${5 + Math.random() * 55}%`,
                bottom: `${-30 + Math.random() * 40}%`,
                width: `${18 + Math.random() * 20}px`,
                height: `${18 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${18 + Math.random() * 20}s`,
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-3 pt-6 pl-6">
          <div className="rounded-2xl bg-white/85 backdrop-blur-md
        shadow-lg border border-emerald-100">
            <ProfilePeserta id={decryptID} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 p-6">
          <div className="rounded-3xl bg-white/90 backdrop-blur-md
        shadow-xl border border-emerald-100">
            <DaftarAudio id={decryptID} />
          </div>
        </div>

      </div>
    </div>
  );
}