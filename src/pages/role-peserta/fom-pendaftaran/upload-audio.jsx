import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon, Music } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function UploadAudio() {
  const [audioURL, setAudioURL] = useState(null)
  const [fileName, setFileName] = useState("")

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    setAudioURL(URL.createObjectURL(file))
  }

  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">
          Upload Karya Musik
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Masukan semua data yang sesuai form dibawah ini, dan harap
          isi dengan benar.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Judul Lagu */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="judul-lagu">Judul Lagu</Label>
          <Input
            id="judul-lagu"
            name="judul-lagu"
            type="text"
            placeholder="Masukan judul lagu"
            required
            autoComplete="off"
            className="w-full h-11 placeholder:text-sm"
          />
        </div>

        {/* Genre */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="genre">Genre</Label>
          <Select
            name="genre"
          >
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Pilih Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pop">
                Pop
              </SelectItem>
              <SelectItem value="Rock">
                Rock
              </SelectItem>
              <SelectItem value="Heavy Metal">
                Heavy Metal
              </SelectItem>
              <SelectItem value="Hip Hop & Rap">
                Hip Hop & Rap
              </SelectItem>
              <SelectItem value="House">
                House
              </SelectItem>
              <SelectItem value="Techno">
                Techno
              </SelectItem>
              <SelectItem value="R&B">
                R&B
              </SelectItem>
              <SelectItem value="Soul">
                Soul
              </SelectItem>
              <SelectItem value="Blues">
                Blues
              </SelectItem>
              <SelectItem value="Jazz">
                Jazz
              </SelectItem>
              <SelectItem value="Country">
                Country
              </SelectItem>
              <SelectItem value="Others">
                Others
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deskripsi */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="deskripsi">Deskripsi</Label>
          <Textarea placeholder="Masukkan deskripsi singkat lagu" className="min-h-[220px]" />
        </div>

        {/* Lirik Lagu */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="lirik-lagu">
            Lirik Lagu
          </Label>

          <Textarea
            id="lirik-lagu"
            placeholder={`Masukkan lirik lagu disini`}
            className="min-h-[220px]"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="relative group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/30 bg-white/5 px-6 py-10 text-center transition border-slate-300 hover:bg-white/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gossamer-50 text-gossamer-400">
              <Music size={28} />
            </div>

            <div>
              <div class="mt-1 flex text-sm/6 text-gray-400">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-slate-600">
                  <span>Upload a file</span>
                  <input id="file-upload" type="file" name="file-upload" class="sr-only" />
                </label> <p class="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400"> MP3 / WAV • Max 10MB </p>
            </div>

            <input
              type="file"
              accept="audio/mpeg,audio/wav"
              onChange={handleUpload}
              className="absolute inset-0 cursor-pointer opacity-0"
            />

            {audioURL && (
              <div className="mt-4 w-full">
                <p className="text-xs text-gray-300 mb-1 truncate">
                  🎵 {fileName}
                </p>
                <audio controls className="w-full">
                  <source src={audioURL} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Alert variant="info">
            <InfoIcon className="-mx-2" />
            <AlertTitle>Informasi Penting</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm">
                <li>
                  Lagu bertema “Keceriaan Rekreasi Keluarga” (muatan lagu dapat mengangkat konsep rekreasi keluarga di alam bebas yang diangkat melalui seni, teknologi, budaya, dll secara filosofis, fantasi, momen sesaat, ataupun nostalgia memory).
                </li>
                <li>
                  Lagu berdurasi 3–5 menit.
                </li>
                <li>
                  Lagu bergenre bebas namun tidak berbentuk jingle.
                </li>
                <li>
                  Lagu dikirimkan dalam bentuk demo dengan format MP3 atau WAV.
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </form >
  )
}