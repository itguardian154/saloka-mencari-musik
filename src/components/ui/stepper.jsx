"use client"

import { useRef } from "react"
import { Check, Music, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import UploadAudio from "@/pages/role-peserta/fom-pendaftaran/upload-audio"
import ScreenRecord from "@/pages/role-peserta/fom-pendaftaran/screen-record"
import Konfirmasi from "@/pages/role-peserta/fom-pendaftaran/konfirmasi"
import { toast } from "sonner"


const stepIcons = [Music, Video, Check]

export function Stepper({ steps, currentStep, onStepChange, idMusik }) {
  const handleSuccess = () => {
    onStepChange(1);
  };

  const handlePrevious = () => {
    onStepChange(0);
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <UploadAudio idMusik={idMusik} onSuccess={handleSuccess} />;
      case 1:
        return (
          <Konfirmasi
            idMusik={idMusik}
            onPrevious={handlePrevious}
            onSuccess={handleSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="grid grid-cols-1 gap-4 mb-8 lg:flex lg:items-center lg:justify-between">
        {steps.map((step, index) => {
          const IconComponent = stepIcons[index]
          const isCompleted = index < currentStep

          return (
            <div key={step.title} className="flex items-center flex-1">
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full shrink-0",
                  isCompleted
                    ? "bg-gossamer-600 text-white"
                    : index === currentStep
                      ? "bg-gossamer-600 text-white"
                      : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <IconComponent className="w-5 h-5" />}
              </div>

              {/* Text */}
              <div className="flex flex-col ml-2">
                <span className="text-sm font-medium  text-emerald-50">{step.title}</span>
                <span className="text-xs text-emerald-400">{step.description}</span>
              </div>

              {/* Line only for desktop */}
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "hidden lg:block flex-1 h-0.5 mx-2",
                    isCompleted ? "bg-gossamer-600" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Konten */}
      {renderStepContent()}

      {/* <div className="flex">
        <Button
          variant="outline"
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
      </div> */}
    </div>
  )
}
