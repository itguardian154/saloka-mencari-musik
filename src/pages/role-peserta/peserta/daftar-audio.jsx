import { Music, Play } from "lucide-react"
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
import { useNavigate } from "react-router-dom"


export function DaftarAudio() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-full flex-col gap-6">
      <Card className="h-full rounded-3xl border border-slate-100 bg-slate-100 p-3 transition hover:bg-slate-100/70 shadow-sm backdrop-blur">
        <CardContent className="flex flex-col items-start gap-3 py-0 text-left">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                <Music className="h-5 w-5 text-white" />
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600">
                Silahkan klik tombol Upload Musik untuk melakukan pembayaran dan upload musik Anda.
              </p>
              <p className="text-sm text-slate-600">
                Anda dapat mengirimkan karya lebih dari 1 dengan tetap membayar biaya pendaftaran kembali.
              </p>
            </div>
          </div>

          {/* Button */}
          <Button
            type="button"
            size="lg"
            className="w-fit mt-2"
            onClick={() => {
              window.location.href =
                "https://checkout.xendit.co/web/695253bbb95adc00e7a229a8"
            }}
          >
            Upload Musik
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
          <div className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-100 p-4 transition hover:bg-slate-100/70">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                <Music className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-slate-800">
                Belum ada musik yang diunggah
              </p>

              <p className="text-sm text-slate-500">
                Yuk, upload musik pertamamu dengan cara klik tombol Upload Musik di atas.
              </p>
            </div>
          </div>
        </CardContent>

        <CardContent className="space-y-3">
          <div className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-100 p-3 transition hover:bg-slate-100/70">
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
              <Button onClick={() => navigate("/participant/form")} className="w-fit"> Upload Musik </Button>
            </ItemActions>
          </div>
        </CardContent>

        <CardContent className="space-y-3">
          <div className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-100 p-3 transition hover:bg-slate-100/70">
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
                  <Button className="w-8 h-8"> <Play /> </Button>
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
