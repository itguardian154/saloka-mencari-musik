import { mediaLogo } from "@/assets/image/logo";

export function PenutupView() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/img/TESSELLATION%20SALOKA%20-%202880x1800%20(GREY%20FADE).jpg')",
      }}
    >
      {/* Overlay supaya card lebih terbaca */}
      <div className="absolute inset-0"></div>

      <div className="relative max-w-xl w-full bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-4 lg:p-10 text-center border border-slate-200">

        {/* Title */}
        <img
          src={mediaLogo[0]}
          alt="Logo Saloka"
          className="mx-auto mb-4 w-1/2"
        />

        {/* Badge */}
        <div className="mb-6 mt-8">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-4 py-1 rounded-full">
            PENDAFTARAN DITUTUP
          </span>
        </div>

        {/* Content */}
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Hai Sobat Loka, terima kasih atas antusiasnya. Saat ini,
          pendaftaran <span className="font-semibold text-slate-800">Saloka Mencari Musik</span> sudah ditutup.
          <br /><br />
          Pemenang akan diumumkan pada{" "}
          <span className="font-semibold text-slate-800">
            1 April 2026
          </span>{" "}
          di Sosial Media Saloka Theme Park.
          <br /><br />
          Mohon ditunggu ya!
          <br />
          <span className="font-semibold">Matur Nuwun.</span>
        </p>

        {/* Footer */}
        <div className="mt-8 text-xs text-slate-400">
          © 2026 Saloka Theme Park
        </div>
      </div>
    </div>
  );
}