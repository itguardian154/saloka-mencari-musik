"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios";
import API_URLS from "../../../../config";
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Link } from "lucide-react";
import { useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js";


export default function Konfirmasi({ idMusik, onPrevious, onSuccess }) {
  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, [])

  const handleFinalSubmit = () => {
    console.log("submit final")
  }

  const clearData = () => {
    setDetailMusik({});
  };

  const [audioURL, setAudioURL] = useState(null);
  const [fileName, setFileName] = useState("");
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [valueForm, setValueForm] = useState({
    status: "approved",
  });
  const secretKey = API_URLS.secretKey;
  const navigate = useNavigate();

  const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
  };


  // Get Data Musik by ID Composer Start
  const [detailMusik, setDetailMusik] = useState({});

  useEffect(() => {
    const getDetailDataMusik = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/music-works/${idMusik}`,
          {
            headers: {
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === true) {
          const data = response.data.data;
          setDetailMusik(data);

          if (data.audio_link) {
            setAudioURL(data.audio_link);
            setFileName(data.filename);
          }
        }
        else {
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

    if (idMusik && detailUser.token) {
      getDetailDataMusik();
    }
  }, [idMusik, detailUser.token]);
  // Get Data Musik by ID End

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const createRes = await axios.put(
        `${API_URLS.mencariMusik}/music-works/${idMusik}`,
        valueForm,
        {
          headers: {
            Authorization: `Bearer ${detailUser.token}`,
          },
        }
      );

      const data = createRes.data?.data;

      if (!data?.id) {
        throw new Error("ID music work tidak ditemukan");
      }

      toast.success("Selamat, karya musik berhasil diupload!");
      onSuccess?.();
      navigate(
        `/participant/${encodeURIComponent(
          encryptData(createRes.data.data.composer_id, secretKey)
        )}`
      );


    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Upload gagal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-emerald-50">Konfirmasi</h1>
          <p className="text-balance text-sm text-emerald-400">
            Pastikan semua data sudah benar sebelum Anda menekan tombol submit.
          </p>
        </div>
      </div>


      {/* AUDIO PLAYER (HIDDEN) */}
      {audioURL && (
        <div className="mt-6 w-full">
          {/* LABEL */}
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
            Preview Audio
          </p>

          {/* NAMA FILE */}
          <p className="text-sm text-emerald-200 mb-2 truncate flex items-center gap-1">
            🎵 {fileName}
          </p>

          {/* AUDIO PLAYER */}
          <audio ref={audioRef} controls className="w-full">
            <source src={audioURL} type="audio/mpeg" />
          </audio>

          {/* INFO KECIL */}
          <p className="mt-1 text-[11px] text-gray-400">
            Putar untuk memastikan file musik sudah benar
          </p>
        </div>
      )}

      {/* GOOGLE DRIVE */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
          Google Drive
        </p>

        <a
          href={detailMusik.work_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-sky-500/20 px-4 py-2 text-sky-300 hover:bg-sky-500/30 transition"
        >
          <Link className="h-4 w-4" />
          Buka Google Drive
        </a>

        <p className="mt-1 text-[11px] text-gray-400">
          Klik dan pastikan google drive sudah benar
        </p>
      </div>

      <div>
        {/* konten konfirmasi */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>

          <Button
            onClick={() => setOpenConfirm(true)}
            disabled={isLoading}
            className="rounded-xl px-6"
          >
            Submit
          </Button>
        </div>
      </div>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>

            <DialogTitle className="text-xl font-semibold">
              Konfirmasi Submit Karya Musik
            </DialogTitle>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Apakah kamu yakin ingin <b>mengirim karya musik ini</b>?
              <br />
              <span className="text-red-600 font-medium">
                Setelah disubmit, data tidak dapat diubah kembali.
              </span>
            </p>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => setOpenConfirm(false)}
              disabled={isLoading}
            >
              Batal
            </Button>

            <Button
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700"
              onClick={() => {
                setOpenConfirm(false);
                handleSubmit();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Ya, Submit Final"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}
