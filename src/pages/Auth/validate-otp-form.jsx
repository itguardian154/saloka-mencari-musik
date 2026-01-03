import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URLS from "../../../config";
import CryptoJS from "crypto-js";

export function ValidateOtpForm({ whatsapp, className, ...props }) {
  const [valueOtp, setValueOtp] = useState("")
  const navigate = useNavigate();
  const secretKey = API_URLS.secretKey;

  // Encrypt & Decrypt
  const encryptData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between px-4 py-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Verifikasi Kode OTP
          </h1>
          <h1 className="text-2xl font-bold">
            Saloka Mencari Musik
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Masukkan kode OTP yang dikirim ke WhatsApp
            <br />
            <span className="font-semibold">085559647683</span>
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP maxLength={6} value={valueOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          size="lg"
          onClick={() => {
            navigate(`/participant/${encodeURIComponent(
              encryptData("1", secretKey)
            )}`)
          }}
          className="w-full max-w-xs"
          type="button"
        >
          Verifikasi Kode OTP
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        © 2025 Saloka Theme Park
      </div>
    </section>

  )
}
