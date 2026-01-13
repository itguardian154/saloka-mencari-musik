import { Music, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate, } from "react-router-dom"
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react"
import axios from "axios";


export function DaftarAudio({ id }) {
  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);

  const navigate = useNavigate();

  const secretKey = API_URLS.secretKey;


  const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
  };

  const clearData = () => {
    setDetailMusik({});
  };

  // Get Data Musik by ID Composer Start
  const [detailMusik, setDetailMusik] = useState([]);

  useEffect(() => {
    const getDetailDataMusik = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === true) {
          if (response.data.data != null) {
            setDetailMusik(response.data.data.music_works || []);
          } else {
            clearData();
          }
        } else {
          clearData();
        }
      } catch (error) {
        clearData();
        console.log(error);
        console.log(
          error?.response?.data?.message ||
          "Error catching data"
        );
      }
    };

    if (id && detailUser.token) {
      getDetailDataMusik();
    }
  }, [id, detailUser.token]);

  const hasPaidAccess = detailMusik.find(
    (item) =>
      item.payment_status === "pending" &&
      item.status !== "approved"
  );
  //console.log("ini id musik", hasPaidAccess.id)  
  const approvedMusics = detailMusik.filter(
    (item) => item.status === "approved"
  );

  const isEmptyMusic =
    detailMusik.length === 0;
  // Get Data Musik by ID End

  return (
    <div
      className="
        flex w-full max-w-full flex-col gap-6
        rounded-3xl
        bg-gradient-to-br
        from-emerald-950/60 via-slate-900/70 to-emerald-900/60
        backdrop-blur-xl
        border border-emerald-400/15
        shadow-[0_0_40px_rgba(16,185,129,0.08)]
      "
    >
      {/* ================= INFO UPLOAD ================= */}
      <CardContent className="flex flex-col items-center gap-6 py-4 text-center">
        {/* Icon */}
        <div
          className="
            flex h-12 w-12 items-center justify-center rounded-2xl
            bg-gradient-to-br from-emerald-400 to-emerald-600
            shadow-[0_0_25px_rgba(16,185,129,0.5)]
          "
        >
          <Music className="h-6 w-6 text-white" />
        </div>

        {/* Text */}
        <div className="max-w-xl space-y-3">
          <p className="text-sm font-mono leading-relaxed text-emerald-50">
            Silahkan klik tombol Upload Musik lalu lakukan pembayaran biaya
            pendaftaran dahulu. Anda dapat mengirimkan karya lebih dari 1 dengan
            tetap membayar biaya pendaftaran kembali.
          </p>
        </div>

        {/* Button */}
        <Button type="button" className=" h-11 rounded-full bg-emerald-500 px-8 text-sm font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] active:scale-95 "
          onClick={() => { window.location.href = "https://checkout.xendit.co/web/695253bbb95adc00e7a229a8" }} >
          <Upload className="mr-2 h-4 w-4" />
          Upload Karya Musik
        </Button>
      </CardContent>

      {/* ================= PLAYLIST CARD ================= */}
      <Card
        className="
          rounded-3xl
          bg-slate-900/70
          backdrop-blur-xl
          border border-emerald-400/15
          shadow-[0_0_50px_rgba(0,0,0,0.6)]
        "
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-emerald-50">
            Playlist Musik
          </CardTitle>
          <p className="text-sm text-emerald-100/80">
            Daftar musik yang telah kamu unggah
          </p>
        </CardHeader>

        {/* ================= EMPTY STATE ================= */}
        {isEmptyMusic && (
          <CardContent className="space-y-3">
            <div
              className="
              relative flex flex-col gap-4  rounded-xl
              bg-slate-800/60
              border border-emerald-400/10
              p-4
              transition
              hover:bg-slate-800/80
               md:flex-row md:items-start
            "
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-emerald-400/40" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/60">
                <Music className="h-5 w-5 text-emerald-200" />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-emerald-50">
                  Belum ada musik yang diunggah
                </p>
                <p className="text-sm text-emerald-100/80">
                  Yuk, upload musik pertamamu dengan klik
                  <span className="font-medium text-emerald-300">
                    {" "}
                    Upload Karya Musik{" "}
                  </span>
                  di atas.
                </p>
              </div>
            </div>
          </CardContent>
        )}

        {/* ================= AKSES AKTIF ================= */}
        {hasPaidAccess && (
          <CardContent className="space-y-3">
            <div
              className="
      relative flex flex-col gap-4 rounded-xl
      bg-gradient-to-r
      from-emerald-900/60 via-slate-900/70 to-slate-900/60
      border border-emerald-400/25
      p-3
      transition
      hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]
      md:flex-row md:items-start
    "
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.8)]" />

              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                <Music className="h-5 w-5 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-emerald-50">
                  Akses Upload Aktif
                </p>
                <p className="text-xs font-medium text-emerald-400">
                  Kamu sudah bisa mengunggah musik
                </p>
                <p className="text-xs italic text-emerald-100/80">
                  Klik tombol Upload Musik untuk mengisi musik pada slot ini
                </p>
              </div>

              {/* Button */}
              <div className="w-full md:w-auto">
                <Button
                  className="w-full md:w-auto"
                  onClick={() =>
                    navigate(
                      `/participant/form/${encodeURIComponent(
                        encryptData(hasPaidAccess.id, secretKey)
                      )}`
                    )
                  }
                >
                  Upload Musik
                </Button>
              </div>
            </div>
          </CardContent>

        )}

        {/* ================= ITEM MUSIK ================= */}
        {approvedMusics.map((music, index) => (
          <CardContent className="space-y-3" key={index}>
            <div
              className="
      relative flex flex-col gap-4 rounded-xl
      bg-gradient-to-r
      from-emerald-900/60 via-slate-900/70 to-slate-900/60
      border border-emerald-400/25
      p-3
      transition
      hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]
      md:flex-row md:items-start
    "
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.6)]" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                <Music className="h-5 w-5 text-white" />
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-emerald-50">
                  {music.title}
                </p>
                <p className="text-xs font-medium text-emerald-400">Jazz</p>
                <p className="text-xs text-emerald-200/60">
                  {music.description}
                </p>
                <p className="text-xs italic text-emerald-100/80 pt-1">
                  {music.filename}
                </p>
                {/* AUDIO PLAYER (HIDDEN) */}
                {music.audio_link && (
                  <div className="origin-left scale-y-75">
                    <audio controls className="w-full">
                      <source src={music.audio_link} type="audio/mpeg" />
                    </audio>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
