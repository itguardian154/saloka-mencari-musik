import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  PhoneCall,
  MapPin,
  Cake,
  PencilIcon,
  Check,
  ChevronsUpDown
} from "lucide-react"
import { useEffect, useState } from "react";
import API_URLS from "../../../../config";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ItemActions,
} from "@/components/ui/item"
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export default function ProfilePeserta({ id }) {

  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [formEdit, setFormEdit] = useState(null);
  const [openCombobox, setOpenCombobox] = useState("");

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
    setFormEdit((prev) => ({
      ...prev,
      province: prov.prov_name,
      prov_id: prov.prov_id,
      city: "",
      city_id: "",
    }));

    setOpenCombobox("");
  };

  // Get Data Provinsi End

  ///Handle Get Data City Start
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    if (!formEdit || !formEdit.prov_id) {
      setDataCity([]);
      return;
    }

    const getDataCity = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.crm}api/get_cities?id_province=${formEdit.prov_id}`
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
  }, [formEdit?.prov_id]);


  const handleSelectedCity = (city) => {
    setFormEdit((prev) => ({
      ...prev,
      city: city.city_name,
      city_id: city.city_id,
    }));

    setOpenCombobox("");
  };
  // Get Data City End

  const clearData = () => {
    setDetailPeserta({});
  };

  // Get Peserta by ID Start
  const [detailPeserta, setDetailPeserta] = useState({});

  useEffect(() => {
    const getDetailDataPeserta = async () => {
      try {
        const response = await axios.get(
          `${API_URLS.mencariMusik}/composers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${detailUser.token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === true) {
          if (response.data.data != null) {
            setDetailPeserta(response.data.data);
          } else {
            clearData();
          }
        } else {
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

    if (id && detailUser.token) {
      getDetailDataPeserta();
    }
  }, [id, detailUser.token]);
  // Get Peserta by ID End

  // Edit Profile Start
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const detailEdit = {
      name: formEdit?.name,
      whatsapp: formEdit?.whatsapp,
      email: formEdit?.email,
      city: formEdit?.city,
      province: formEdit?.province,
    };

    const updatePromise = axios.put(
      `${API_URLS.mencariMusik}/composers/${id}`,
      detailEdit,
      {
        headers: {
          Authorization: `Bearer ${detailUser.token}`,
        },
      }
    );

    toast.promise(updatePromise, {
      loading: "Menyimpan perubahan...",
      success: (response) => {
        if (
          [200, 201].includes(response.status) &&
          response.data?.status === true
        ) {
          // 🔑 update data asli setelah sukses
          setDetailPeserta(detailEdit);

          // keluar dari mode edit
          setIsEdit(false);
          setFormEdit(null);

          return "Update profile berhasil 🎉";
        }

        throw new Error(
          response.data?.message || "Update profile gagal"
        );
      },
      error: (error) => {
        return (
          error?.response?.data?.message ||
          "Terjadi kesalahan saat update profile"
        );
      },
    });
  };
  // Edit Profile End

  return (
    <div
      className="
      relative h-full
      rounded-xl
      bg-gradient-to-r
              from-emerald-900/60 via-slate-900/70 to-slate-900/60
              border border-emerald-400/25
              p-3
              transition
              hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]
      shadow-[0_0_40px_rgba(16,185,129,0.12)]
    "
    >
      {/* ================= HEADER ================= */}
      <CardHeader className="pb-0 relative">
        {/* Edit Button */}
        <ItemActions>
          {!isEdit ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => {
                    const selectedProv = dataProvince.find(
                      (p) => p.prov_name === detailPeserta.province
                    );

                    setFormEdit({
                      ...detailPeserta,
                      prov_id: selectedProv?.prov_id || "",
                    });

                    setIsEdit(true);
                  }}
                  className="
                  absolute right-4 top-4 cursor-pointer
                  rounded-full p-2
                  bg-slate-800/60
                  hover:bg-emerald-500/20
                  transition
                "
                >
                  <PencilIcon className="h-4 w-4 text-emerald-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Edit Profile</TooltipContent>
            </Tooltip>
          ) : (
            <div className="absolute right-4 top-4 flex gap-1">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900"
                onClick={(e) => handleSubmitEdit(e)}
              >
                Simpan
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-emerald-400/30 text-emerald-200"
                onClick={() => {
                  setIsEdit(false);
                  setFormEdit(null);
                }}
              >
                Batal
              </Button>
            </div>
          )}
        </ItemActions>

        {/* Avatar */}
        <div className="flex items-center justify-center pt-4">
          <Avatar className="h-20 w-20 ring-2 ring-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.45)]">
            <AvatarImage />
            <AvatarFallback className="bg-slate-800">
              <img
                src="/img/profile.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name */}
        <h5 className="mt-3 flex justify-center text-lg font-semibold text-emerald-50">
          {isEdit ? (
            <Input
              value={formEdit.name || ""}
              onChange={(e) =>
                setFormEdit((prev) => ({ ...prev, name: e.target.value }))
              }
              className="
              w-64 h-10 text-center
              bg-slate-900/60
              border-emerald-400/30
              text-emerald-100
              focus:ring-emerald-400/50
            "
            />
          ) : (
            detailPeserta.name
          )}
        </h5>
      </CardHeader>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col gap-y-4 p-6 text-emerald-50">
        {/* Phone */}
        <div className="flex items-center gap-3 text-sm">
          <PhoneCall className="size-4 text-emerald-400" />
          {isEdit ? (
            <Input
              value={formEdit.whatsapp || ""}
              onChange={(e) =>
                setFormEdit((prev) => ({ ...prev, whatsapp: e.target.value }))
              }
              className="
              w-64 h-10
              bg-slate-900/60
              border-emerald-400/30
              text-emerald-100
            "
            />
          ) : (
            <span>{detailPeserta.whatsapp}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 text-sm">
          <Mail className="size-4 text-emerald-400" />
          {isEdit ? (
            <Input
              value={formEdit.email || ""}
              onChange={(e) =>
                setFormEdit((prev) => ({ ...prev, email: e.target.value }))
              }
              className="
              w-64 h-10
              bg-slate-900/60
              border-emerald-400/30
              text-emerald-100
            "
            />
          ) : (
            <span>{detailPeserta.email}</span>
          )}
        </div>

        {/* Age */}
        <div className="flex items-center gap-3 text-sm">
          <Cake className="size-4 text-emerald-400" />
          <span>{"< 18 Tahun"}</span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 text-sm">
          <MapPin className="size-4 text-emerald-400 mt-1" />

          <div className="w-64 flex flex-col gap-2">
            {/* City */}
            {isEdit ? (
              <Popover open={openCombobox === "city"} onOpenChange={() => handleOpenCombobox("city")}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={!formEdit.province}
                    className="
                    w-full justify-between h-11
                    bg-slate-900/60
                    border-emerald-400/30
                    text-emerald-100
                  "
                  >
                    {formEdit.city || "Pilih kabupaten / kota"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-slate-900 border-emerald-400/20">
                  <Command>
                    <CommandInput placeholder="Cari kota" />
                    <CommandList>
                      {dataCity.map((city) => (
                        <CommandItem
                          key={city.city_id}
                          onSelect={() => handleSelectedCity(city)}
                        >
                          {city.city_name}
                          {formEdit.city_id === city.city_id && (
                            <Check className="ml-auto" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <span>{detailPeserta.city}</span>
            )}

            {/* Province */}
            {isEdit ? (
              <Popover open={openCombobox === "province"} onOpenChange={() => handleOpenCombobox("province")}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
                    w-full justify-between h-11
                    bg-slate-900/60
                    border-emerald-400/30
                    text-emerald-100
                  "
                  >
                    {formEdit.province || "Pilih provinsi"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-slate-900 border-emerald-400/20">
                  <Command>
                    <CommandInput placeholder="Cari provinsi" />
                    <CommandList>
                      {dataProvince.map((prov) => (
                        <CommandItem
                          key={prov.prov_id}
                          onSelect={() => handleSelectedProvice(prov)}
                        >
                          {prov.prov_name}
                          {formEdit.prov_id === prov.prov_id && (
                            <Check className="ml-auto" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <span>{detailPeserta.province}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}