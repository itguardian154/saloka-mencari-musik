import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, Check, ChevronsUpDown, InfoIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SignUpForm = () => {
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [openCombobox, setOpenCombobox] = useState("");
  const [valueForm, setValueForm] = useState({
    province: "",
    regency: "",
    distric: "",
  });

  // Data dummy manual
  const provinces = ["Jawa Tengah", "Jawa Barat"];
  const regencies = {
    "Jawa Tengah": ["Semarang", "Surakarta"],
    "Jawa Barat": ["Bandung", "Bekasi"],
  };
  const districts = {
    Semarang: [
      { id: 1, name: "Candisari" },
      { id: 2, name: "Gajahmungkur" },
      { id: 3, name: "Tembalang" },
    ],
    Surakarta: [
      { id: 4, name: "Pasar Kliwon" },
      { id: 5, name: "Banjarsari" },
    ],
    Bandung: [
      { id: 6, name: "Coblong" },
      { id: 7, name: "Lengkong" },
    ],
    Bekasi: [
      { id: 8, name: "Bekasi Timur" },
      { id: 9, name: "Bekasi Barat" },
    ],
  };

  const handleOpenCombobox = (index) => {
    setOpenCombobox((prev) => (prev === index ? "" : index));
  };

  const handleProvinceSelect = (province) => {
    setValueForm({
      province,
      regency: "",
      distric: "",
    });
    setOpenCombobox("");
  };

  const handleRegencySelect = (regency) => {
    setValueForm((prev) => ({
      ...prev,
      regency,
      distric: "",
    }));
    setOpenCombobox("");
  };

  const handleDistricSelected = (district) => {
    setValueForm((prev) => ({
      ...prev,
      distric: district.name,
    }));
    setOpenCombobox("");
  };


  return (
    <form className="flex flex-col gap-6">
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
            placeholder="Masukan nomor WhatsApp"
            required
            autoComplete="off"
            className="w-full h-11 placeholder:text-sm"
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
            className={`w-full h-11 placeholder:text-sm ${validatedEmail ? "border-destructive" : ""
              }`}
          />
          <span className="text-xs text-muted-foreground">
            contoh: example@gmail.com
          </span>
          {/* <span className="text-xs text-destructive">
            Format email tidak valid, silahkan cek kembali
          </span>
          <span className="text-xs text-emerald-600">
            Format email valid
          </span> */}
        </div>

        {/* Age */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="age">Kategori Umur</Label>
          <Select
            name="age"
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
              <Button
                variant="outline"
                className="w-full justify-between h-11"
              >
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
                    {provinces.map((prov) => (
                      <CommandItem key={prov} onSelect={() => handleProvinceSelect(prov)}>
                        {prov}
                        {valueForm.province === prov && <Check className="ml-auto opacity-100" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Regency */}
        <div className="w-full flex flex-col gap-2">
          <Label>Kabupaten / Kota</Label>
          <Popover open={openCombobox === "regencies"} onOpenChange={() => handleOpenCombobox("regencies")}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-11"
                disabled={!valueForm.province}
              >
                {valueForm.regency || "Pilih kabupaten / kota"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-80 p-0">
              <Command>
                <CommandInput placeholder="Cari kabupaten / kota" className="h-9" />
                <CommandList>
                  <CommandEmpty>No regencies found.</CommandEmpty>
                  <CommandGroup>
                    {valueForm.province &&
                      regencies[valueForm.province].map((regency) => (
                        <CommandItem key={regency} onSelect={() => handleRegencySelect(regency)}>
                          {regency}
                          {valueForm.regency === regency && <Check className="ml-auto opacity-100" />}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Districts */}
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="districts">Kecamatan</Label>
          <Popover open={openCombobox === "districts"} onOpenChange={() => handleOpenCombobox("districts")}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-11"
                disabled={!valueForm.regency}
              >
                {valueForm.distric || "Pilih kecamatan terlebih dahulu"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-80 p-0">
              <Command>
                <CommandInput placeholder="Cari kecamatan" className="h-9" />
                <CommandList>
                  <CommandEmpty>No districts found.</CommandEmpty>
                  <CommandGroup>
                    {valueForm.regency &&
                      districts[valueForm.regency].map((district) => (
                        <CommandItem
                          key={district.id}
                          value={district.name}
                          onSelect={() => handleDistricSelected(district)}
                        >
                          {district.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              valueForm.distric === district.name ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <Alert variant="info">
            <InfoIcon className="-mx-2" />
            <AlertTitle>Informasi Penting</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm">
                <li>
                  Link video dapat diupload setelah registrasi
                </li>
                <li>
                  Peserta dapat mengirimkan karya lebih dari 1 dengan tetap membayar biaya pendaftaran kembali.
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full md:col-span-2 flex items-center space-x-2">
          <Checkbox
            id="terms"
            required
            className="size-4 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <label
            htmlFor="terms"
            className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Saya menyetujui{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-600/90 hover:underline transition-all duration-150 ease-linear font-bold underline-offset-4"
            >
              Syarat dan Ketentuan
            </button>{" "}
            Saloka Lomba Mewarnai
          </label>
        </div>
        <Button
          size={"lg"}
          variant={"default"}
          type="button"
          className="w-full md:col-span-2 mt-4"
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