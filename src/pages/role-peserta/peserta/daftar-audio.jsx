import { Music, Play, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ItemActions,
} from "@/components/ui/item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate, } from "react-router-dom"


export function DaftarAudio({ id }) {
  const navigate = useNavigate();


  return (
    <div className="flex w-full max-w-full flex-col gap-6">
      <Card className="h-full rounded-3xl border border-slate-100 bg-slate-100 p-3 transition hover:bg-slate-100/70 shadow-sm backdrop-blur">
        <CardContent className="flex flex-col items-center gap-6 py-4 text-center">

          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md">
            <Music className="h-6 w-6 text-white" />
          </div>

          {/* Text */}
          <div className="max-w-xl space-y-3">
            {/* <p className="text-xs font-semibold tracking-widest text-emerald-400">
              UPLOAD MUSIK DISINI
            </p> */}
            <p className="text-sm font-mono leading-relaxed text-slate-600">
              Silahkan klik tombol Upload Musik lalu lakukan pembayaran biaya pendaftaran dahulu. Anda dapat mengirimkan karya lebih dari 1 dengan tetap membayar biaya pendaftaran kembali.
            </p>
          </div>

          {/* Button */}
          <Button
            type="button"
            className="
      h-11
      rounded-full
      bg-emerald-500
      px-8
      text-sm
      font-semibold
      uppercase
      tracking-wide
      text-black
      shadow-md
      transition
      hover:bg-emerald-400
      hover:shadow-[0_0_25px_rgba(34,197,94,0.45)]
      active:scale-95
    "
            onClick={() => {
              window.location.href =
                "https://checkout.xendit.co/web/695253bbb95adc00e7a229a8"
            }}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Karya Musik
          </Button>
        </CardContent>
      </Card>

      <Card className="h-full rounded-3xl border border-slate-200/60 bg-white shadow-sm backdrop-blur">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Playlist Musik
            </CardTitle>
          </div>
          <p className="text-sm text-slate-500">
            Daftar musik yang telah kamu unggah
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="relative group flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

            {/* Accent kiri - soft */}
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-slate-300" />

            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 shadow-sm">
                <Music className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-slate-700">
                Belum ada musik yang diunggah
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                Yuk, upload musik pertamamu dengan cara klik tombol
                <span className="font-medium text-slate-600"> Upload Musik </span>
                di atas.
              </p>
            </div>
          </div>
        </CardContent>

        <CardContent className="space-y-3">
          <div className="relative group flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-100 p-3 transition hover:bg-slate-100/70">

            {/* Accent kiri */}
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />

            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                <Music className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                Akses Upload Aktif
              </p>

              <p className="text-xs font-medium text-emerald-600">
                Kamu sudah bisa mengunggah musik
              </p>

              <p className="text-[11px] italic text-slate-400">
                Upload musik untuk mengisi slot ini pada form yang sudah tersedia
              </p>
            </div>

            <ItemActions className="self-center">
              <Button onClick={() => navigate("/participant/form")}>
                Upload Musik
              </Button>
            </ItemActions>
          </div>
        </CardContent>

        <CardContent className="space-y-3">
          <div className="relative group flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-100 p-3 transition hover:bg-slate-100/70">

            {/* Accent kiri */}
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.55)]" />

            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                <Music className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                Saloka Ceria Tiada Habisnya
              </p>

              <p className="text-xs font-medium text-emerald-600">
                Jazz
              </p>

              <p className="text-xs text-slate-500 line-clamp-2">
                Lagu santai dengan nuansa jazz yang cocok untuk menemani sore hari.
              </p>

              <p className="text-[11px] italic text-slate-400">
                SAL001 - Antika Lorien - Saloka Ceria Tiada Habisnya.mp3
              </p>
            </div>

            <ItemActions className="self-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8 rounded-full"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Play Musik</p>
                </TooltipContent>
              </Tooltip>
            </ItemActions>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}
