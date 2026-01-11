import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { InfoIcon, Music, ChevronsUpDown, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import API_URLS from "../../../../config";
import { toast } from "sonner"


const UploadAudio = ({ idMusik, onSuccess }) => {
  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);

  //console.log("id musik", idMusik);
  const [audioURL, setAudioURL] = useState(null);
  const [fileName, setFileName] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [openCombobox, setOpenCombobox] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [existingAudioLink, setExistingAudioLink] = useState(null);
  const [valueForm, setValueForm] = useState({
    title: "",
    genre_id: "",
    genre: "",
    description: "",
    lyrics: "",
    status: "submitted",
    work_link: "",
  });

  /* ===================== GENRE ===================== */
  const [dataGenre, setDataGenre] = useState([]);

  useEffect(() => {
    const getDataGenre = async () => {
      try {
        const res = await axios.get(
          `${API_URLS.mencariMusik}/genres`
        );
        if (res.status === 200 && res.data.status === true) {
          setDataGenre(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setDataGenre([]);
      }
    };
    getDataGenre();
  }, []);

  const handleSelectedGenre = (gen) => {
    setValueForm((prev) => ({
      ...prev,
      genre: gen.name,
      genre_id: gen.id,
    }));
    setOpenCombobox("");
  };

  const handleChange = (field, value) => {
    setValueForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ===================== FILE ===================== */
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["audio/mpeg", "audio/wav"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus MP3 atau WAV");
      return;
    }

    setAudioFile(file);
    setFileName(file.name);
    setAudioURL(URL.createObjectURL(file));
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async () => {
    if (isLoading) return; // ⛔ cegah submit dobel

    if (!valueForm.title) {
      toast.error("Judul lagu wajib diisi");
      return;
    }

    if (!valueForm.genre_id) {
      toast.error("Genre wajib diisi");
      return;
    }

    if (!valueForm.description) {
      toast.error("Deskripsi wajib diisi");
      return;
    }

    if (!valueForm.lyrics) {
      toast.error("Lirik lagu wajib diisi");
      return;
    }

    const hasExistingAudio = !!existingAudioLink;

    if (!audioFile && !hasExistingAudio) {
      toast.error("File musik wajib diupload");
      return;
    }


    if (!valueForm.work_link) {
      toast.error("Link wajib diisi");
      return;
    }

    try {
      setIsLoading(true);
      //toast.loading("Mengupload karya musik...");

      // 1️⃣ CREATE MUSIC WORK
      const createRes = await axios.put(
        `${API_URLS.mencariMusik}/music-works/${idMusik}`,
        valueForm,
        {
          headers: {
            Authorization: `Bearer ${detailUser.token}`,
          },
        }
      );

      const musicWorkId = createRes.data?.data?.id;
      if (!musicWorkId) {
        throw new Error("ID music work tidak ditemukan");
      }

      if (audioFile) {
        const fd = new FormData();
        fd.append("audio", audioFile);

        await axios.post(
          `${API_URLS.mencariMusik}/music-works/${musicWorkId}/upload-audio`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );
      }

      toast.dismiss();
      toast.success("Upload berhasil!");
      onSuccess?.();

    } catch (err) {
      toast.dismiss();
      toast.error(
        err?.response?.data?.message || err.message || "Upload gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);


  // Get Data Musik by ID Musik Start
  useEffect(() => {
    const getDetailDataMusik = async () => {
      try {
        const res = await axios.get(
          `${API_URLS.mencariMusik}/music-works/${idMusik}`,
          {
            headers: {
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        const data = res.data?.data;
        if (!data) return;

        // ✅ JIKA SUDAH PERNAH SUBMIT → PREFILL FORM
        if (data.status === "submitted") {
          setValueForm({
            title: data.title || "",
            genre_id: data.genre_id || "",
            genre: data.genre?.name || "",
            description: data.description || "",
            lyrics: data.lyrics || "",
            work_link: data.work_link || "",
          });

          // audio lama
          if (data.audio_link) {
            setExistingAudioLink(data.audio_link);
            setAudioURL(data.audio_link);
            setFileName(data.filename);
          }
        }

        // ❌ JIKA BELUM SUBMIT
        // biarkan valueForm default (kosong)
      } catch (err) {
        console.log(err);
      }
    };

    if (idMusik && detailUser.token) {
      getDetailDataMusik();
    }
  }, [idMusik, detailUser.token]);
  // Get Data Musik by ID Musik End


  return (
    <>
      {isLoading && (
        <div className="w-full fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="w-fit flex flex-col items-center gap-1 rounded-3xl bg-white px-12 py-10 shadow-2xl">
            <Loader2 className="h-10 w-10 animate-spin text-gossamer-600" />

            <p className="text-md font-medium text-slate-700">
              Mengupload karya musik...
            </p>
            <p className="text-sm text-slate-400">
              Mohon jangan menutup halaman ini
            </p>
          </div>
        </div>
      )}

      <form className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-emerald-50">
            Upload Karya Musik
          </h1>
          <p className="text-balance text-sm text-emerald-400">
            Masukan semua data yang sesuai form dibawah ini, dan harap
            isi dengan benar.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Judul Lagu */}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="judul-lagu" className="text-emerald-50">Judul Lagu</Label>
            <Input
              id="judul-lagu"
              name="judul-lagu"
              type="text"
              placeholder="Masukan judul lagu"
              autoComplete="off"
              value={valueForm.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full h-11 placeholder:text-sm text-emerald-50"
            />
          </div>

          {/* Genre */}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="genre" className="text-emerald-50">Genre</Label>
            <Popover
              open={openCombobox === "genre"}
              onOpenChange={(open) => setOpenCombobox(open ? "genre" : "")}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-11 bg-transparent border text-emerald-50 hover:bg-emerald-500/20 hover:text-emerald-50"
                >
                  {valueForm.genre || "Pilih genre"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-2 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-emerald-100 text-emerald-50"
              >
                <Command className="bg-transparent">
                  <CommandInput
                    placeholder="Cari Genre"
                    className="h-9 bg-transparent placeholder-emerald-300 text-emerald-100"
                  />
                  <CommandList className="bg-transparent">
                    <CommandEmpty className="text-emerald-300">No genre found.</CommandEmpty>

                    <CommandGroup>
                      {dataGenre.map((gen) => (
                        <CommandItem
                          key={gen.id}
                          value={gen.name}
                          onSelect={() => handleSelectedGenre(gen)}
                          className="text-slate-950 hover:bg-emerald-500/20 rounded-md"
                        >
                          {gen.name}
                          {valueForm.genre_id === gen.id && (
                            <Check className="ml-auto h-4 w-4 opacity-100" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>

                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Deskripsi */}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="deskripsi" className="text-emerald-50">Deskripsi</Label>
            <Textarea
              placeholder="Masukkan deskripsi singkat lagu"
              className="min-h-[220px] text-emerald-50"
              value={valueForm.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Lirik Lagu */}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="lirik-lagu" className="text-emerald-50">
              Lirik Lagu
            </Label>

            <Textarea
              id="lirik-lagu"
              placeholder={`Masukkan lirik lagu disini`}
              className="min-h-[220px] text-emerald-50"
              value={valueForm.lyrics}
              onChange={(e) => handleChange("lyrics", e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label className="text-emerald-50">Upload File Musik</Label>

            <div className="relative group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white/5 px-6 py-10 text-center">

              {/* 🔥 SATU INPUT SAJA */}
              <input
                id="file-upload"
                type="file"
                accept="audio/mpeg,audio/wav"
                onChange={handleUpload}
                className="absolute inset-0 cursor-pointer opacity-0"
              />

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gossamer-50 text-gossamer-400">
                <Music size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold text-emerald-400">
                  Upload a file
                </p>
                <p className="text-xs text-gray-400">
                  MP3 / WAV • Max 5MB
                </p>
              </div>

              {audioURL && (
                <div className="mt-4 w-full">
                  <p className="text-xs text-gray-300 mb-1 truncate">
                    🎵 {fileName}
                  </p>
                  <audio controls className="w-full">
                    <source src={audioURL} />
                  </audio>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="link" className="text-emerald-50">Link Google Drive</Label>
            <Input
              id="link"
              name="link"
              type="text"
              placeholder="Masukan link"
              required
              autoComplete="off"
              value={valueForm.work_link}
              onChange={(e) => handleChange("work_link", e.target.value)}
              className="w-full h-11 placeholder:text-sm text-emerald-50"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Alert variant="info">
              <InfoIcon className="-mx-2 text-emerald-400" />
              <AlertTitle>Informasi Penting</AlertTitle>
              <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                  <li>
                    Harap cek lagi file musik dan url google drive Anda. Pastikan sudah sesuai dengan ketentuan
                  </li>
                  <li>
                    Contoh link google drive: https://drive.google.com/drive/folders/1ZoY_H_G3J58HhoCr6c3zVkiDTTbOVu5
                  </li>
                  <li>
                    Pastikan izin akses google drive Anda sudah terbuka
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>
        <div className="flex justify-end mt-2">
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Mengupload..." : "Next"}
          </Button>
        </div>
      </form >
    </>
  )
}

export default UploadAudio;