import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, Check, ChevronsUpDown, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import API_URLS from "../../../config";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SignUpForm = ({ onClickHandler, termsAccepted, }) => {
  useEffect(() => {
    const lastRoute = localStorage.getItem("last_route");
    if (lastRoute) {
      navigate(lastRoute, { replace: true });
    }
  }, []);

  const navigate = useNavigate();

  const [openCombobox, setOpenCombobox] = useState("");
  const [valueForm, setValueForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    age: "",
    province: "",
    prov_id: null,
    city_id: null,
    city: "",
  });


  const [email, setEmail] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(null);
  // null = belum dicek, true = valid, false = tidak valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setValidatedEmail(isValid);

    setValueForm((prev) => ({
      ...prev,
      email: value,
    }));
  };


  const handleOpenCombobox = (index) => {
    setOpenCombobox((prev) => (prev === index ? "" : index));
  };

  //Handle Get Data Provinsi Start
  const [dataProvince, setDataProvince] = useState([]);

  useEffect(() => {
    const getDataProvince = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.crm}api/get_provinces`
        );

        if (response.status === 200 && response.data.status === "success") {
          setDataProvince(response.data.data);
        } else {
          setDataProvince([]);
        }
      } catch (error) {
        setDataProvince([]);
        console.log(error);
      }
    };

    getDataProvince();
  }, []);


  const handleSelectedProvice = (prov) => {
    setValueForm((prev) => ({
      ...prev,
      province: prov.prov_name,
      prov_id: prov.prov_id,
    }));

    setOpenCombobox("");
  };
  // Get Data Provinsi End

  //Handle Get Data City Start
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    if (!valueForm.prov_id) {
      setDataCity([]);
      return;
    }

    const getDataCity = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.crm}api/get_cities?id_province=${valueForm.prov_id}`
        );

        if (response.status === 200 && response.data.status === "success") {
          setDataCity(response.data.data);
        } else {
          setDataCity([]);
        }
      } catch (error) {
        setDataCity([]);
        console.log(error);
      }
    };

    getDataCity();
  }, [valueForm.prov_id]);

  const handleSelectedCity = (city) => {
    setValueForm((prev) => ({
      ...prev,
      city: city.city_name,
      city_id: city.city_id,
    }));

    setOpenCombobox("");
  };
  // Get Data City End

  // Handle Submit Register Start
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Konfirmasi Registrasi",
      text: `Apakah kamu yakin ingin melakukan registrasi? Pastikan data yang kamu masukkan sudah benar. Data yang kamu masukkan tidak dapat diubah setelah kamu melakukan registrasi.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",

      buttonsStyling: false, // 🔥 PENTING

      customClass: {
        popup: "rounded-lg",
        confirmButton:
          "bg-gossamer-600 text-white px-4 py-2 rounded-md font-medium opacity-100 hover:bg-gossamer-700",
        cancelButton:
          "bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium opacity-100 hover:bg-gray-300 ml-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(
          axios.post(`${API_URLS.mencariMusik}/composers`, {
            name: valueForm.name,
            email: valueForm.email,
            whatsapp: valueForm.whatsapp,
            province: valueForm.province,
            city: valueForm.city,
            age: valueForm.age,
            district: "-",
          }),
          {
            loading: "Loading...",
            success: (response) => {
              if ([200, 201].includes(response.status) && response.data.status === true) {
                navigate("/");
                return response.data.message || "Registrasi berhasil!";
              }

              throw new Error(response.data.message || "Registrasi gagal!");
            },
            error: (error) =>
              error?.response?.data?.message ||
              error?.message ||
              "Terjadi kesalahan",
          }
        );
      }
    });
  };
  // Handle Submit Register End

  return (
    <form onSubmit={handleSubmitRegister} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Registrasi Saloka Mencari Musik
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Masukan semua data yang sesuai form dibawah ini, dan harap
          isi dengan benar.
        </p>
      </div>
      <div className="text-left text-sm">
        Sudah mempunyai akun?{" "}
        <a
          href="/"
          className="text-blue-600 hover:text-blue-600/90 hover:underline transition-all duration-150 ease-linear font-bold underline-offset-4"
        >
          Login
        </a>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Komposer */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="name-group">Nama Komposer</Label>
          <Input
            id="name-komposer"
            name="name"
            type="text"
            placeholder="Masukan nama komposer"
            required
            autoComplete="off"
            value={valueForm.name || ""}
            onChange={(e) => setValueForm({ ...valueForm, name: e.target.value })}
            className="w-full h-11 placeholder:text-sm"
          />
        </div>

        {/* WhatsApp */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            placeholder="Masukan nomor whatsapp"
            value={valueForm.whatsapp}
            onChange={(e) => {
              const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
              setValueForm({ ...valueForm, whatsapp: onlyNumber });
            }}
          />
          <Alert variant="warning">
            <AlertCircleIcon className="-mx-2" />
            <AlertTitle>Peringatan</AlertTitle>
            <AlertDescription>
              <p>
                Pastikan nomor WhatsApp kamu aktif, karena
                digunakan untuk proses verifikasi login.
              </p>
            </AlertDescription>
          </Alert>
        </div>

        {/* Email */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Masukan alamat email aktif"
            required
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
            className={`w-full h-11 placeholder:text-sm
      ${validatedEmail === false ? "border-destructive focus-visible:ring-destructive" : ""}
      ${validatedEmail === true ? "border-emerald-500 focus-visible:ring-emerald-500" : ""}
    `}
          />

          <span className="text-xs text-muted-foreground">
            contoh: example@gmail.com
          </span>

          {validatedEmail === false && (
            <span className="text-xs text-destructive">
              Format email tidak valid, silahkan cek kembali
            </span>
          )}

          {validatedEmail === true && (
            <span className="text-xs text-emerald-600">
              Format email valid
            </span>
          )}
        </div>

        {/* Age */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="age">Kategori Umur</Label>
          <Select
            value={valueForm.age}
            onValueChange={(value) =>
              setValueForm({ ...valueForm, age: value })
            }
          >
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Pilih kategori umur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="< 18 Tahun">
                {"< 18 Tahun"}
              </SelectItem>
              <SelectItem value="18 - 24 Tahun">
                18 - 24 Tahun
              </SelectItem>
              <SelectItem value="25 - 34 Tahun">
                25 - 34 Tahun
              </SelectItem>
              <SelectItem value="35 - 44 Tahun">
                35 - 44 Tahun
              </SelectItem>
              <SelectItem value=">= 45 Tahun">
                {">= 45 Tahun"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div className="w-full flex flex-col gap-2">
          <Label>Provinsi</Label>
          <Popover open={openCombobox === "province"} onOpenChange={() => handleOpenCombobox("province")}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-11">
                {valueForm.province || "Pilih provinsi"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-80 p-0">
              <Command>
                <CommandInput placeholder="Cari provinsi" className="h-9" />
                <CommandList>
                  <CommandEmpty>No province found.</CommandEmpty>
                  <CommandGroup>
                    {dataProvince.map((prov) => (
                      <CommandItem
                        key={prov.prov_id}
                        onSelect={() => handleSelectedProvice(prov)}
                      >
                        {prov.prov_name}
                        {valueForm.prov_id === prov.prov_id && (
                          <Check className="ml-auto opacity-100" />
                        )}
                      </CommandItem>
                    ))}

                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* City */}
        <div className="w-full flex flex-col gap-2">
          <Label>Kabupaten / Kota</Label>
          <Popover open={openCombobox === "city"} onOpenChange={() => handleOpenCombobox("city")}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-11"
                disabled={!valueForm.province}
              >
                {valueForm.city || "Pilih kabupaten / kota"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-80 p-0">
              <Command>
                <CommandInput placeholder="Cari kabupaten / kota" className="h-9" />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {dataCity.map((city) => (
                      <CommandItem
                        key={city.city_id}
                        onSelect={() => handleSelectedCity(city)}
                      >
                        {city.city_name}
                        {valueForm.city_id === city.city_id && (
                          <Check className="ml-auto opacity-100" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <Alert variant="warning">
            <InfoIcon className="-mx-2" />
            <AlertTitle>Informasi Penting</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm">
                <li>
                  File musik dapat diupload setelah registrasi
                </li>
                <li>
                  Peserta dapat mengirimkan karya lebih dari 1 dengan tetap membayar biaya pendaftaran kembali.
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full md:col-span-2 flex items-center space-x-2">
          <label
            htmlFor="terms"
            className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Untuk melanjutkan, silakan klik dan setujui{" "}
            <button
              type="button"
              onClick={onClickHandler}
              className="text-blue-600 hover:text-blue-600/90 hover:underline transition-all duration-150 ease-linear font-bold underline-offset-4"
            >
              Syarat dan Ketentuan
            </button>{" "}
            Saloka Mencari Musik
          </label>
        </div>
        <Button
          size="lg"
          variant="default"
          type="submit"
          className="w-full md:col-span-2 mt-4"
          disabled={!validatedEmail || !termsAccepted}
        >
          Registrasi Sekarang
        </Button>
      </section>
      <div className="grid gap-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            © 2026 Saloka Theme Park
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm