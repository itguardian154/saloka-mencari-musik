"use client"

import { useRef, useState } from "react"
import { CirclePause, Music, Play } from "lucide-react"
import { ItemActions } from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function Konfirmasi() {
  const audioRef = useRef(null)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoUrl =
    "https://www.w3schools.com/html/mov_bbb.mp4"

  const audioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Konfirmasi</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Pastikan semua data sudah benar sebelum Anda menekan tombol submit.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 pt-4">

        {/* AUDIO CARD */}
        <div className="group flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-100 p-3 transition hover:bg-slate-100/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
              <Music className="h-5 w-5 text-white" />
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-tight">
              SAL001 - Antika Lorien - Saloka Ceria Tiada Habisnya.mp3
            </p>
          </div>

          <ItemActions>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={togglePlay}
                  className="w-8 h-8 p-0"
                >
                  {isPlaying ? <CirclePause /> : <Play />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "Pause Audio" : "Play Audio"}</p>
              </TooltipContent>
            </Tooltip>
          </ItemActions>
        </div>

        {/* AUDIO PLAYER (HIDDEN) */}
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* VIDEO PREVIEW */}
      <div className="flex justify-center pt-10">
        <div className="w-full max-w-3xl overflow-hidden rounded-xl border bg-black shadow-sm">
          <video
            src={videoUrl}
            controls
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  )
}
