import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URLS from "../../../config";
import CryptoJS from "crypto-js";
import axios from "axios";
import { mediaBanner } from "@/assets/image/banner";
import { mediaLogo } from "@/assets/image/logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { toast } from "sonner"

const AuthPage = () => {
  useEffect(() => {
    document.title = "Login - Saloka Mencari Musik";
  });

  useEffect(() => {
  const lastRoute = localStorage.getItem("last_route");
  if (lastRoute) {
    navigate(lastRoute, { replace: true });
  }
}, []);


  const navigate = useNavigate();
  const secretKey = API_URLS.secretKey;
  const [valueForm, setValueForm] = useState({
    phone: "",
  });

  // Encrypt & Decrypt
  const encryptData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    toast.promise(
      axios.post(`${API_URLS.mencariMusik}/auth/request-otp`, {
        phone: valueForm.phone,
      }),
      {
        loading: "Mengirim OTP...",
        success: (response) => {
          if (response.status === 200 && response.data.status === true) {
            navigate(
              "/validate-otp/" +
              encodeURIComponent(encryptData(valueForm.phone, secretKey))
            );
            return response.data.message || "OTP berhasil dikirim";
          }

          throw new Error(response.data.message || "Gagal mengirim OTP");
        },
        error: (error) =>
          error?.response?.data?.message ||
          error?.message ||
          "Terjadi kesalahan",
      }
    );
  };


  return (
    <>
      <section title="Login" />
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a
              href="/"
              className="flex items-center gap-2 font-medium"
            >
              <div className="flex h-auto w-44 items-center justify-center rounded-md">
                <img src={mediaLogo[0]} alt="" />
              </div>
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              <form
                onSubmit={(e) => handleSubmitLogin(e)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Saloka Mencari Musik</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Masukan nomor WhatsApp yang terdaftar, untuk melanjutkan
                    login
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="text"
                      placeholder="Masukan nomor WhatsApp"
                      inputMode="numeric"
                      autoComplete="off"
                      required
                      value={valueForm.phone || ""}
                      onChange={(e) => {
                        const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                        setValueForm({ ...valueForm, phone: onlyNumber });
                      }}
                      className="w-full h-11 placeholder:text-sm"
                    />
                    <Alert variant="warning">
                      <InfoIcon className="-mx-2" />
                      <AlertTitle>Informasi</AlertTitle>
                      <AlertDescription>
                        Gunakan nomor WhatsApp yang terdaftar ketika
                        registrasi
                      </AlertDescription>
                    </Alert>
                  </div>
                  <Button type="submit" size={"lg"} className="w-full">
                    Login Sekarang
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      © 2026 Saloka Theme Park
                    </span>
                  </div>
                </div>
                <div className="text-center text-sm mt-4">
                  Sudah mempunyai akun?{" "}
                  <a
                    href="/signup"
                    className="text-blue-600 hover:text-blue-600/90 hover:underline transition-all duration-150 ease-linear font-bold underline-offset-4"
                  >
                    Registrasi
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block p-10">
          <img
            src={mediaBanner[0]}
            alt="Image Banner"
            className="absolute inset-0 h-full w-full object-fill 2xl:object-fill object-center"
          />
        </div>
      </div>
      {/* <LoadingContainer /> */}
    </>
  );
}

export default AuthPage