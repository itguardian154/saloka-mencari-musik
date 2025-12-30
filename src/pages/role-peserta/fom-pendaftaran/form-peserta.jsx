"use client"

import { Stepper } from "@/components/ui/stepper"
import { useEffect, useState } from "react"

const steps = [
  { title: "Musik", description: "Upload karya musik" },
  { title: "Screen Record", description: "Upload screen record" },
  { title: "Konfirmasi", description: "Konfirmasi dan selesai" },
]

export default function FormPeserta() {
  useEffect(() => {
    document.title = "Saloka Mencari Musik";
  }, []);

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="relative w-full p-4 lg:p-10">
        <div className="col-span-12 lg:col-span-8 p-0 lg:p-8">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
    </div>
  )
}
