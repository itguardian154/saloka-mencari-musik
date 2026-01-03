import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon, Music } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "lucide-react"

export default function ScreenRecord() {
  const [videoURL, setVideoURL] = useState(null)
  const [fileName, setFileName] = useState("")

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    setVideoURL(URL.createObjectURL(file))
  }

  return (
    <form className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Upload Screen Record</h1>
        <p className="text-sm text-muted-foreground">
          Upload screen record proses pembuatan lagu (durasi 30–60 detik)
        </p>
      </div>

      <div className="relative group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white/5 px-6 py-10 text-center transition hover:bg-white/10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gossamer-50 text-gossamer-400">
          <Video size={28} />
        </div>

        <div>
          <div class="mt-1 flex text-sm/6 text-gray-400">
            <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-slate-600">
              <span>Upload a file</span>
              <input id="file-upload" type="file" name="file-upload" class="sr-only" />
            </label> <p class="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-400"> MP4 • Max 10MB </p>
        </div>

        <input
          type="file"
          accept="video/mp4"
          onChange={handleUpload}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        {videoURL && (
          <div className="mt-4 w-fit">
            <p className="text-xs text-gray-300 mb-1 truncate">
              🎬 {fileName}
            </p>
            <video
              src={videoURL}
              controls
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
    </form>
  )
}