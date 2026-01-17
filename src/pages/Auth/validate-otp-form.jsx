import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API_URLS from "../../../config";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "sonner";
import { de } from "date-fns/locale";

export function ValidateOtpForm() {
  useEffect(() => {
    const lastRoute = localStorage.getItem("last_route");
    if (lastRoute) {
      navigate(lastRoute, { replace: true });
    }
  }, []);

  const [valueOtp, setValueOtp] = useState("");
  const navigate = useNavigate();
  const { phone } = useParams();
  const secretKey = API_URLS.secretKey;

  const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
  };


  const decryptData = (data, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  const decryptPhone = decryptData(decodeURIComponent(phone), secretKey);
  //console.log(decryptPhone);


  const handleVerifyOtp = () => {
    if (valueOtp.length !== 6) {
      toast.error("Kode OTP harus 6 digit");
      return;
    }

    toast.promise(
      axios.post(`${API_URLS.mencariMusik}/auth/verify-otp`, {
        phone: decryptPhone,
        otp: valueOtp,
      }),
      {
        loading: "Memverifikasi OTP...",
        success: (response) => {
          const { status, data, message } = response.data;

          if (response.status === 200 && status === true) {
            const { token, type_user } = data;

            localStorage.setItem("token", token);
            localStorage.setItem("type_user", type_user);

            if (type_user === "composer") {
              const userId = data.user.id;
              const participantPath = `/participant/${encodeURIComponent(
                encryptData(userId, secretKey)
              )}`;

              localStorage.setItem("last_route", participantPath);

              navigate(participantPath, { replace: true });

            } else if (type_user === "admin") {
              navigate("/admin/daftar-peserta");
            }

            return message || "OTP berhasil diverifikasi";
          }

          throw new Error(message || "OTP tidak valid");
        },
        error: (error) => {
          const data = error?.response?.data;

          if (data?.errors?.phone?.length) {
            return data.errors.phone[0];
          }

          if (data?.message) {
            return data.message;
          }

          return error?.message || "Verifikasi OTP gagal";
        },
      }
    );
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between px-4 py-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verifikasi Kode OTP</h1>
          <h1 className="text-2xl font-bold">Saloka Mencari Musik</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Masukkan kode OTP yang dikirim ke WhatsApp
            <br />
            <span className="font-semibold">{decryptPhone}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={valueOtp}
            onChange={setValueOtp}
          >
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
          className="w-full max-w-xs"
          type="button"
          onClick={handleVerifyOtp}
        >
          Verifikasi Kode OTP
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        © 2025 Saloka Theme Park
      </div>
    </section>
  );
}
