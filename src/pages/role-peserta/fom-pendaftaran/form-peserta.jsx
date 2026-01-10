"use client"

import { Stepper } from "@/components/ui/stepper"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import API_URLS from "../../../../config";
import CryptoJS from "crypto-js";

const steps = [
  { title: "Musik", description: "Upload karya musik" },
  { title: "Konfirmasi", description: "Konfirmasi dan selesai" },
]

export default function FormPeserta() {
  useEffect(() => {
    document.title = "Saloka Mencari Musik";
  }, []);

  const { idMusik, } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const secretKey = API_URLS.secretKey;

  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  const decryptIDmusik = JSON.parse(
    decryptData(decodeURIComponent(idMusik), secretKey)
  );

 // console.log("id musik",decryptIDmusik);

return (
  <div className="relative w-full overflow-hidden">

    {/* ================= FULL BACKGROUND ================= */}
    <div className="fixed inset-0 -z-20 bg-gradient-to-br 
      from-slate-800 via-slate-800 to-emerald-900/80" />

    {/* Soft global glow */}
    <div className="fixed inset-0 -z-10">
      <div className="absolute -top-48 right-1/3 h-[520px] w-[520px]
        rounded-full bg-emerald-400/25 blur-[160px]" />
      <div className="absolute -bottom-48 left-1/3 h-[460px] w-[460px]
        rounded-full bg-teal-300/20 blur-[160px]" />
    </div>

    {/* ================= CONTENT ================= */}
      <div className="col-span-12 lg:col-span-8 p-4 lg:p-8">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md 
          shadow-lg p-6">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            idMusik={decryptIDmusik}
          />
        </div>
      </div>
  </div>
)

}
